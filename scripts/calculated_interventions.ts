// You can run via `yarn update-calculated-interventions`
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import US_STATES from './../src/enums/us_states';
import { fetchStateSummary, fetchProjections } from '../src/utils/model';

async function getStateAndCountyDataFiles(stateAbbr: string) {
  const stateSummaryData = await fetchStateSummary(stateAbbr);
  const stateProjections = await fetchProjections(stateAbbr);
  let inferenceCounties = 0;
  let countyFipsData = {} as { [key: string]: string };
  await Promise.all(
    stateSummaryData.counties_with_data.map(async (fipsCode: string) => {
      try {
        const countyProjections = await fetchProjections(stateAbbr, {
          full_fips_code: fipsCode,
        });
        inferenceCounties += countyProjections.supportsInferred ? 1 : 0;
        countyFipsData[fipsCode] = countyProjections.getAlarmLevelColor();
      } catch (ex) {
        console.log(ex)
        console.log(`No color found for: ${stateAbbr} / ${fipsCode}`);
      }
    }),
  );

  return {
    stateProjections,
    stateInterventionColor: stateProjections.getAlarmLevelColor(),
    countyFipsData,
    inferenceCounties,
  };
}

(async () => {
  const stateInterventionMap = {} as { [key: string]: string };
  const countyInventionMap = {};

  const stateCodes = _.keys(US_STATES);
  for (var i = 0; i < stateCodes.length; i++) {
    const stateCode = stateCodes[i];
    console.log(`Starting ${stateCode}`);
    const data = await getStateAndCountyDataFiles(stateCode);
    stateInterventionMap[stateCode] = data.stateInterventionColor;
    Object.assign(countyInventionMap, data.countyFipsData);
    console.log(
      `Finishing ${stateCode}, ${data.inferenceCounties} counties had inference data`,
    );
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
