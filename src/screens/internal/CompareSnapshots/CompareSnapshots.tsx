import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { fail } from 'common/utils';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
  fetchProjectionsRegion,
} from 'common/utils/model';
import { Wrapper } from './CompareSnapshots.style';
import { Metric } from 'common/metric';
import { Projections } from 'common/models/Projections';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import { SortType, ProjectionsPair } from 'common/models/ProjectionsPair';
import { SnapshotVersion, Api } from 'api';
import moment from 'moment';
import { fetchSummaries } from 'common/location_summaries';
import { snapshotUrl } from 'common/utils/snapshots';
import regions, { County, MetroArea, Region } from 'common/regions';
import {
  DISABLED_METRICS,
  reenableDisabledMetrics,
} from 'common/models/Projection';
import { ComparisonList } from './ComparisonList';
import {
  COUNTIES_LIMIT,
  INTERESTING_COUNTIES_POPULATION,
  INTERESTING_COUNTIES_TOP_DIFFS,
  INTERESTING_METROS_TOP_DIFFS,
  Locations,
  METROS_LIMIT,
  Options,
} from './utils';
import { OptionsSelector } from './OptionsSelector';

export function CompareSnapshots() {
  // We want to force all metrics to be reenabled so we can evaluate whether they're fixed.
  useEffect(() => {
    reenableDisabledMetrics(true);
    return () => reenableDisabledMetrics(false);
  }, []);

  const [options, setOptions] = useState<Options | null>(null);
  return (
    <Wrapper>
      <OptionsSelector onNewOptions={setOptions} />
      {options && <CompareSnapshotsBody options={options} />}
    </Wrapper>
  );
}

function CompareSnapshotsBody({ options }: { options: Options }) {
  // Load projections for all states or counties.
  const { leftSnapshot, rightSnapshot, locations, metric, sortType } = options;
  let { projectionsSet, loadingText } = useProjectionsSet(
    leftSnapshot,
    rightSnapshot,
    locations,
    metric,
  );
  projectionsSet = projectionsSet.sortBy(sortType, metric);

  const leftVersion = useSnapshotVersion(leftSnapshot);
  const rightVersion = useSnapshotVersion(rightSnapshot);

  return (
    <Fragment>
      <Grid container spacing={8} style={{ margin: '1px' }}>
        <Grid item xs={6}>
          Left Snapshot: <b>{leftSnapshot}</b>
          <VersionInfo version={leftVersion} />
        </Grid>
        <Grid item xs={6}>
          Right Snapshot: <b>{rightSnapshot}</b>
          <VersionInfo version={rightVersion} />
        </Grid>
      </Grid>

      <ComparisonList
        metric={metric}
        projectionsSet={projectionsSet}
        loadingText={loadingText}
      />
    </Fragment>
  );
}

const VersionInfo = function ({
  version,
}: {
  version: SnapshotVersion | null;
}) {
  return (
    version && (
      <div style={{ fontSize: 'small' }}>
        <b>Build finished:</b>{' '}
        {moment.utc(version.timestamp).local().toDate().toString()}
        <br />
        <b>covid-data-model:</b>{' '}
        {JSON.stringify(version['covid-data-model']).replace(',', ', ')}
        <br />
        <b>covid-data-public:</b>{' '}
        {JSON.stringify(version['covid-data-public']).replace(',', ', ')}
        <br />
      </div>
    )
  );
};

function useProjectionsSet(
  leftSnapshot: number,
  rightSnapshot: number,
  locations: Locations,
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
      if (locations === Locations.STATES) {
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchAllStateProjections(snapshotUrl(leftSnapshot)),
            await fetchAllStateProjections(snapshotUrl(rightSnapshot)),
          ),
        );
      } else if (locations === Locations.TOP_COUNTIES_BY_POPULATION) {
        const topCounties = regions.topCountiesByPopulation(COUNTIES_LIMIT);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchRegionProjections(leftSnapshot, topCounties),
            await fetchRegionProjections(rightSnapshot, topCounties),
          ),
        );
      } else if (locations === Locations.TOP_METROS_BY_POPULATION) {
        const topMetros = regions.topMetrosByPopulation(METROS_LIMIT);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchRegionProjections(leftSnapshot, topMetros),
            await fetchRegionProjections(rightSnapshot, topMetros),
          ),
        );
      } else if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
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
      } else if (locations === Locations.STATES_AND_INTERESTING_REGIONS) {
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
  const interestingCounties = _.takeRight(
    regionDiffs
      .filter(rd => rd.region instanceof County)
      .filter(
        rd =>
          rd.region.population >= INTERESTING_COUNTIES_POPULATION ||
          rd.diff >= ProjectionsPair.LOWEST_SENTINEL_DIFF,
      ),
    INTERESTING_COUNTIES_TOP_DIFFS,
  );

  const interestingMetros = _.takeRight(
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
  return _.takeRight(
    regionDiffs.filter(rd => rd.region instanceof County),
    COUNTIES_LIMIT,
  ).map(rd => rd.region);
}

export function useSnapshotVersion(
  snapshot: number | null,
): SnapshotVersion | null {
  const [version, setVersion] = useState<SnapshotVersion | null>(null);
  useEffect(() => {
    setVersion(null);
    if (snapshot !== null) {
      new Api(snapshotUrl(snapshot)).fetchVersionInfo().then(version => {
        setVersion(version);
      });
    }
  }, [snapshot]);

  return version;
}

export default CompareSnapshots;
