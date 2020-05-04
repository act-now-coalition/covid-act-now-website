import * as moment from 'moment';
import { useState, useEffect } from 'react';
import { Projections } from './../models/Projections';
import { STATES, REVERSED_STATES, INTERVENTIONS } from '../enums';
import DataUrlJson from '../assets/data/data_url';
import fetch from 'node-fetch';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import {
  fetchSummaryWithTimeseriesMap,
  fetchAggregatedSummaryWithTimeseriesMaps,
} from 'api';

const DATA_URL = DataUrlJson.data_url.replace(/\/$/, '');

export async function fetchProjections(
  stateId,
  countyInfo = null,
  // TODO(michael): This is ignored right now. Need to fix if we want to revive
  // /compare (which is currently broken)
  dataUrl = DATA_URL,
) {
  let region;
  if (countyInfo) {
    region = RegionDescriptor.forCounty(countyInfo.full_fips_code);
  } else {
    region = RegionDescriptor.forState(stateId);
  }
  const summaryWithTimeseriesMap = await fetchSummaryWithTimeseriesMap(region);
  return new Projections(summaryWithTimeseriesMap, stateId, countyInfo);
}

/** Returns an array of `Projections` instances for all states. */
export async function fetchAllStateProjections() {
  const all = await fetchAggregatedSummaryWithTimeseriesMaps(
    RegionAggregateDescriptor.STATES,
  );
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state from an arbitrary intervention's summary data.
    const stateName =
      summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].stateName;
    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
    );
  });
}

/** Returns an array of `Projections` instances for all counties. */
export async function fetchAllCountyProjections() {
  const all = await fetchAggregatedSummaryWithTimeseriesMaps(
    RegionAggregateDescriptor.COUNTIES,
  );
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state / fips from an arbitrary intervention's summary data.
    const stateName =
      summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].stateName;
    const fips = summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].fips;
    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
      fips,
    );
  });
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
        let date = moment(version.timestamp).add(1, 'day');
        // But we don't want to accidentally show a future date.
        date = moment().diff(date) < 0 ? moment() : date;
        setLastUpdated(date.toDate());
      });
  }, [versionUrl]);

  return lastUpdated;
}
