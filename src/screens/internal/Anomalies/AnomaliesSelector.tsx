import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fail } from 'common/utils';
import * as QueryString from 'query-string';
import { OptionsSelectorWrapper } from 'screens/internal/CompareSnapshots/OptionsSelector.style';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@material-ui/core';
import {
  useMainSnapshot,
  getNumericParamValue,
  Select,
} from '../CompareSnapshots/OptionsSelector';
import {
  AnnotationType,
  ANNOTATION_TYPES,
  annotationTypeNames,
  AnnotationSelectorProps,
  AnnotationSelectorInnerProps,
} from './utils';
import regions from 'common/regions';

export function AnnotationsSelector(props: AnnotationSelectorProps) {
  const mainSnapshot = useMainSnapshot();
  if (!mainSnapshot) {
    return null;
  } else {
    return <AnnotationsSelectorInner mainSnapshot={mainSnapshot} {...props} />;
  }
}

function AnnotationsSelectorInner({
  mainSnapshot,
  onNewOptions,
}: AnnotationSelectorInnerProps) {
  const location = useLocation();
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [snapshot, setSnapshot] = useState(
    getNumericParamValue(params, 'snapshot', mainSnapshot),
  );

  const [snapshotText, setSnapshotText] = useState(snapshot.toString());

  const [annotationType, setMetric] = useState(
    getNumericParamValue(params, 'annotationType', AnnotationType.NEW_CASES),
  );

  const [stateFips, setLocations] = useState<string>(
    getStateFipsParamValue(params, '01'),
  );

  useEffect(() => {
    onNewOptions({
      snapshot,
      stateFips,
      annotationType,
    });
  }, [snapshot, stateFips, annotationType, onNewOptions]);

  function setQueryParams(newParams: {
    snapshot?: number;
    annotationType?: number;
    stateFips?: string;
  }) {
    const params = {
      snapshot: snapshot,
      annotationType: annotationType,
      stateFips: stateFips,
      ...newParams,
    };

    history.push({
      ...location,
      search: QueryString.stringify(params),
    });
  }

  const changeSnapshot = () => {
    const snapshot = parseInt(snapshotText);
    if (!Number.isNaN(snapshot)) {
      setSnapshot(snapshot);
      setQueryParams({ snapshot });
    }
  };

  // TODO: Figure out correct type for event.
  const changeMetric = (event: any) => {
    const annotationType = parseInt(event.target.value);
    setMetric(annotationType);
    setQueryParams({ annotationType });
  };

  // TODO: Figure out correct type for event.
  const changeLocation = (event: any) => {
    const value = event.target.value;
    const stateFips = String(value);
    setLocations(stateFips);
    setQueryParams({ stateFips });
  };

  return (
    <OptionsSelectorWrapper>
      <FormControl style={{ width: '8rem', marginRight: '1rem' }}>
        <TextField
          id="snapshot"
          label="Snapshot"
          value={snapshotText}
          onChange={e => setSnapshotText(e.target.value)}
          onBlur={() => changeSnapshot()}
          onKeyPress={ev => {
            if (ev.key === 'Enter') {
              changeSnapshot();
              ev.preventDefault();
            }
          }}
        />
      </FormControl>
      <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
        <InputLabel focused={false}>Field:</InputLabel>
        <Select value={annotationType} onChange={changeMetric}>
          {ANNOTATION_TYPES.map(annotationType => (
            <MenuItem key={annotationType} value={annotationType}>
              {annotationTypeNames[annotationType]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: '14rem', marginLeft: '1rem' }}>
        <InputLabel focused={false}>State:</InputLabel>
        <Select value={stateFips} onChange={changeLocation}>
          {regions.states.map(state => (
            <MenuItem key={state.fipsCode} value={state.fipsCode}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </OptionsSelectorWrapper>
  );
}

function getStateFipsParamValue(
  params: QueryString.ParsedQuery,
  defaultValue: string,
): string {
  let value = get(params, 'stateFips', defaultValue);
  if (typeof value !== 'string' || regions.findByStateCode(value)) {
    fail(`Parameter 'stateFips' has unexpected value: ${value}`);
  } else {
    return value;
  }
}
