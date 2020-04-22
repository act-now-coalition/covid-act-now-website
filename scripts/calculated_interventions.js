#!/usr/bin/env node -r esm
import Promise from 'bluebird';
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import US_STATES from './../src/enums/us_states';
import { fetchStateSummary, fetchProjections } from '../src/utils/model';

// Limit concurrency (to ~200) to avoid file descriptor limits.
const CONCURRENT_STATES = 4;
const CONCURRENT_COUNTIES = 50;

async function getStateAndCountyDataFiles(stateAbbr) {
  const stateSummaryData = await fetchStateSummary(stateAbbr);
  const stateProjections = await fetchProjections(stateAbbr);
  let inferenceCounties = 0;
  let countyFipsData = {};
  await Promise.map(
    stateSummaryData.counties_with_data,
    async fipsCode => {
      try {
        const countyProjections = await fetchProjections(stateAbbr, {
          full_fips_code: fipsCode,
        });
        inferenceCounties += countyProjections.supportsInferred ? 1 : 0;
        countyFipsData[fipsCode] = countyProjections.getAlarmLevelColor();
      } catch (ex) {
        console.log(`No color found for: ${stateAbbr} / ${fipsCode}`);
      }
    },
    { concurrency: CONCURRENT_COUNTIES },
  );

  return {
    stateProjections,
    stateInterventionColor: stateProjections.getAlarmLevelColor(),
    countyFipsData,
    inferenceCounties,
  };
}

(async () => {
  const stateInterventionMap = {};
  const countyInventionMap = {};

  const stateCodes = _.keys(US_STATES);
  let totalInferenceCounties = 0;
  await Promise.map(
    stateCodes,
    async stateCode => {
      console.log(`Starting ${stateCode}`);
      const data = await getStateAndCountyDataFiles(stateCode);
      stateInterventionMap[stateCode] = data.stateInterventionColor;
      Object.assign(countyInventionMap, data.countyFipsData);
      totalInferenceCounties += data.inferenceCounties;
      console.log(
        `Finishing ${stateCode}, ${data.inferenceCounties} counties had inference data`,
      );
    },
    { concurrency: CONCURRENT_STATES },
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
  console.log(`done. ${totalInferenceCounties} counties had inference data`);
  process.exit(0);
})();
