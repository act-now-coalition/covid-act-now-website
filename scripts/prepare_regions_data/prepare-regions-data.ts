import path from 'path';

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

  //console.log('  Generating valid routes')

  // map of output filenames to source data
  const files: { [index: string]: any } = {
    [STATES_JSON_FILE]: script_regions_data.statesByFips,
    [COUNTIES_JSON_FILE]: script_regions_data.countiesByFips,
    [METRO_AREAS_JSON_FILE]: script_regions_data.metroAreasByFips,
  };

  // convert the constructed object map to one suitable for serializing
  const toObjMap = (m: { [index: string]: any }): { [index: string]: any } => {
    const result: any = {};
    Object.keys(m).forEach((k: string) => {
      result[k] = m[k].toObject();
    });
    return result;
  };

  await Object.keys(files).forEach(async (file: any) => {
    await fs.writeJson(file, toObjMap(files[file]));
  });
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
