import { takeRight as _takeRight } from 'lodash';
import { useEffect, useState } from 'react';
import { Metric } from 'common/metric';
import { ProjectionsPair, SortType } from 'common/models/ProjectionsPair';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import {
  fetchAllCountyProjections,
  fetchAllStateProjections,
  fetchProjectionsRegion,
} from 'common/utils/model';
import { snapshotUrl } from 'common/utils/snapshots';
import regions, { County, MetroArea, Region } from 'common/regions';
import { Projections } from 'common/models/Projections';
import { fetchSummaries } from 'common/location_summaries';
import { DISABLED_METRICS } from 'common/models/Projection';

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
): {
  projectionsSet: ProjectionsSet;
  loadingText: string;
} {
  const [projectionsSet, setProjectionsSet] = useState<ProjectionsSet>(
    new ProjectionsSet([]),
  );
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    setLoadingText('Loading...');
    setProjectionsSet(new ProjectionsSet([]));

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
          setLoadingText(
            'Loading (slow due to no pre-generated summary file in https://github.com/covid-projections/covid-projections/tree/develop/scripts/alert_emails/summaries)...',
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
          setLoadingText(
            `Can't load "States & Interesting Regions" since there's no pre-generated summary file in https://github.com/covid-projections/covid-projections/tree/develop/scripts/alert_emails/summaries...`,
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

    fetchData();
  }, [leftSnapshot, rightSnapshot, locations, metric]);

  return { projectionsSet, loadingText };
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
  const interestingCounties = _takeRight(
    regionDiffs
      .filter(rd => rd.region instanceof County)
      .filter(
        rd =>
          rd.region.population >= INTERESTING_COUNTIES_POPULATION ||
          rd.diff >= ProjectionsPair.LOWEST_SENTINEL_DIFF,
      ),
    INTERESTING_COUNTIES_TOP_DIFFS,
  );

  const interestingMetros = _takeRight(
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
      const isDisabled = DISABLED_METRICS[metric].includes(fips);
      const diff = isDisabled
        ? ProjectionsPair.DISABLED_METRIC_DIFF
        : ProjectionsPair.metricValueDiff(leftValue, rightValue);
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
  return _takeRight(
    regionDiffs.filter(rd => rd.region instanceof County),
    COUNTIES_LIMIT,
  ).map(rd => rd.region);
}
