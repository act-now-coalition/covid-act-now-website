import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as QueryString from 'query-string';
import { assert, fail } from 'common/utils';
import { MetricChart } from 'components/Charts';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
  fetchProjections,
  snapshotFromUrl,
  snapshotUrl,
  fetchMasterSnapshotNumber,
} from 'common/utils/model';
import {
  Wrapper,
  ModelComparisonsContainer,
  ModelSelectorContainer,
} from './CompareSnapshots.style';
import { Metric, getMetricName } from 'common/metric';
import { Projections } from 'common/models/Projections';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import { SortType, ProjectionsPair } from 'common/models/ProjectionsPair';
import { topCountiesByPopulation } from 'common/locations';
import { SNAPSHOT_URL } from 'api';

// TODO(michael): Compare page improvements:
// * Virtualize the list so that it's not so awful slow. NOTE: I previously
//   used react-lazyload for this, but it was buggy (sometimes would show stale
//   charts after changing state properties)
// * Add a chart that overlays the two series on top of each other.
// * Show the diff value (the RMSD of the series or the delta between metric values).
// * Automatically find the latest snapshot (probably by just incrementing the
//   snapshot number until it 404s)
// * Show snapshot metadata (the version.json file).

enum Locations {
  STATES,
  TOP_COUNTIES_BY_POPULATION,
  TOP_COUNTIES_BY_DIFF,
}

const COUNTIES_LIMIT = 50;

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
    getParamValue(params, 'sort', SortType.SERIES_DIFF),
  );
  const [metric, setMetric] = useState(
    getParamValue(params, 'metric', Metric.CASE_GROWTH_RATE),
  );
  const [locations, setLocations] = useState(
    getParamValue(params, 'locations', Locations.STATES),
  );

  // Load models for all states or counties.
  const leftProjections: Projections[] | null = useAllProjections(
    snapshotUrl(leftSnapshot),
    locations,
  );
  const rightProjections: Projections[] | null = useAllProjections(
    snapshotUrl(rightSnapshot),
    locations,
  );

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

  let projectionsSet = new ProjectionsSet([]);
  if (leftProjections && rightProjections) {
    projectionsSet = ProjectionsSet.fromProjections(
      leftProjections,
      rightProjections,
    );

    if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
      projectionsSet = projectionsSet.top(COUNTIES_LIMIT, sortType, metric);
    } else if (locations === Locations.TOP_COUNTIES_BY_POPULATION) {
      projectionsSet = projectionsSet.top(
        COUNTIES_LIMIT,
        SortType.POPULATION,
        metric,
      );
    }

    projectionsSet = projectionsSet.sortBy(sortType, metric);
  }

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
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Show:</InputLabel>
          <Select value={locations} onChange={changeLocations}>
            <MenuItem value={Locations.STATES}>States</MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_POPULATION}>
              Top {COUNTIES_LIMIT} Counties (by Population)
            </MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_DIFF}>
              Top {COUNTIES_LIMIT} Counties (by Diff) [SLOW!!!]
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Metric:</InputLabel>
          <Select value={metric} onChange={changeMetric}>
            {[
              Metric.CASE_GROWTH_RATE,
              Metric.POSITIVE_TESTS,
              Metric.HOSPITAL_USAGE,
              Metric.CONTACT_TRACING,
              Metric.FUTURE_PROJECTIONS,
            ].map(metric => (
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

      <ComparisonList metric={metric} projectionsSet={projectionsSet} />
    </Wrapper>
  );
}

const ComparisonList = function ({
  metric,
  projectionsSet,
}: {
  metric: Metric;
  projectionsSet: ProjectionsSet;
}) {
  if (projectionsSet.isEmpty) {
    return <div>Loading...</div>;
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
  return (
    <div style={{ marginLeft: '40px' }}>
      <hr />
      <h2>{pair.locationName}</h2>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <ProjectionsChart metric={metric} projections={pair.left} />
        </Grid>
        <Grid item xs={6}>
          <ProjectionsChart metric={metric} projections={pair.right} />
        </Grid>
      </Grid>
    </div>
  );
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

function useAllProjections(
  snapshotUrl: string,
  locations: Locations,
): Projections[] | null {
  const [allProjections, setAllProjections] = useState<Projections[] | null>(
    null,
  );

  useEffect(() => {
    setAllProjections(null);

    async function fetchData() {
      const projections = await fetchAllProjections(snapshotUrl, locations);
      setAllProjections(projections);
    }
    if (snapshotUrl !== undefined) {
      fetchData();
    }
  }, [snapshotUrl, locations]);

  return allProjections;
}

function fetchAllProjections(
  snapshotUrl: string,
  locations: Locations,
): Promise<Projections[]> {
  if (locations === Locations.STATES) {
    return fetchAllStateProjections(snapshotUrl);
  } else if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
    return fetchAllCountyProjections(snapshotUrl);
  } else if (locations === Locations.TOP_COUNTIES_BY_POPULATION) {
    const topCounties = topCountiesByPopulation(COUNTIES_LIMIT);
    return Promise.all(
      topCounties.map(county =>
        fetchProjections(county.state_code, county, snapshotUrl),
      ),
    );
  } else {
    fail(`Unknown locations: ${locations}`);
  }
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

export default CompareSnapshots;
