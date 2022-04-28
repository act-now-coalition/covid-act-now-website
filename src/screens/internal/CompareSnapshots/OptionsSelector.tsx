import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import * as QueryString from 'query-string';
import { assert } from 'common/utils';
import {
  fetchMainSnapshotNumber,
  snapshotFromUrl,
  SNAPSHOT_URL,
} from 'common/utils/snapshots';
import { SortType } from 'common/models/ProjectionsPair';
import { ALL_METRICS, getMetricName } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { OptionsSelectorWrapper } from './OptionsSelector.style';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  TextField,
} from '@material-ui/core';
import {
  COUNTIES_LIMIT,
  CompareLocations,
  METROS_LIMIT,
  CompareOptions,
} from './utils';
import { SelectProps } from '@material-ui/core/Select';
import regions from 'common/regions';

interface OptionsSelectorProps {
  onNewOptions: (options: CompareOptions) => void;
}

/**
 * Wrapper for material-ui Select component that disables scroll-lock to prevent
 * material-ui from modifying the body tag on open since that caused the entire
 * page (all graphs, etc.) to re-render causing a big perf hiccup.  See:
 * https://stackoverflow.com/q/60682426
 */
export const Select: React.FunctionComponent<SelectProps> = ({
  children,
  ...props
}) => {
  return (
    <MuiSelect
      {...props}
      inputProps={{ MenuProps: { disableScrollLock: true } }}
    >
      {children}
    </MuiSelect>
  );
};

export function OptionsSelector(props: OptionsSelectorProps) {
  const mainSnapshot = useMainSnapshot();
  // TODO(michael): Is there a better React-y way to condition the bulk of a
  // component on a hook result (without introducing a separate component)?
  if (!mainSnapshot) {
    return null;
  } else {
    return <OptionsSelectorInner mainSnapshot={mainSnapshot} {...props} />;
  }
}

interface OptionsSelectorInnerProps extends OptionsSelectorProps {
  mainSnapshot: number;
}

function OptionsSelectorInner({
  mainSnapshot,
  onNewOptions,
}: OptionsSelectorInnerProps) {
  const location = useLocation();
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [leftSnapshot, setLeftSnapshot] = useState(
    getNumericParamValue(params, 'left', mainSnapshot),
  );
  const [rightSnapshot, setRightSnapshot] = useState(
    getNumericParamValue(params, 'right', snapshotFromUrl(SNAPSHOT_URL)),
  );

  // We have separate state for the input field text because we don't want to
  // actually update our URLs (and reload all the charts) until the input field
  // loses focus (onBlur).
  const [leftSnapshotText, setLeftSnapshotText] = useState(
    leftSnapshot.toString(),
  );
  const [rightSnapshotText, setRightSnapshotText] = useState(
    rightSnapshot.toString(),
  );

  const [sortType, setSortType] = useState<SortType>(
    getNumericParamValue(params, 'sort', SortType.METRIC_DIFF),
  );
  const [metric, setMetric] = useState(
    getNumericParamValue(params, 'metric', Metric.WEEKLY_CASES_PER_100K),
  );

  const [locations, setLocations] = useState<string | number>(
    getLocationsParamValue(params),
  );

  useEffect(() => {
    const parsedLocations =
      typeof locations === 'string'
        ? regions.findByStateCodeStrict(locations)
        : (locations as CompareLocations);
    onNewOptions({
      leftSnapshot,
      rightSnapshot,
      sortType,
      metric,
      locations: parsedLocations,
    });
  }, [leftSnapshot, rightSnapshot, sortType, metric, locations, onNewOptions]);

  function setQueryParams(newParams: {
    left?: number;
    right?: number;
    sort?: number;
    metric?: number;
    locations?: number | string;
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
    const value = event.target.value;
    // See if it's a state code.
    let locations: string | number;
    if (typeof value === 'string' && regions.findByStateCode(value)) {
      locations = value;
    } else {
      locations = parseInt(value);
    }
    setLocations(locations);
    setQueryParams({ locations });
  };

  return (
    <OptionsSelectorWrapper>
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
          {ALL_METRICS.map(metric => (
            <MenuItem key={metric} value={metric}>
              {getMetricName(metric)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: '14rem', marginLeft: '1rem' }}>
        <InputLabel focused={false}>Show:</InputLabel>
        <Select value={locations} onChange={changeLocations}>
          <MenuItem value={CompareLocations.STATES_AND_INTERESTING_REGIONS}>
            States & Interesting Regions
          </MenuItem>
          <MenuItem value={CompareLocations.STATES}>States</MenuItem>
          <MenuItem value={CompareLocations.TOP_COUNTIES_BY_POPULATION}>
            Top {COUNTIES_LIMIT} Counties (by Population)
          </MenuItem>
          <MenuItem value={CompareLocations.TOP_COUNTIES_BY_DIFF}>
            Top {COUNTIES_LIMIT} Counties (by Diff)
          </MenuItem>
          <MenuItem value={CompareLocations.TOP_METROS_BY_POPULATION}>
            Top {METROS_LIMIT} Metros (by Population)
          </MenuItem>
          {regions.states.map(state => (
            <MenuItem key={state.stateCode} value={state.stateCode}>
              {state.name} Counties
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
    </OptionsSelectorWrapper>
  );
}

export function getNumericParamValue(
  params: QueryString.ParsedQuery,
  param: string,
  defaultValue: number,
): number {
  let value = get(params, param, defaultValue);
  if (typeof value === 'string') {
    value = parseInt(value);
  }
  assert(
    typeof value === 'number' && !Number.isNaN(value),
    `Parameter ${param} has non-numeric value: ${value}`,
  );
  return value;
}

function getLocationsParamValue(
  params: QueryString.ParsedQuery,
): number | string {
  let value = get(
    params,
    'locations',
    CompareLocations.STATES_AND_INTERESTING_REGIONS,
  );
  if (typeof value === 'string') {
    if (!regions.findByStateCode(value)) {
      value = parseInt(value);
      assert(
        typeof value === 'number' && !Number.isNaN(value),
        `Parameter 'locations' has non-numeric value: ${value}`,
      );
    }
  } else {
    assert(
      typeof value === 'number',
      `Invalid parameter 'locations': ${value}`,
    );
  }
  return value;
}

export function useMainSnapshot(): number | null {
  const [snapshot, setSnapshot] = useState<number | null>(null);
  useEffect(() => {
    async function fetchData() {
      setSnapshot(await fetchMainSnapshotNumber());
    }
    fetchData();
  }, []);

  return snapshot;
}
