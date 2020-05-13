// You can run via `yarn update-calculated-interventions`
import fs from 'fs-extra';
import path from 'path';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../src/common/utils/model';

(async () => {
  const stateInterventionMap = {} as { [key: string]: string };
  const countyInventionMap = {} as { [key: string]: string };

  // TODO(michael): This fetches all interventions for all regions, even though
  // we only really need 1 intervention (and it doesn't matter which) to
  // calculate the alarm level. But to fix this, we need to rework how
  // Projections works (so it doesn't require all intervention data, etc.).
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();

  for (const stateProjections of allStatesProjections) {
    const stateCode = stateProjections.stateCode;
    stateInterventionMap[stateCode] = stateProjections.getAlarmLevelColor();
  }

  for (const countyProjections of allCountiesProjections) {
    const fips = countyProjections.county;
    countyInventionMap[fips] = countyProjections.getAlarmLevelColor();
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
