import takeRight from 'lodash/takeRight';
import { useEffect, useState } from 'react';
import { Metric } from 'common/metricEnum';
import { Anomalies } from 'api/schema/RegionSummary';
import { ProjectionsPair, SortType } from 'common/models/ProjectionsPair';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import {
  fetchAllCountyProjections,
  fetchAllStateProjections,
  fetchCountyProjectionsForState,
  fetchProjectionsRegion,
} from 'common/utils/model';
import { snapshotUrl } from 'common/utils/snapshots';
import regions, { County, MetroArea, Region, State } from 'common/regions';
import { Projections } from 'common/models/Projections';
import { fetchSummaries } from 'common/location_summaries';
import { fail, assert } from 'common/utils';
import { ALL_METRICS } from 'common/metric';

export const COUNTIES_LIMIT = 100;
export const METROS_LIMIT = 100;

// For "interesting" regions, we take the 30 top diffs of the counties with
// > 500k population and the 20 top diffs of metro areas.
export const INTERESTING_COUNTIES_POPULATION = 500000;
export const INTERESTING_COUNTIES_TOP_DIFFS = 30;
export const INTERESTING_METROS_TOP_DIFFS = 20;

export enum CompareLocations {
  STATES_AND_INTERESTING_REGIONS,
  STATES,
  TOP_COUNTIES_BY_POPULATION,
  TOP_COUNTIES_BY_DIFF,
  TOP_METROS_BY_POPULATION,
}

export interface CompareOptions {
  leftSnapshot: number;
  rightSnapshot: number;
  sortType: SortType;
  metric: Metric;
  locations: CompareLocations | State;
}

/**
 * React hook to fetch the appropriate ProjectionsSet for the given snapshots,
 * locations, and metric.
 */
export function useProjectionsSet(
  leftSnapshot: number,
  rightSnapshot: number,
  locations: CompareLocations | State,
  metric: Metric,
): ProjectionsSet {
  const [projectionsSet, setProjectionsSet] = useState<ProjectionsSet>(
    ProjectionsSet.fromLoadingText('Loading...'),
  );
  useEffect(() => {
    async function fetchData() {
      if (locations instanceof State) {
        // show counties within state.
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchCountyProjectionsForState(
              locations,
              snapshotUrl(leftSnapshot),
            ),
            await fetchCountyProjectionsForState(
              locations,
              snapshotUrl(rightSnapshot),
            ),
          ),
        );
      } else if (locations === CompareLocations.STATES) {
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchAllStateProjections(snapshotUrl(leftSnapshot)),
            await fetchAllStateProjections(snapshotUrl(rightSnapshot)),
          ),
        );
      } else if (locations === CompareLocations.TOP_COUNTIES_BY_POPULATION) {
        const topCounties = regions.topCountiesByPopulation(COUNTIES_LIMIT);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchRegionProjections(leftSnapshot, topCounties),
            await fetchRegionProjections(rightSnapshot, topCounties),
          ),
        );
      } else if (locations === CompareLocations.TOP_METROS_BY_POPULATION) {
        const topMetros = regions.topMetrosByPopulation(METROS_LIMIT);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchRegionProjections(leftSnapshot, topMetros),
            await fetchRegionProjections(rightSnapshot, topMetros),
          ),
        );
      } else if (locations === CompareLocations.TOP_COUNTIES_BY_DIFF) {
        const topCounties = await fetchTopCountiesByDiff(
          leftSnapshot,
          rightSnapshot,
          metric,
        );
        if (topCounties !== null) {
          setProjectionsSet(
            ProjectionsSet.fromProjections(
              await fetchRegionProjections(leftSnapshot, topCounties),
              await fetchRegionProjections(rightSnapshot, topCounties),
            ),
          );
        } else {
          // Couldn't load summary files. Just fetch all county projections and take the top diffs (slow).
          setProjectionsSet(
            ProjectionsSet.fromLoadingText(
              'Loading (slow due to no pre-generated summary file in https://github.com/covid-projections/covid-projections/tree/develop/scripts/alert_emails/summaries)...',
            ),
          );
          setProjectionsSet(
            ProjectionsSet.fromProjections(
              await fetchAllCountyProjections(snapshotUrl(leftSnapshot)),
              await fetchAllCountyProjections(snapshotUrl(rightSnapshot)),
            )
              .sortBy(SortType.METRIC_DIFF, metric)
              .top(COUNTIES_LIMIT),
          );
        }
      } else if (
        locations === CompareLocations.STATES_AND_INTERESTING_REGIONS
      ) {
        const interestingRegions = await fetchInterestingRegions(
          leftSnapshot,
          rightSnapshot,
          metric,
        );
        if (interestingRegions === null) {
          // Couldn't load summary files. Just fetch all county projections and take the top diffs (slow).
          setProjectionsSet(
            ProjectionsSet.fromLoadingText(
              `Can't load "States & Interesting Regions" since there's no pre-generated summary file in https://github.com/covid-projections/covid-projections/tree/develop/scripts/alert_emails/summaries...`,
            ),
          );
        } else {
          // Start with the states.
          let leftProjections = await fetchAllStateProjections(
            snapshotUrl(leftSnapshot),
          );
          let rightProjections = await fetchAllStateProjections(
            snapshotUrl(rightSnapshot),
          );

          leftProjections = leftProjections.concat(
            await fetchRegionProjections(leftSnapshot, interestingRegions),
          );
          rightProjections = rightProjections.concat(
            await fetchRegionProjections(rightSnapshot, interestingRegions),
          );
          setProjectionsSet(
            ProjectionsSet.fromProjections(leftProjections, rightProjections),
          );
        }
      } else {
        fail('Unknown locations selection.');
      }
    }

    setProjectionsSet(ProjectionsSet.fromLoadingText('Loading...'));
    fetchData();
  }, [leftSnapshot, rightSnapshot, locations, metric]);

  return projectionsSet;
}

async function fetchInterestingRegions(
  leftSnapshot: number,
  rightSnapshot: number,
  metric: Metric,
): Promise<Region[] | null> {
  const regionDiffs = await fetchSortedRegionDiffs(
    leftSnapshot,
    rightSnapshot,
    metric,
  );
  if (regionDiffs === null) {
    return null;
  }
  const interestingCounties = takeRight(
    regionDiffs
      .filter(rd => rd.region instanceof County)
      .filter(
        rd =>
          rd.region.population >= INTERESTING_COUNTIES_POPULATION ||
          rd.diff >= ProjectionsPair.LOWEST_SENTINEL_DIFF,
      ),
    INTERESTING_COUNTIES_TOP_DIFFS,
  );

  const interestingMetros = takeRight(
    regionDiffs.filter(rd => rd.region instanceof MetroArea),
    INTERESTING_METROS_TOP_DIFFS,
  );

  return [...interestingCounties, ...interestingMetros].map(rd => rd.region);
}

function fetchRegionProjections(
  snapshotNumber: number,
  regions: Region[],
): Promise<Projections[]> {
  return Promise.all(
    regions.map(region =>
      fetchProjectionsRegion(region, snapshotUrl(snapshotNumber)).catch(err => {
        console.error(err);
        return null;
      }),
    ),
  ).then(projections => projections.filter(p => p !== null) as Projections[]);
}

/**
 * Returns an array of { region, diff } pairs for all regions, indicating the
 * difference in the specified metric between the specified snapshots, ordered
 * by smallest diff to largest diff.
 */
async function fetchSortedRegionDiffs(
  leftSnapshot: number,
  rightSnapshot: number,
  metric: Metric,
): Promise<Array<{ region: Region; diff: number }> | null> {
  const leftSummaries = await fetchSummaries(leftSnapshot).catch(e => null);
  const rightSummaries = await fetchSummaries(rightSnapshot).catch(e => null);
  if (leftSummaries === null || rightSummaries === null) {
    return null;
  }

  return regions
    .all()
    .map(region => {
      const fips = region.fipsCode;
      const leftValue = leftSummaries[fips]?.metrics?.[metric]?.value ?? null;
      const rightValue = rightSummaries[fips]?.metrics?.[metric]?.value ?? null;
      const diff = ProjectionsPair.metricValueDiff(leftValue, rightValue);
      return {
        region,
        diff,
      };
    })
    .sort((a, b) => a.diff - b.diff);
}

async function fetchTopCountiesByDiff(
  leftSnapshot: number,
  rightSnapshot: number,
  metric: Metric,
): Promise<Region[] | null> {
  const regionDiffs = await fetchSortedRegionDiffs(
    leftSnapshot,
    rightSnapshot,
    metric,
  );
  if (regionDiffs === null) {
    return null;
  }
  return takeRight(
    regionDiffs.filter(rd => rd.region instanceof County),
    COUNTIES_LIMIT,
  ).map(rd => rd.region);
}

/**
 * Maps a metric to the anomalies of its underlying data source.
 * Outlier detection is applied to the raw data that is then used
 * to calculate the metrics, so the relevant anomalies for each metric
 * are the anomalies from the underlying data. E.g., for Weekly New Cases
 * Per 100k we look at the anomalies in New Cases.
 */
export function getAnomaliesForMetric(
  projection: Projections,
  metric: Metric,
): Anomalies | undefined {
  assert(ALL_METRICS.includes(metric));
  const annotations = projection.primary.annotations;
  switch (metric) {
    case Metric.WEEKLY_CASES_PER_100K:
    case Metric.CASE_DENSITY:
    case Metric.CASE_GROWTH_RATE:
      return annotations?.newCases?.anomalies;
    case Metric.RATIO_BEDS_WITH_COVID:
    case Metric.ADMISSIONS_PER_100K:
      if (projection.isCounty) {
        return annotations?.hsaHospitalBeds?.anomalies;
      }
      return projection.primary.annotations?.hospitalBeds?.anomalies;
    case Metric.HOSPITAL_USAGE:
      if (projection.isCounty) {
        return annotations?.hsaIcuBeds?.anomalies;
      }
      return annotations?.icuBeds?.anomalies;
    case Metric.POSITIVE_TESTS:
      const positiveTests = annotations.positiveTests?.anomalies ?? [];
      return annotations.testPositivityRatio?.anomalies.concat(positiveTests);
    case Metric.VACCINATIONS:
      // This is clumsy as it doesn't signify which vaccination metric the anomalies
      // come from. But, I have never actually seen vaccination data create any anomalies.
      const booster = annotations?.vaccinationsAdditionalDose?.anomalies ?? [];
      const completed = annotations?.vaccinationsCompleted?.anomalies ?? [];
      const initiated = annotations.vaccinationsInitiated?.anomalies ?? [];
      return booster.concat(completed, initiated);
  }
}
