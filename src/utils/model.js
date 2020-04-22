import * as moment from 'moment';
import { useState, useEffect } from 'react';
import { Projections } from './../models/Projections';
import { STATES, INTERVENTIONS } from '../enums';
import DataUrlJson from '../assets/data/data_url';
import fetch from 'node-fetch';

const DATA_URL = DataUrlJson.data_url.replace(/\/$/, '');

async function fetchAll(urls) {
  return Promise.all(
    urls.map(async url => {
      try {
        const response = await fetch(url, { timeout: 60000 });
        const textResponse = await response.text();
        return JSON.parse(textResponse);
      } catch {
        return null;
      }
    }),
  );
}

export async function fetchProjections(
  stateId,
  countyInfo = null,
  dataUrl = DATA_URL,
) {
  const fileIdToIntervention = {
    0: INTERVENTIONS.LIMITED_ACTION,
    1: INTERVENTIONS.SHELTER_IN_PLACE,
    2: INTERVENTIONS.PROJECTED,
    3: INTERVENTIONS.SOCIAL_DISTANCING,
  };
  const fileIdsToLoad = Object.keys(fileIdToIntervention);

  // load all the projections for a state or county in parallel
  const countyProjectionUrl = i =>
    `${dataUrl}/county/${stateId.toUpperCase()}.${
      countyInfo.full_fips_code
    }.${i}.json`;
  const stateProjectionUrl = i => `${dataUrl}/${stateId}.${i}.json`;
  const urls = countyInfo
    ? fileIdsToLoad.map(i => countyProjectionUrl(i))
    : fileIdsToLoad.map(i => stateProjectionUrl(i));
  let projectionsData = await fetchAll(urls);

  // HACK: Truncate data to 32 data points to make new models match old models.
  projectionsData = projectionsData.map(data =>
    data ? data.slice(0, 32) : null,
  );

  // annotate each dataset with the intervention
  const projectionInfos = projectionsData.map((pd, idx) => ({
    data: pd,
    intervention: fileIdToIntervention[fileIdsToLoad[idx]],
  }));

  return new Projections(projectionInfos, stateId, countyInfo);
}

export function useProjections(location, county = null) {
  const [projections, setProjections] = useState();

  useEffect(() => {
    async function fetchData() {
      const projections = await fetchProjections(location, county);
      setProjections(projections);
    }
    fetchData();
  }, [location, county]);

  return projections;
}

export async function fetchStateSummary(stateId) {
  const response = await fetch(
    `${DATA_URL}/county_summaries/${stateId.toUpperCase()}.summary.json`,
  );
  return response.json();
}

export function useStateSummary(stateId) {
  const [countySummaries, setCountySummaries] = useState();

  useEffect(() => {
    async function fetchData() {
      setCountySummaries(await fetchStateSummary(stateId));
    }
    fetchData();
  }, [stateId]);

  return countySummaries;
}

export function useStateSummaryData(state) {
  const [summaryData, setSummaryData] = useState(null);
  useEffect(() => {
    if (state) {
      fetch(`${DATA_URL}/case_summary/${state}.summary.json`)
        .then(data => data.json())
        .then(setSummaryData)
        .catch(err => {
          throw err;
        });
    }
  }, [state]);

  return summaryData;
}

export function useAllStateModelDatas(dataUrl = null) {
  const [stateModels, setStateModels] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const states = Object.keys(STATES);
      const stateProjectionPromises = states.map(state =>
        fetchProjections(state, null, dataUrl),
      );
      const stateProjections = await Promise.all(stateProjectionPromises);
      const _stateModels = {};
      states.forEach((state, idx) => {
        _stateModels[state] = stateProjections[idx];
      });
      setStateModels(_stateModels);
    }
    fetchData();
  }, [dataUrl]);

  return stateModels;
}

export function useModelLastUpdatedDate() {
  const [lastUpdated, setLastUpdated] = useState(null);
  const versionUrl = `${DATA_URL}/version.json`;
  useEffect(() => {
    fetch(versionUrl)
      .then(data => data.json())
      .then(version => {
        // We add 1 day since models are generally published the day after
        // they're generated (due to QA process).
        const date = moment(version.timestamp).add(1, 'day');
        setLastUpdated(date.toDate());
      });
  }, [versionUrl]);

  return lastUpdated;
}
