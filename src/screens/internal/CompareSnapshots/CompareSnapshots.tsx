import _ from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as QueryString from 'query-string';
import { assert, fail, formatInteger } from 'common/utils';
import { MetricChart } from 'components/Charts';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
  fetchProjectionsRegion,
} from 'common/utils/model';
import {
  Wrapper,
  ModelComparisonsContainer,
  ModelSelectorContainer,
} from './CompareSnapshots.style';
import { Metric, getMetricName, ALL_METRICS } from 'common/metric';
import { Projections } from 'common/models/Projections';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import { SortType, ProjectionsPair } from 'common/models/ProjectionsPair';
import { SNAPSHOT_URL, SnapshotVersion, Api } from 'api';
import moment from 'moment';
import { Level } from 'common/level';
import { fetchSummaries } from 'common/location_summaries';
import {
  snapshotFromUrl,
  fetchMasterSnapshotNumber,
  snapshotUrl,
} from 'common/utils/snapshots';
import regions, { MetroArea, Region } from 'common/regions';

// TODO(michael): Compare page improvements:
// * Virtualize the list so that it's not so awful slow. NOTE: I previously
//   used react-lazyload for this, but it was buggy (sometimes would show stale
//   charts after changing state properties)
// * Add a chart that overlays the two series on top of each other.
// * Show the diff value (the RMSD of the series or the delta between metric values).
// * Automatically find the latest snapshot (probably by just incrementing the
//   snapshot number until it 404s)

enum Locations {
  STATES_AND_INTERESTING_COUNTIES,
  STATES,
  TOP_COUNTIES_BY_POPULATION,
  TOP_COUNTIES_BY_DIFF,
  TOP_METROS_BY_POPULATION,
}

const COUNTIES_LIMIT = 100;
const METROS_LIMIT = 100;

// For "interesting" counties, we take the 30 top diffs of the counties with > 500k population.
const INTERESTING_POPULATION = 500000;
const INTERESTING_TOP_DIFFS = 30;

export function CompareSnapshots() {
  const masterSnapshot = useMasterSnapshot();
  // TODO(michael): Is there a better React-y way to condition the bulk of a
  // component on a hook result (without introducing a separate component)?
  if (!masterSnapshot) {
    return null;
  } else {
    return <CompareSnapshotsInner masterSnapshot={masterSnapshot} />;
  }
}

function CompareSnapshotsInner({ masterSnapshot }: { masterSnapshot: number }) {
  const location = useLocation();
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [leftSnapshot, setLeftSnapshot] = useState(
    getParamValue(params, 'left', masterSnapshot),
  );
  const [rightSnapshot, setRightSnapshot] = useState(
    getParamValue(params, 'right', snapshotFromUrl(SNAPSHOT_URL)),
  );

  // We have separate state for the input field text
  // because we don't want to actually update our
  // URLs (and reload all the charts) until the
  // input field loses focus (onBlur).
  const [leftSnapshotText, setLeftSnapshotText] = useState(
    leftSnapshot.toString(),
  );
  const [rightSnapshotText, setRightSnapshotText] = useState(
    rightSnapshot.toString(),
  );

  const [sortType, setSortType] = useState<SortType>(
    getParamValue(params, 'sort', SortType.METRIC_DIFF),
  );
  const [metric, setMetric] = useState(
    getParamValue(params, 'metric', Metric.CASE_DENSITY),
  );
  const [locations, setLocations] = useState(
    getParamValue(
      params,
      'locations',
      Locations.STATES_AND_INTERESTING_COUNTIES,
    ),
  );

  // Load models for all states or counties.
  let { projectionsSet, loadingText } = useProjectionsSet(
    leftSnapshot,
    rightSnapshot,
    locations,
    metric,
  );
  projectionsSet = projectionsSet.sortBy(sortType, metric);

  const leftVersion = useSnapshotVersion(leftSnapshot);
  const rightVersion = useSnapshotVersion(rightSnapshot);

  function setQueryParams(newParams: {
    left?: number;
    right?: number;
    sort?: number;
    metric?: number;
    locations?: number;
  }) {
    const params = {
      left: leftSnapshot,
      right: rightSnapshot,
      sort: sortType,
      metric: metric,
      locations: locations,
      ...newParams,
    };

    history.push({
      ...location,
      search: QueryString.stringify(params),
    });
  }

  const changeLeftSnapshot = () => {
    const left = parseInt(leftSnapshotText);
    if (!Number.isNaN(left)) {
      setLeftSnapshot(left);
      setQueryParams({ left });
    }
  };

  const changeRightSnapshot = () => {
    const right = parseInt(rightSnapshotText);
    if (!Number.isNaN(right)) {
      setRightSnapshot(right);
      setQueryParams({ right });
    }
  };

  // TODO: Figure out correct type for event.
  const changeSort = (event: any) => {
    const sort = parseInt(event.target.value);
    setSortType(sort);
    setQueryParams({ sort });
  };

  // TODO: Figure out correct type for event.
  const changeMetric = (event: any) => {
    const metric = parseInt(event.target.value);
    setMetric(metric);
    setQueryParams({ metric });
  };

  // TODO: Figure out correct type for event.
  const changeLocations = (event: any) => {
    const locations = parseInt(event.target.value);
    setLocations(locations);
    setQueryParams({ locations });
  };

  return (
    <Wrapper>
      <ModelSelectorContainer>
        <FormControl style={{ width: '8rem', marginRight: '1rem' }}>
          <TextField
            id="compare-left"
            label="Left Snapshot"
            value={leftSnapshotText}
            onChange={e => setLeftSnapshotText(e.target.value)}
            onBlur={() => changeLeftSnapshot()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                changeLeftSnapshot();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <FormControl style={{ width: '8rem' }}>
          <TextField
            id="compare-right"
            label="Right Snapshot"
            value={rightSnapshotText}
            onChange={e => setRightSnapshotText(e.target.value)}
            onBlur={() => changeRightSnapshot()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                changeRightSnapshot();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <FormControl style={{ width: '14rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Show:</InputLabel>
          <Select value={locations} onChange={changeLocations}>
            <MenuItem value={Locations.STATES_AND_INTERESTING_COUNTIES}>
              States & Interesting Counties
            </MenuItem>
            <MenuItem value={Locations.STATES}>States</MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_POPULATION}>
              Top {COUNTIES_LIMIT} Counties (by Population)
            </MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_DIFF}>
              Top {COUNTIES_LIMIT} Counties (by Diff)
            </MenuItem>
            <MenuItem value={Locations.TOP_METROS_BY_POPULATION}>
              Top {METROS_LIMIT} Metros (by Population)
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Metric:</InputLabel>
          <Select value={metric} onChange={changeMetric}>
            {ALL_METRICS.map(metric => (
              <MenuItem key={metric} value={metric}>
                {getMetricName(metric)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Sort by:</InputLabel>
          <Select value={sortType} onChange={changeSort}>
            <MenuItem value={SortType.SERIES_DIFF}>Series Diff (RMSD)</MenuItem>
            <MenuItem value={SortType.METRIC_DIFF}>Metric Diff</MenuItem>
            <MenuItem value={SortType.POPULATION}>Population</MenuItem>
            <MenuItem value={SortType.ALPHABETICAL}>Name</MenuItem>
          </Select>
        </FormControl>
      </ModelSelectorContainer>

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
    </Wrapper>
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

const ComparisonList = function ({
  metric,
  projectionsSet,
  loadingText,
}: {
  metric: Metric;
  projectionsSet: ProjectionsSet;
  loadingText: string;
}) {
  if (projectionsSet.isEmpty) {
    return <h1>{loadingText}</h1>;
  }

  return (
    <ModelComparisonsContainer>
      {projectionsSet.map(pair => (
        <ProjectionsCompare
          key={pair.locationName}
          metric={metric}
          pair={pair}
        />
      ))}
    </ModelComparisonsContainer>
  );
};

function ProjectionsCompare({
  metric,
  pair,
}: {
  metric: Metric;
  pair: ProjectionsPair;
}) {
  const localUrl = pair.locationURL.replace(/^.*covidactnow\.org/, '');
  return (
    <>
      <hr />
      <div style={{ marginLeft: '40px' }}>
        <h2>
          {pair.locationName}:{' '}
          <small>
            <ProjectionsGradeChange pair={pair} /> | population{' '}
            {formatInteger(pair.population)} | fips {pair.fips} |{' '}
            <a href={pair.locationURL}>prod</a> <a href={localUrl}>local</a>
          </small>
        </h2>
        <br />
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <ProjectionsChart metric={metric} projections={pair.left} />
          </Grid>
          <Grid item xs={6}>
            <ProjectionsChart metric={metric} projections={pair.right} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

function ProjectionsGradeChange({ pair }: { pair: ProjectionsPair }) {
  if (pair.left.getAlarmLevel() !== pair.right.getAlarmLevel()) {
    return (
      <Fragment>
        <ProjectionsGrade projections={pair.left} />
        ➔
        <ProjectionsGrade projections={pair.right} />
      </Fragment>
    );
  } else {
    return <ProjectionsGrade projections={pair.left} />;
  }
}

function ProjectionsGrade({ projections }: { projections: Projections }) {
  const color = projections.getAlarmLevelColor();
  const level = Level[projections.getAlarmLevel()];
  return <span style={{ color }}>{level}</span>;
}

const ProjectionsChart = React.memo(function ProjectionsChart({
  metric,
  projections,
}: {
  metric: Metric;
  projections: Projections;
}) {
  return <MetricChart metric={metric} projections={projections} />;
});

function useMasterSnapshot(): number | null {
  const [snapshot, setSnapshot] = useState<number | null>(null);
  useEffect(() => {
    async function fetchData() {
      setSnapshot(await fetchMasterSnapshotNumber());
    }
    fetchData();
  }, []);

  return snapshot;
}

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
            await fetchCountyProjections(leftSnapshot, topCounties),
            await fetchCountyProjections(rightSnapshot, topCounties),
          ),
        );
      } else if (locations === Locations.TOP_METROS_BY_POPULATION) {
        const topMetros = regions.topMetrosByPopulation(METROS_LIMIT);
        setProjectionsSet(
          ProjectionsSet.fromProjections(
            await fetchMetroProjections(leftSnapshot, topMetros),
            await fetchMetroProjections(rightSnapshot, topMetros),
          ),
        );
      } else if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
        const countyDiffs = await fetchCountyDiffs(
          leftSnapshot,
          rightSnapshot,
          metric,
        );
        if (countyDiffs !== null) {
          const topCounties = _.takeRight(
            countyDiffs.sort((a, b) => a.diff - b.diff),
            COUNTIES_LIMIT,
          ).map(cd => cd.county);
          setProjectionsSet(
            ProjectionsSet.fromProjections(
              await fetchCountyProjections(leftSnapshot, topCounties),
              await fetchCountyProjections(rightSnapshot, topCounties),
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
      } else if (locations === Locations.STATES_AND_INTERESTING_COUNTIES) {
        const interestingCounties = await fetchInterestingCounties(
          leftSnapshot,
          rightSnapshot,
          metric,
        );
        if (interestingCounties === null) {
          // Couldn't load summary files. Just fetch all county projections and take the top diffs (slow).
          setLoadingText(
            `Can't load "States & Interesting Counties" since there's no pre-generated summary file in https://github.com/covid-projections/covid-projections/tree/develop/scripts/alert_emails/summaries...`,
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
            await fetchCountyProjections(leftSnapshot, interestingCounties),
          );
          rightProjections = rightProjections.concat(
            await fetchCountyProjections(rightSnapshot, interestingCounties),
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

async function fetchInterestingCounties(
  leftSnapshot: number,
  rightSnapshot: number,
  metric: Metric,
): Promise<Region[] | null> {
  const countyDiffs = await fetchCountyDiffs(
    leftSnapshot,
    rightSnapshot,
    metric,
  );
  if (countyDiffs === null) {
    return null;
  }
  // Find the interesting counties.
  return _.takeRight(
    countyDiffs
      .filter(
        cd =>
          cd.county.population >= INTERESTING_POPULATION ||
          cd.diff >= ProjectionsPair.MISSING_METRIC_DIFF,
      )
      .sort((a, b) => a.diff - b.diff),
    INTERESTING_TOP_DIFFS,
  ).map(cd => cd.county);
}

function fetchCountyProjections(
  snapshotNumber: number,
  counties: Region[],
): Promise<Projections[]> {
  return Promise.all(
    counties.map(region =>
      fetchProjectionsRegion(region, snapshotUrl(snapshotNumber)).catch(err => {
        console.error(err);
        return null;
      }),
    ),
  ).then(counties => counties.filter(p => p !== null) as Projections[]);
}

function fetchMetroProjections(
  snapshotNumber: number,
  metros: MetroArea[],
): Promise<Projections[]> {
  return Promise.all(
    metros.map(region =>
      fetchProjectionsRegion(region, snapshotUrl(snapshotNumber)).catch(err => {
        console.error(err);
        return null;
      }),
    ),
  ).then(metros => metros.filter(p => p !== null) as Projections[]);
}

async function fetchCountyDiffs(
  leftSnapshot: number,
  rightSnapshot: number,
  metric: Metric,
): Promise<Array<{ county: Region; diff: number }> | null> {
  const leftSummaries = await fetchSummaries(leftSnapshot).catch(e => null);
  const rightSummaries = await fetchSummaries(rightSnapshot).catch(e => null);
  if (leftSummaries === null || rightSummaries === null) {
    return null;
  }

  const fipsList = _.union(
    Object.keys(leftSummaries),
    Object.keys(rightSummaries),
  ).filter(fips => fips.length === 5);
  const diffs: { [fips: string]: number } = {};
  for (const fips of fipsList) {
    const left = leftSummaries[fips]?.metrics?.[metric]?.value,
      right = rightSummaries[fips]?.metrics?.[metric]?.value;
    const leftValue = left == null ? null : left;
    const rightValue = right == null ? null : right;
    diffs[fips] = ProjectionsPair.metricValueDiff(leftValue, rightValue);
  }

  return regions.counties
    .filter(c => c.fipsCode in diffs)
    .map(c => ({
      county: c,
      diff: diffs[c.fipsCode],
    }));
}

function getParamValue(
  params: QueryString.ParsedQuery,
  param: string,
  defaultValue: number,
): number {
  let value = _.get(params, param, defaultValue);
  if (typeof value === 'string') {
    value = parseInt(value);
  }
  assert(
    typeof value === 'number' && !Number.isNaN(value),
    `Parameter ${param} has non-numeric value: ${value}`,
  );
  return value;
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
