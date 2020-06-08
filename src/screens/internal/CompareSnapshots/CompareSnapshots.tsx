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
import { assert } from 'common/utils';
import { MetricChart } from 'components/Charts';
import { useAllStateProjections } from 'common/utils/model';
import DataUrlJson from 'assets/data/data_url.json';
import {
  Wrapper,
  ModelComparisonsContainer,
  ModelSelectorContainer,
} from './CompareSnapshots.style';
import { Metric, getMetricName } from 'common/metric';
import { Projections } from 'common/models/Projections';
import { ProjectionsSet } from './ProjectionsSet';
import { SortType, ProjectionsPair } from './ProjectionsPair';

// TODO(michael): Compare page improvements:
// * Virtualize the list so that it's not so awful slow. NOTE: I previously
//   used react-lazyload for this, but it was buggy (sometimes would show stale
//   charts after changing state properties)
// * Add a chart that overlays the two series on top of each other.
// * Include counties.  We could fetch all the counties and then use our sorting
//   to find the ~50 with biggest changes.
// * Show the diff value (the RMSD of the series or the delta between metric values).
// * Automatically find the latest snapshot (probably by just incrementing the
//   snapshot number until it 404s)
// * Show snapshot metadata (the version.json file).

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
    getParamValue(params, 'right', snapshotFromUrl(DataUrlJson.data_url)),
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

  // Load models for all states.
  const leftProjections: Projections[] | null = useAllStateProjections(
    snapshotUrl(leftSnapshot),
  );
  const rightProjections: Projections[] | null = useAllStateProjections(
    snapshotUrl(rightSnapshot),
  );

  function setQueryParams(
    left: number,
    right: number,
    sort: number,
    metric: number,
  ) {
    const params = {
      left,
      right,
      sort,
      metric,
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
      setQueryParams(left, rightSnapshot, sortType, metric);
    }
  };

  const changeRightSnapshot = () => {
    const right = parseInt(rightSnapshotText);
    if (!Number.isNaN(right)) {
      setRightSnapshot(right);
      setQueryParams(leftSnapshot, right, sortType, metric);
    }
  };

  // TODO: Figure out correct type for event.
  const changeSort = (event: any) => {
    const value = parseInt(event.target.value);
    setSortType(value);
    setQueryParams(leftSnapshot, rightSnapshot, value, metric);
  };

  // TODO: Figure out correct type for event.
  const changeMetric = (event: any) => {
    const value = parseInt(event.target.value);
    setMetric(value);
    setQueryParams(leftSnapshot, rightSnapshot, sortType, value);
  };

  let projectionsSet = new ProjectionsSet([]);
  if (leftProjections && rightProjections) {
    projectionsSet = ProjectionsSet.fromProjections(
      leftProjections,
      rightProjections,
    );
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
      const response = await fetch(
        'https://raw.githubusercontent.com/covid-projections/covid-projections/master/src/assets/data/data_url.json',
      );
      const json = await response.json();
      setSnapshot(snapshotFromUrl(json['data_url']));
    }
    fetchData();
  }, []);

  return snapshot;
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

function snapshotFromUrl(url: string): number {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return parseInt(match[1]);
}

function snapshotUrl(snapshotNum: string | number) {
  return snapshotNum && `https://data.covidactnow.org/snapshot/${snapshotNum}`;
}

export default CompareSnapshots;
