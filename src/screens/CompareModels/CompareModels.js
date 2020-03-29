import React, { useState } from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as QueryString from 'query-string';

import ModelChart from 'components/Charts/ModelChart';
import { STATES, STATE_TO_INTERVENTION } from 'enums';
import { useAllStateModelDatas } from 'utils/model';
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

  function refresh() {
    setLeftUrl(leftText);
    setRightUrl(rightText);
    setQueryParams(leftText, rightText);
    setRefreshing(true);
  }

  if (refreshing) {
    setTimeout(() => setRefreshing(false), 0);
  }

  // Load models for all states.
  const leftModelDatas = useAllStateModelDatas(leftUrl);
  const rightModelDatas = useAllStateModelDatas(rightUrl);

  // Now call buildInterventionMap() for each left/right state model datas.
  const leftModels = { }, rightModels = { };
  const states = Object.keys(STATES);
  if (leftModelDatas && rightModelDatas) {
    for(const state of states) {
      leftModels[state] = buildInterventionMap(leftModelDatas[state]);
      rightModels[state] = buildInterventionMap(rightModelDatas[state]);
    }
  }

  // TODO: Re-sort states based on diffs?

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
      </ModelSelectorContainer>

      <StateComparisonList
        states={states}
        leftModels={leftModels}
        rightModels={rightModels}
        refreshing={refreshing}
      />
    </Wrapper>
  );
}

const StateComparisonList = React.memo(function ({ states, leftModels, rightModels, refreshing }) {
  return (
    <ModelComparisonsContainer>
      {states.map(state => (
        <StateCompare
          key={state}
          state={state}
          leftModels={leftModels[state]}
          rightModels={rightModels[state]}
          refreshing={refreshing}
        />
      ))}
    </ModelComparisonsContainer>
  );
});

function StateCompare({ state, leftModels, rightModels, refreshing }) {
  return (
    <>
      <hr />
      <h2>{STATES[state]}</h2>
      {!refreshing && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <StateChart state={state} models={leftModels} />
          </Grid>
          <Grid item xs={6}>
            <StateChart state={state} models={rightModels} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

function StateChart({ state, models }) {
  const locationName = STATES[state];
  const intervention = STATE_TO_INTERVENTION[state];

  if (!models) {
    return null;
  } else {
    return (
      // Chart height is 600px; we pre-load when a chart is within 1200px of view.
      <LazyLoad height={600} offset={1200}>
        <ModelChart
          state={locationName}
          county={null}
          subtitle="Hospitalizations over time"
          interventions={models}
          currentIntervention={intervention}
        />
      </LazyLoad>
    );
  }
}

export default CompareModels;