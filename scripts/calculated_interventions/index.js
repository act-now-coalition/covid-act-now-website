const _ = require('lodash');
const axios = require('axios');
const fs = require('fs-extra');
const Promise = require('bluebird');
const path = require('path');
const { Projections } = require('./../models');
const { US_STATES } = require('./../enums');
const DataUrlJson = require('../../src/assets/data/data_url.json');

const DATA_URL = DataUrlJson.data_url.replace(/\/$/, '');

async function getStateAndCountyDataFiles(stateCode) {
  const files = [
    `${stateCode}.0.json`,
    `${stateCode}.1.json`,
    `${stateCode}.3.json`,
    // `${stateCode}.2.json`,
  ];

  const summaryFile = `county_summaries/${stateCode}.summary.json`;

  try {
    const countyFipsData = {};
    const stateData = await Promise.mapSeries(files, async file =>
      fetchJson(file),
    );
    const stateProjections = new Projections(stateData, stateCode);

    const stateSummaryData = await fetchJson(summaryFile);

    await Promise.mapSeries(
      stateSummaryData.counties_with_data,
      async fipsCode => {
        const files = [
          `county/${stateCode}.${fipsCode}.0.json`,
          `county/${stateCode}.${fipsCode}.1.json`,
          `county/${stateCode}.${fipsCode}.3.json`,
          // `county/${stateCode}.${fipsCode}.2.json`,
        ];

        try {
          const countyData = await Promise.mapSeries(files, async file =>
            fetchJson(file),
          );
          const countyProjections = new Projections(countyData, stateCode);

          countyFipsData[
            fipsCode
          ] = countyProjections.getThresholdInterventionLevel();
        } catch (err) {
          console.error(`Failed to get data for ${stateCode}.${fipsCode}`, err);
        }
      },
    );

    return {
      stateProjections,
      stateInterventionColor: stateProjections.getThresholdInterventionLevel(),
      countyFipsData,
    };
  } catch (err) {
    console.error(`Failed to get data for ${stateCode}`, err);
  }
}

async function fetchJson(file) {
  if (DATA_URL.indexOf('http') === 0) {
    const response = await axios.get(`${DATA_URL}/${file}`);
    return response.data;
  } else {
    // Assumes that DATA_URL is a local file path relative to the /public
    // directory, which is good enough to make `/data' work.
    const fullPath = path.join(__dirname, '..', '..', 'public', DATA_URL, file);
    return fs.readJson(fullPath);
  }
}

(async () => {
  const stateInterventionMap = {};
  const countyInventionMap = {};

  const stateCodes = _.keys(US_STATES);

  await Promise.each(stateCodes, async stateCode => {
    const data = await getStateAndCountyDataFiles(stateCode);

    stateInterventionMap[stateCode] = data.stateInterventionColor;
    Object.assign(countyInventionMap, data.countyFipsData);
  });

  const outputFolder = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'assets',
    'data',
  );

  await fs.writeJson(
    `${outputFolder}/calculated_state_interventions.json`,
    stateInterventionMap,
  );
  await fs.writeJson(
    `${outputFolder}/calculated_county_interventions.json`,
    countyInventionMap,
  );
  console.log('done');
  process.exit(0);
})();
