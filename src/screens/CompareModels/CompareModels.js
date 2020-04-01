import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as QueryString from 'query-string';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

import ModelChart from 'components/Charts/ModelChart';
import { INTERVENTION_JSON_MAPPING, STATES, STATE_TO_INTERVENTION } from 'enums';
import { useModelDatas } from 'utils/model';
import { buildInterventionMap } from 'screens/ModelPage/ModelPage';

import {
  Wrapper,
  ModelSelectorContainer,
  ModelComparisonsContainer,
} from './CompareModels.style';

export function CompareModels({ match, location }) {
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [leftUrl, setLeftUrl] = useState(get(params, 'left', '/data/'));
  const [rightUrl, setRightUrl] = useState(
    // NOTE: The actual website doesn't handle CORS
    // requests so we have to hit the S3 buckets for now.
    get(
      params,
      'right',
      'https://covidactnow-testing.s3-us-west-1.amazonaws.com/',
    ),
  );

  // We have separate state for the input field text
  // because we don't want to actually update our
  // URLs (and reload all the charts) until the
  // input field loses focus (onBlur).
  const [leftText, setLeftText] = useState(leftUrl);
  const [rightText, setRightText] = useState(rightUrl);

  // We need to let you force a refresh because you may
  // be pointing at model files on a localhost
  // webserver that have changed since the page was loaded.
  const [refreshing, setRefreshing] = useState(false);

  function setQueryParams(leftText, rightText) {
    const params = {
      left: leftText,
      right: rightText,
    };

    history.push({
      ...location,
      search: QueryString.stringify(params),
    });
  }

  const [sortedStates, setSortedStates] = useState(Object.keys(STATES));
  const [sortType, setSortType] = useState(0);

  function refresh() {
    setLeftUrl(leftText);
    setRightUrl(rightText);
    setQueryParams(leftText, rightText);
    setRefreshing(true);
  }

  if (refreshing) {
    setTimeout(() => setRefreshing(false), 0);
  }

  useEffect(() => {
    let sortFn = (a, b) => {
      return a < b ? -1 : 1;
    };

    if (sortType === 1) {
      // sortFn = (a, b) => {
      //   return a > b ? -1 : 1;
      // };

      sortFn = (a, b) => {
        const overwhelmedA = GetDifferenceInDateOverwhelmed(a);
        const overwhelmedB = GetDifferenceInDateOverwhelmed(b);
        return overwhelmedA > overwhelmedB ? -1 : 1;
      };

      const GetDifferenceInDateOverwhelmed = (stateAbbr) => {
        let overwhelmedLeft = GetDateOverwhelmed(stateAbbr, useModelDatas(stateAbbr, /*county=*/ null, leftUrl));
        let overwhelmedRight = GetDateOverwhelmed(stateAbbr, useModelDatas(stateAbbr, /*county=*/ null, rightUrl));

        return Math.abs(moment.duration(overwhelmedLeft.diff(overwhelmedRight, 'hours', true)));
      };

      const GetDateOverwhelmed = (stateAbbr, modelDatasMap) => {
        const intervention = STATE_TO_INTERVENTION[stateAbbr];
        const interventions = buildInterventionMap(modelDatasMap.state);

        let targetKey = Object.keys(interventions).find(key => {
          let selectedIntervention = interventions[key];
          if (selectedIntervention && selectedIntervention.now) {
            return selectedIntervention.now.intervention === intervention;
          }
        });

        if (!!targetKey) {
          return interventions[targetKey].now.dateOverwhelmed;
        }
      };
    }

    let states = Object.keys(STATES);
    const sorted = [...states].sort(sortFn);
    setSortedStates(sorted);
  }, [sortType]);

  const changeFilter = event => {
    setSortType(event.target.value);
  };

  return (
    <Wrapper>
      <ModelSelectorContainer>
        <FormControl style={{ width: '35rem', marginRight: '1rem' }}>
          <TextField
            id="compare-left"
            label="Model Data URL (Left)"
            value={leftText}
            onChange={e => setLeftText(e.target.value)}
            onBlur={() => refresh()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                refresh();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <FormControl style={{ width: '35rem' }}>
          <TextField
            id="compare-right"
            label="Model Data URL (Right)"
            value={rightText}
            onChange={e => setRightText(e.target.value)}
            onBlur={() => refresh()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                refresh();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <Button variant="contained" onClick={() => refresh()}>
          Refresh
        </Button>
        <div style={{ fontSize: 'small', marginTop: '0.5rem' }}>
          Enter URLs pointing to .json model files. To test against local model
          files, run an http server from e.g. covid-data-model/results/test/.
          <br />
          Node HTTP server:{' '}
          <code style={{ backgroundColor: '#f0f0f0' }}>
            npx http-server --cors
          </code>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://stackoverflow.com/questions/21956683/enable-access-control-on-simple-http-server">
            Python HTTP Server
          </a>
        </div>
        <Select value={sortType} onChange={changeFilter}>
          <MenuItem value={0}>Alphabetical</MenuItem>
          <MenuItem value={1}>Difference in "Hospital Overload"</MenuItem>
        </Select>
      </ModelSelectorContainer>

      <StateComparisonList
        left={leftUrl}
        right={rightUrl}
        refreshing={refreshing}
        sortedStates={sortedStates}
      />
    </Wrapper>
  );
}

const StateComparisonList = React.memo(function ({ left, right, refreshing, sortedStates }) {
  return (
    <ModelComparisonsContainer>
      {sortedStates.map(state => (
        <StateCompare
          key={state}
          state={state}
          left={left}
          right={right}
          refreshing={refreshing}
        />
      ))}
    </ModelComparisonsContainer>
  );
});

function StateCompare({ state, left, right, refreshing }) {
  return (
    <>
      <hr />
      <h2>{STATES[state]}</h2>
      {!refreshing && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <StateChart state={state} dataUrl={left} />
          </Grid>
          <Grid item xs={6}>
            <StateChart state={state} dataUrl={right} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

function StateChart({ state, dataUrl }) {
  const modelDatasMap = useModelDatas(state, /*county=*/ null, dataUrl);
  const locationName = STATES[state];
  const intervention = STATE_TO_INTERVENTION[state];
  const interventions = buildInterventionMap(modelDatasMap.state);

  return (
    modelDatasMap.state && (
      // Chart height is 600px; we pre-load when a chart is within 1200px of view.
      <LazyLoad height={600} offset={1200}>
        <ModelChart
          state={locationName}
          county={null}
          subtitle="Hospitalizations over time"
          interventions={interventions}
          currentIntervention={intervention}
        />
      </LazyLoad>
    )
  );
}

export default CompareModels;
