const _ = require('lodash');
const fs = require('fs-extra');
const Promise = require('bluebird');
const path = require('path');
const { Projections } = require('./../models');
const { US_STATES } = require('./../enums');

async function getStateAndCountyDataFiles(stateCode) {
  const files = [
    `public/data/${stateCode}.0.json`,
    `public/data/${stateCode}.1.json`,
    `public/data/${stateCode}.3.json`,
    `public/data/${stateCode}.2.json`,
  ];

  const summaryFile = `public/data/county_summaries/${stateCode}.summary.json`;

  try {
    const countyFipsData = {};
    const stateData = await Promise.mapSeries(files, async file =>
      fs.readJson(file),
    );
    const stateProjections = new Projections(stateData, stateCode);

    const stateSummaryData = await fs.readJson(summaryFile);

    await Promise.mapSeries(
      stateSummaryData.counties_with_data,
      async fipsCode => {
        const files = [
          `public/data/county/${stateCode}.${fipsCode}.0.json`,
          `public/data/county/${stateCode}.${fipsCode}.1.json`,
          `public/data/county/${stateCode}.${fipsCode}.3.json`,
          `public/data/county/${stateCode}.${fipsCode}.2.json`,
        ];

        try {
          const countyData = await Promise.mapSeries(files, async file =>
            fs.readJson(file),
          );
          const countyProjections = new Projections(countyData, stateCode);

          countyFipsData[fipsCode] = countyProjections.getInterventionColor();
        } catch (err) {
          console.log(`Failed to get data for ${stateCode}.${fipsCode}`);
        }
      },
    );

    return {
      stateProjections,
      stateInterventionColor: stateProjections.getInterventionColor(),
      countyFipsData,
    };
  } catch (err) {
    console.log(`Failed to get data for ${stateCode}`);
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
