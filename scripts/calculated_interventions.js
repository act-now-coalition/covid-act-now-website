const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const US_STATES = require('./../src/enums/us_states');
import { fetchStateSummary, fetchProjections } from '../src/utils/model.js';

//const DataUrlJson = require('./../src/assets/data/data_url.json');
//const DATA_URL = DataUrlJson.data_url.replace(/\/$/, '');

async function getStateAndCountyDataFiles(stateAbbr) {
  const stateSummaryData = await fetchStateSummary(stateAbbr);
  const stateProjections = await fetchProjections(stateAbbr);

  let countyFipsData = {};
  await Promise.all(
    stateSummaryData.counties_with_data.map(async fipsCode => {
      try {
        const countyProjections = await fetchProjections(stateAbbr, {
          full_fips_code: fipsCode,
        });
        countyFipsData[fipsCode] = countyProjections;
      } catch (ex) {
        console.error(ex);
      }
    }),
  );

  return {
    stateProjections,
    stateInterventionColor: stateProjections.getThresholdInterventionLevel(),
    countyFipsData,
  };
}

(async () => {
  const stateInterventionMap = {};
  const countyInventionMap = {};

  const stateCodes = _.keys(US_STATES);
  try {
    await Promise.all(
      stateCodes.map(async stateCode => {
        const data = await getStateAndCountyDataFiles(stateCode);
        stateInterventionMap[stateCode] = data.stateInterventionColor;
        Object.assign(countyInventionMap, data.countyFipsData);
      }),
    );
  } catch (ex) {
    console.error(ex);
  }

  const outputFolder = path.join(__dirname, '..', 'src', 'assets', 'data');

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
