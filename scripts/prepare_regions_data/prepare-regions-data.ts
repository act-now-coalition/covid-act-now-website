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

import {
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  stateFipsToUrlSegment,
  countyFipsToUrlSegment,
  metroAreaFipsToUrlSegment,
} from './regions_data';
import {
  generateStateUrlSegment,
  generateCountyUrlSegment,
  generateMetroAreaUrlSegment,
} from '../../src/common/regions';

const fs = require('fs-extra');

const destinationDir = path.join(__dirname, '../../src/common/data/');

const STATES_JSON_FILE = path.join(destinationDir, 'states_by_fips.json');
const COUNTIES_JSON_FILE = path.join(destinationDir, 'counties_by_fips.json');
const METRO_AREAS_JSON_FILE = path.join(
  destinationDir,
  'metro_areas_by_fips.json',
);

async function writeRegionsData() {
  console.log('Preparing regions data');

  // map of output filenames to source data
  const files = {
    [STATES_JSON_FILE]: statesByFips,
    [COUNTIES_JSON_FILE]: countiesByFips,
    [METRO_AREAS_JSON_FILE]: metroAreasByFips,
  };

  for (const [destFile, regions] of Object.entries(files)) {
    await fs.writeJson(
      destFile,
      _.mapValues(regions, r => r.toJSON()),
    );
  }
}

/**
 * Our location URLs must be consistent over time to avoid broken URLs, but to
 * save space we don't want to load them unnecessarily them in the frontend code.
 * So this function validates that the computation functions used in the frontend
 * code generate url segments that exactly match the url segments stored in the raw
 * region data files.
 */
function validateUrlSegments() {
  let foundInvalid = false;
  for (const [fips, urlSegment] of Object.entries(stateFipsToUrlSegment)) {
    const state = statesByFips[fips]!;
    if (state.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('state invalid:', state, urlSegment);
    }
  }
  for (const [fips, urlSegment] of Object.entries(countyFipsToUrlSegment)) {
    const county = countiesByFips[fips]!;
    if (county.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('county invalid:', county, urlSegment);
    }
  }
  for (const [fips, urlSegment] of Object.entries(metroAreaFipsToUrlSegment)) {
    const metroArea = metroAreasByFips[fips]!;
    if (metroArea.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('metro area invalid:', metroArea, urlSegment);
    }
  }
  if (foundInvalid) {
    throw new Error('Invalid URL segment(s), please fix');
  }
  console.log('validated urlSegments');
}

async function main() {
  validateUrlSegments();
  await writeRegionsData();
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
