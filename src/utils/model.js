import { useState, useEffect } from 'react';
import { Projections } from './../models';

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
  containNow: 2,
  weakDistancingNow: 3,
};

const initialData = {
  location: null,
  county: null,
  stateDatas: null,
  countyDatas: null,
};

async function fetchSummary(setModelDatas, location) {
  const summaryUrl = `/data/county_summaries/${location.toUpperCase()}.summary.json`;

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

async function fetchData(
  setModelDatas,
  location,
  county = null,
  dataUrl = null,
) {
  dataUrl = dataUrl || '/data/';
  if (dataUrl[dataUrl.length - 1] !== '/') {
    dataUrl += '/';
  }

  let modelDataForKey = null;
  let urls = [
    ModelIds.baseline,
    ModelIds.strictDistancingNow,
    ModelIds.weakDistancingNow,
    ModelIds.containNow,
  ].map(i => {
    let fipsCode =
      county && county.full_fips_code ? county.full_fips_code : null;
    const stateUrl = `${dataUrl}${location}.${i}.json`;
    const countyUrl = `${dataUrl}county/${location.toUpperCase()}.${fipsCode}.${i}.json`;
    return county ? countyUrl : stateUrl;
  });
  try {
    let loadedModelDatas = await fetchAll(urls);
    //This is to fix county data format
    modelDataForKey = {
      projections: new Projections(loadedModelDatas, location, county),
      baseline: loadedModelDatas[0],
      strictDistancingNow: loadedModelDatas[1],
      weakDistancingNow: loadedModelDatas[2],
      containNow: loadedModelDatas[3],
    };
  } catch (err) {
    modelDataForKey = {
      error: true,
      payload: err,
    };
  }
  const key = county ? 'countyDatas' : 'stateDatas';

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
      fetchData(setModelDatas, location, null, dataUrl);
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
      fetchData(setModelDatas, location, county, dataUrl);
    }
  }, [dataUrl, county, location]);

  return modelDatas;
}

export function useStateSummaryData(state) {
  const [summaryData, setSummaryData] = useState(null);
  useEffect(() => {
    if (state) {
      fetch(`/data/case_summary/${state}.summary.json`)
        .then(data => data.json())
        .then(setSummaryData)
        .catch(err => {
          throw err;
        });
    }
  }, [state]);

  return summaryData;
}
