/**
 * A script to preprocess regions data from the original/raw formats into
 * whatever shapes we need for the frontend, so we can avoid expensive load-and-process
 * operations on every site visit.
 *
 * For starters, just creates easily-deserialized versions of State, County,
 * and MetroArea region data.
 */
import path from 'path';
import _ from 'lodash';

import * as script_regions_data from './regions_data';
const fs = require('fs-extra');

const destinationDir = path.join(__dirname, '../../src/common/data/');

const STATES_JSON_FILE = path.join(destinationDir, 'states_by_fips.json');
const COUNTIES_JSON_FILE = path.join(destinationDir, 'counties_by_fips.json');
const METRO_AREAS_JSON_FILE = path.join(
  destinationDir,
  'metro_areas_by_fips.json',
);

async function main() {
  console.log('Preparing regions data');

  // map of output filenames to source data
  const files = {
    [STATES_JSON_FILE]: script_regions_data.statesByFips,
    [COUNTIES_JSON_FILE]: script_regions_data.countiesByFips,
    [METRO_AREAS_JSON_FILE]: script_regions_data.metroAreasByFips,
  };

  for (const [destFile, regions] of Object.entries(files)) {
    await fs.writeJson(
      destFile,
      _.mapValues(regions, r => r.toJSON()),
    );
  }
}

if (require.main === module) {
  main()
    .catch(err => {
      console.error(err);
      process.exit(-1);
    })
    .then(() => {
      console.log('Done.');
    });
}
