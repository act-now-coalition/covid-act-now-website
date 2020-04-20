import React, { useState } from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import * as QueryString from 'query-string';

import ModelChart from 'components/Charts/ModelChart';
import { INTERVENTIONS, STATES, STATE_TO_INTERVENTION } from 'enums';
import { useAllStateModelDatas } from 'utils/model';

import {
  Wrapper,
  ComparisonControlsContainer,
  ModelSelectorContainer,
  ModelComparisonsContainer,
} from './CompareModels.style';

const SORT_TYPES = {
  ALPHABETICAL: 0,
  OVERWHELMED: 1,
};

const DEFAULT_INTERVENTION_FILTER = 'All';

export function CompareModels({ match, location }) {
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  // NOTE: The actual website doesn't handle CORS
  // requests so we have to hit the S3 buckets for now.
  const [leftUrl, setLeftUrl] = useState(
    get(
      params,
      'left',
      'https://s3-us-west-1.amazonaws.com/covidactnow.org/data',
    ),
  );
  const [rightUrl, setRightUrl] = useState(get(params, 'right', '/data'));

  // Load models for all states.
  const leftModelDatas = useAllStateModelDatas(leftUrl);
  const rightModelDatas = useAllStateModelDatas(rightUrl);

  // Now call buildInterventionMap() for each left/right state model datas.
  const leftModels = {},
    rightModels = {};
  const states = Object.keys(STATES);

  if (leftModelDatas && rightModelDatas) {
    for (const state of states) {
      try {
        leftModels[state] = leftModelDatas[state].projections;
      } catch (err) {
        console.log('Left models invalid:', err);
      }

      try {
        rightModels[state] = rightModelDatas[state].projections;
      } catch (err) {
        console.log('Right model invalid:', err);
      }
    }
  }

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

  const [sortType, setSortType] = useState(SORT_TYPES.ALPHABETICAL);
  const [filterTypeIntervention, setFilterTypeIntervention] = useState(
    DEFAULT_INTERVENTION_FILTER,
  );

  const sortFunctionMap = {
    [SORT_TYPES.ALPHABETICAL]: sortAlphabetical,
    [SORT_TYPES.OVERWHELMED]: sortByDateOverwhelmed,
  };

  function sortAlphabetical(a, b) {
    return a < b ? -1 : 1;
  }

  function sortByDateOverwhelmed(a, b) {
    const overwhelmedDifferenceA = getDifferenceInDateOverwhelmed(a);
    const overwhelmedDifferenceB = getDifferenceInDateOverwhelmed(b);
    if (overwhelmedDifferenceA === overwhelmedDifferenceB) {
      return 0;
    }
    return overwhelmedDifferenceA > overwhelmedDifferenceB ? -1 : 1;
  }

  function getDifferenceInDateOverwhelmed(stateAbbr) {
    let overwhelmedLeft = getDateOverwhelmed(stateAbbr, leftModels);
    let overwhelmedRight = getDateOverwhelmed(stateAbbr, rightModels);

    if (overwhelmedLeft === overwhelmedRight) {
      return 0;
    } else if (overwhelmedLeft === null || overwhelmedRight === null) {
      // if resources are never overwhelmed for only one of the models,
      // return a large number to sort that model to the top
      return 9999;
    } else {
      var dateOverwhelmedLeft = moment(overwhelmedLeft);
      var dateOverwhelmedRight = moment(overwhelmedRight);
      return Math.abs(
        moment
          .duration(dateOverwhelmedLeft.diff(dateOverwhelmedRight))
          .asHours(),
      );
    }
  }

  function getDateOverwhelmed(stateAbbr, models) {
    const interventions = models[stateAbbr];

    return interventions.worstCaseInterventionModel.dateOverwhelmed;
  }

  function filterByIntervention(stateAbbr) {
    return (
      filterTypeIntervention === DEFAULT_INTERVENTION_FILTER ||
      filterTypeIntervention === STATE_TO_INTERVENTION[stateAbbr]
    );
  }

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

  const changeSort = event => {
    setSortType(event.target.value);
  };

  const changeInterventionFilter = event => {
    setFilterTypeIntervention(event.target.value);
  };

  // HACK: When we re-sort, etc. LazyLoad doesn't notice that it may be visible.
  setTimeout(() => forceCheck(), 50);

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
        <ComparisonControlsContainer>
          <FormControl style={{ width: '12rem' }}>
            <InputLabel focused={false}>Sort by:</InputLabel>
            <Select value={sortType} onChange={changeSort}>
              ><MenuItem value={SORT_TYPES.ALPHABETICAL}>State Name</MenuItem>
              <MenuItem value={SORT_TYPES.OVERWHELMED}>
                Hospital Overload
              </MenuItem>
            </Select>
            {sortType === SORT_TYPES.OVERWHELMED && (
              <div style={{ fontSize: 'x-small' }}>
                ∆ between "Hospitals Overloaded" dates
              </div>
            )}
          </FormControl>
          <FormControl style={{ width: '12rem', marginLeft: '2rem' }}>
            <InputLabel focused={false}>Filter by intervention:</InputLabel>
            <Select
              value={filterTypeIntervention}
              onChange={changeInterventionFilter}
            >
              <MenuItem value={DEFAULT_INTERVENTION_FILTER}>
                {DEFAULT_INTERVENTION_FILTER}
              </MenuItem>
              <MenuItem value={INTERVENTIONS.LIMITED_ACTION}>
                {INTERVENTIONS.LIMITED_ACTION}
              </MenuItem>
              <MenuItem value={INTERVENTIONS.SOCIAL_DISTANCING}>
                {INTERVENTIONS.SOCIAL_DISTANCING}
              </MenuItem>
              <MenuItem value={INTERVENTIONS.SHELTER_IN_PLACE}>
                {INTERVENTIONS.SHELTER_IN_PLACE}
              </MenuItem>
            </Select>
          </FormControl>
        </ComparisonControlsContainer>
      </ModelSelectorContainer>

      <StateComparisonList
        states={states
          .filter(filterByIntervention)
          .sort(sortFunctionMap[sortType])}
        leftModels={leftModels}
        rightModels={rightModels}
        refreshing={refreshing}
      />
    </Wrapper>
  );
}

const StateComparisonList = function ({
  states,
  leftModels,
  rightModels,
  refreshing,
}) {
  if (!Object.keys(leftModels).length && !Object.keys(rightModels).length) {
    return <div>Loading...</div>;
  }

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
};

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
    return <div>Failed to load data for {locationName}</div>;
  }

  return (
    // Chart height is 600px; we pre-load when a chart is within 1200px of view.
    <LazyLoad height={600} offset={1200}>
      <ModelChart
        subtitle="Hospitalizations over time"
        interventions={models}
        currentIntervention={intervention}
        forCompareModels={true}
      />
    </LazyLoad>
  );
}

export default CompareModels;
