import takeRight from 'lodash/takeRight';
import { useEffect, useState } from 'react';
import { Metric } from 'common/metricEnum';
import { ProjectionsPair, SortType } from 'common/models/ProjectionsPair';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import {
  fetchAllCountyProjections,
  fetchAllStateProjections,
  fetchProjectionsRegion,
} from 'common/utils/model';
import { snapshotUrl } from 'common/utils/snapshots';
import regions from 'common/regions/region_db';
import { County, MetroArea, Region } from 'common/regions';
import { Projections } from 'common/models/Projections';
import { fetchSummaries } from 'common/location_summaries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';

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
  DISABLED,
}

export interface CompareOptions {
  leftSnapshot: number;
  rightSnapshot: number;
  sortType: SortType;
  metric: Metric;
  locations: CompareLocations;
}

/**
 * React hook to fetch the appropriate ProjectionsSet for the given snapshots,
 * locations, and metric.
 */
export function useProjectionsSet(
  leftSnapshot: number,
  rightSnapshot: number,
  locations: CompareLocations,
  metric: Metric,
): ProjectionsSet {
  const [projectionsSet, setProjectionsSet] = useState<ProjectionsSet>(
    ProjectionsSet.fromLoadingText('Loading...'),
  );
  useEffect(() => {
    async function fetchData() {
      if (locations === CompareLocations.STATES) {
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
            ).top(COUNTIES_LIMIT, SortType.METRIC_DIFF, metric),
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
      } else if (locations === CompareLocations.DISABLED) {
        const disabledRegions = regions
          .all()
          .filter(r => getRegionMetricOverride(r, metric)?.blocked);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchRegionProjections(leftSnapshot, disabledRegions),
            await fetchRegionProjections(rightSnapshot, disabledRegions),
          ),
        );
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
