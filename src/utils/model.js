import Promise from 'bluebird';
import * as moment from 'moment';
import { useState, useEffect } from 'react';
import { Projections } from './../models';
import { STATES } from 'enums';
import DataUrlJson from 'assets/data/data_url';

const DATA_URL = DataUrlJson.data_url.replace(/\/$/, '');

async function fetchAll(urls) {
  try {
    const data = await Promise.all(
      urls.map(url =>
        fetch(url)
          .then(response => {
            // 404 files currently return an html page instead of 404,
            // so need to handle this way...
            return response.text();
          })
          .then(responseText => {
            try {
              const jsonResponse = JSON.parse(responseText);

              return jsonResponse;
            } catch (err) {
              throw err;
            }
          }),
      ),
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export const ModelIds = {
  baseline: 0,
  strictDistancingNow: 1,
  projected: 2,
  weakDistancingNow: 3,
};

const initialData = {
  location: null,
  county: null,
  stateDatas: null,
  countyDatas: null,
};

async function fetchSummary(setModelDatas, location) {
  const summaryUrl = `${DATA_URL}/county_summaries/${location.toUpperCase()}.summary.json`;

  try {
    const summary = await fetchAll([summaryUrl]);
    setModelDatas(state => {
      return {
        ...state,
        summary: summary[0],
      };
    });
  } catch (err) {}
}

async function fetchData(location, county = null, dataUrl = DATA_URL) {
  dataUrl = dataUrl || DATA_URL;
  let modelDataForKey = null;
  let projectionsToLoad;
  if (!county) {
    projectionsToLoad = [
      ModelIds.baseline,
      ModelIds.strictDistancingNow,
      ModelIds.projected,
      ModelIds.weakDistancingNow,
    ];
  } else {
    projectionsToLoad = [
      ModelIds.baseline,
      ModelIds.strictDistancingNow,
      ModelIds.strictDistancingNow, // TODO(igor): HAX!
      ModelIds.weakDistancingNow,
    ];
  }
  let urls = projectionsToLoad.map(i => {
    let fipsCode =
      county && county.full_fips_code ? county.full_fips_code : null;
    const stateUrl = `${dataUrl}/${location}.${i}.json`;
    const countyUrl = `${dataUrl}/county/${location.toUpperCase()}.${fipsCode}.${i}.json`;
    return county ? countyUrl : stateUrl;
  });

  try {
    let loadedModelDatas = await fetchAll(urls);
    // HACK: Truncate data to 32 data points to make new models match old models.
    loadedModelDatas = loadedModelDatas.map(data => data.slice(0, 32));
    //This is to fix county data format
    modelDataForKey = {
      projections: new Projections(loadedModelDatas, location, county),
    };
  } catch (err) {
    modelDataForKey = {
      error: true,
      payload: err,
    };
  }

  return modelDataForKey;
}

async function fetchDataAndSet(
  setModelDatas,
  location,
  county = null,
  dataUrl = null,
) {
  const key = county ? 'countyDatas' : 'stateDatas';

  const modelDataForKey = await fetchData(location, county, dataUrl);

  setModelDatas(m => {
    return {
      ...m,
      location,
      county,
      [key]: modelDataForKey,
    };
  });
}

export function useModelDatas(location, county = null, dataUrl = null) {
  const [modelDatas, setModelDatas] = useState(initialData);
  useEffect(() => {
    if (location) {
      fetchDataAndSet(setModelDatas, location, null, dataUrl);
      fetchSummary(setModelDatas, location);
    }
  }, [dataUrl, location]);

  useEffect(() => {
    if (!county) {
      setModelDatas(state => {
        return {
          ...state,
          county: null,
          countyDatas: null,
        };
      });
    } else if (location) {
      fetchDataAndSet(setModelDatas, location, county, dataUrl);
    }
  }, [dataUrl, county, location]);

  return modelDatas;
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
    const promises = {};
    const states = Object.keys(STATES);

    for (let state of states) {
      promises[state] = fetchData(state, null, dataUrl);
    }

    Promise.props(promises)
      .then(results => {
        setStateModels(results);
      })
      .catch(e => {
        setStateModels(null);

        throw e;
      });
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
