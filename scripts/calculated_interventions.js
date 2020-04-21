#!/usr/bin/env node -r esm
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import US_STATES from './../src/enums/us_states';
import { fetchStateSummary, fetchProjections } from '../src/utils/model';

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
        countyFipsData[fipsCode] = countyProjections.getAlarmLevelColor();
      } catch (ex) {
        console.log(`No color found for: ${stateAbbr} / ${fipsCode}`);
      }
    }),
  );

  return {
    stateProjections,
    stateInterventionColor: stateProjections.getAlarmLevelColor(),
    countyFipsData,
  };
}

(async () => {
  const stateInterventionMap = {};
  const countyInventionMap = {};

  const stateCodes = _.keys(US_STATES);
  await Promise.all(
    stateCodes.map(async stateCode => {
      const data = await getStateAndCountyDataFiles(stateCode);
      stateInterventionMap[stateCode] = data.stateInterventionColor;
      Object.assign(countyInventionMap, data.countyFipsData);
    }),
  );

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
