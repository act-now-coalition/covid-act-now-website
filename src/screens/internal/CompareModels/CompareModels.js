import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
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
import { STATES } from 'common';
import { useAllStateProjections } from 'common/utils/model';
import DataUrlJson from 'assets/data/data_url.json';
import {
  Wrapper,
  ModelComparisonsContainer,
  ModelSelectorContainer,
} from './CompareModels.style';
import { Metric, getMetricName } from 'common/metric';

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

const SORT_TYPES = {
  ALPHABETICAL: 0,
  SERIES_DIFF: 1,
  METRIC_DIFF: 2,
};

export function CompareModels() {
  const masterSnapshot = useMasterSnapshot();
  // TODO(michael): Is there a better React-y way to condition the bulk of a
  // component on a hook result (without introducing a separate component)?
  if (!masterSnapshot) {
    return null;
  } else {
    return <CompareModelsMain masterSnapshot={masterSnapshot} />;
  }
}

function CompareModelsMain({ masterSnapshot, location }) {
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [leftSnapshot, setLeftSnapshot] = useState(
    get(params, 'left', masterSnapshot),
  );
  const [rightSnapshot, setRightSnapshot] = useState(
    get(params, 'right', snapshotFromUrl(DataUrlJson.data_url)),
  );

  // Load models for all states.
  const leftStateProjections = useAllStateProjections(
    snapshotUrl(leftSnapshot),
  );
  const rightStateProjections = useAllStateProjections(
    snapshotUrl(rightSnapshot),
  );

  // We have separate state for the input field text
  // because we don't want to actually update our
  // URLs (and reload all the charts) until the
  // input field loses focus (onBlur).
  const [leftText, setLeftText] = useState(leftSnapshot);
  const [rightText, setRightText] = useState(rightSnapshot);

  const [sortType, setSortType] = useState(
    parseInt(get(params, 'sort', SORT_TYPES.SERIES_DIFF)),
  );
  const [metric, setMetric] = useState(
    parseInt(get(params, 'metric', Metric.CASE_GROWTH_RATE)),
  );

  const sortFunctionMap = {
    [SORT_TYPES.ALPHABETICAL]: sortAlphabetical,
    [SORT_TYPES.SERIES_DIFF]: sortBySeriesDiff,
    [SORT_TYPES.METRIC_DIFF]: sortByMetricDiff,
  };

  // TODO(michael): Clean this up and move sorting functions out of the
  // component.
  function sortAlphabetical(a, b) {
    return a < b ? -1 : 1;
  }

  function sortBySeriesDiff(stateA, stateB) {
    const diffA = getSeriesDiffForState(stateA);
    const diffB = getSeriesDiffForState(stateB);
    if (diffA === diffB) {
      return 0;
    }
    return diffA > diffB ? -1 : 1;
  }

  function getSeriesDiffForState(stateAbbr) {
    const getDataset = projection => {
      switch (metric) {
        case Metric.CASE_GROWTH_RATE:
          return projection
            .getDataset('rtRange')
            .map(d => ({ x: d.x, y: d.y?.rt }));
        case Metric.POSITIVE_TESTS:
          return projection.getDataset('testPositiveRate');
        case Metric.HOSPITAL_USAGE:
          return projection.getDataset('icuUtilization');
        case Metric.CONTACT_TRACING:
          return projection.getDataset('contactTracers');
        case Metric.FUTURE_PROJECTIONS:
          return projection.getDataset('hospitalizations');
        default:
          fail('Unknown metric: ' + metric);
      }
    };

    const leftDataset = getDataset(leftStateProjections[stateAbbr].primary);
    const rightDataset = getDataset(rightStateProjections[stateAbbr].primary);
    const leftDataPoints = _.filter(leftDataset, d => d.y != null).length;
    const rightDataPoints = _.filter(rightDataset, d => d.y != null).length;

    // TODO(michael): Figure out how to incorporate missing data points better.
    if ((leftDataPoints === 0) !== (rightDataPoints === 0)) {
      // Only one state has data for the metric. That's probably bad.
      return 9999;
    } else if (leftDataPoints === 0 && rightDataPoints === 0) {
      // This can happen if a metric is disabled for a state.
      return 0;
    }

    const [left, right] = trimDatasetsToMatch(leftDataset, rightDataset);
    assert(left.length === right.length, `Datasets should match`);
    const length = left.length;

    const min = Math.min(_.minBy(left, d => d.y).y, _.minBy(right, d => d.y).y);
    const max = Math.max(_.maxBy(left, d => d.y).y, _.maxBy(right, d => d.y).y);
    const range = max - min;

    let sumSquareDiffs = 0;
    for (let i = 0; i < length; i++) {
      if ((left[i].y == null) !== (right[i].y == null)) {
        // TODO(michael): Figure out how to deal with missing data points better.
        sumSquareDiffs += range * range;
      }
      const diff = left[i].y - right[i].y;
      sumSquareDiffs += diff * diff;
    }
    const rmsd = Math.sqrt(sumSquareDiffs / length);
    return rmsd;
  }

  function trimDatasetsToMatch(left, right) {
    const startTime = Math.max(
      _.find(left, d => d.y != null).x,
      _.find(right, d => d.y != null).x,
    );
    const endTime = Math.min(
      _.findLast(left, d => d.y != null).x,
      _.findLast(right, d => d.y != null).x,
    );

    const leftStartIndex = _.findIndex(left, d => d.x === startTime);
    const rightStartIndex = _.findIndex(right, d => d.x === startTime);
    const leftEndIndex = _.findIndex(left, d => d.x === endTime);
    const rightEndIndex = _.findIndex(right, d => d.x === endTime);

    return [
      left.slice(leftStartIndex, leftEndIndex + 1),
      right.slice(rightStartIndex, rightEndIndex + 1),
    ];
  }

  function sortByMetricDiff(stateA, stateB) {
    const diffA = getMetricDiffForState(stateA);
    const diffB = getMetricDiffForState(stateB);
    if (diffA === diffB) {
      return 0;
    }
    return diffA > diffB ? -1 : 1;
  }

  function getMetricDiffForState(stateAbbr) {
    const getMetric = projection => {
      switch (metric) {
        case Metric.CASE_GROWTH_RATE:
          return projection.rt;
        case Metric.POSITIVE_TESTS:
          return projection.currentTestPositiveRate;
        case Metric.HOSPITAL_USAGE:
          return projection.currentIcuUtilization;
        case Metric.CONTACT_TRACING:
          return projection.currentContactTracerMetric;
        case Metric.FUTURE_PROJECTIONS:
          return projection.finalCumulativeDeaths;
        default:
          fail('Unknown metric: ' + metric);
      }
    };

    const left = getMetric(leftStateProjections[stateAbbr].primary);
    const right = getMetric(rightStateProjections[stateAbbr].primary);
    return Math.abs(left - right);
  }

  function setQueryParams(left, right, sort, metric) {
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
    setLeftSnapshot(leftText);
    setQueryParams(leftText, rightText, sortType, metric);
  };

  const changeRightSnapshot = () => {
    setRightSnapshot(rightText);
    setQueryParams(leftText, rightText, sortType, metric);
  };

  const changeSort = event => {
    setSortType(event.target.value);
    setQueryParams(leftText, rightText, event.target.value, metric);
  };

  const changeMetric = event => {
    setMetric(event.target.value);
    setQueryParams(leftText, rightText, sortType, event.target.value);
  };

  let states = Object.keys(STATES);
  if (leftStateProjections && rightStateProjections) {
    states = states.sort(sortFunctionMap[sortType]);
  }

  return (
    <Wrapper>
      <ModelSelectorContainer>
        <FormControl style={{ width: '8rem', marginRight: '1rem' }}>
          <TextField
            id="compare-left"
            label="Left Snapshot"
            value={leftText}
            onChange={e => setLeftText(e.target.value)}
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
            value={rightText}
            onChange={e => setRightText(e.target.value)}
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
            <MenuItem value={SORT_TYPES.SERIES_DIFF}>
              Series Diff (RMSD)
            </MenuItem>
            <MenuItem value={SORT_TYPES.METRIC_DIFF}>Metric Diff</MenuItem>
            <MenuItem value={SORT_TYPES.ALPHABETICAL}>State Name</MenuItem>
          </Select>
        </FormControl>
      </ModelSelectorContainer>

      <StateComparisonList
        states={states}
        metric={metric}
        leftProjections={leftStateProjections}
        rightProjections={rightStateProjections}
      />
    </Wrapper>
  );
}

const StateComparisonList = function ({
  states,
  metric,
  leftProjections,
  rightProjections,
}) {
  if (!leftProjections || !rightProjections) {
    return <div>Loading...</div>;
  }

  return (
    <ModelComparisonsContainer>
      {states.map(state => (
        <StateCompare
          key={state}
          state={state}
          metric={metric}
          leftProjections={leftProjections[state]}
          rightProjections={rightProjections[state]}
        />
      ))}
    </ModelComparisonsContainer>
  );
};

function StateCompare({ state, metric, leftProjections, rightProjections }) {
  return (
    <div style={{ marginLeft: '40px' }}>
      <hr />
      <h2>{STATES[state]}</h2>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <StateChart
            state={state}
            metric={metric}
            projections={leftProjections}
          />
        </Grid>
        <Grid item xs={6}>
          <StateChart
            state={state}
            metric={metric}
            projections={rightProjections}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const StateChart = React.memo(function StateChart({
  state,
  metric,
  projections,
}) {
  const locationName = STATES[state];

  if (!projections) {
    return <div>Failed to load data for {locationName}</div>;
  }

  return <MetricChart metric={metric} projections={projections} />;
});

function useMasterSnapshot() {
  const [snapshot, setSnapshot] = useState(undefined);
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

function snapshotFromUrl(url) {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return match[1];
}

function snapshotUrl(snapshotNum) {
  return snapshotNum && `https://data.covidactnow.org/snapshot/${snapshotNum}`;
}

export default CompareModels;
