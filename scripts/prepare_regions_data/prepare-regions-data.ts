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

import { statesByFips, countiesByFips, metroAreasByFips } from './regions_data';
import {
  countyUrlParamsToUrlKey,
  generateStateUrlSegment,
  generateCountyUrlSegment,
  generateMetroAreaUrlSegment,
} from '../../src/common/regions';

const fs = require('fs-extra');

const destinationDir = path.join(__dirname, '../../src/common/data/');

/**
 * Our location URLs must be consistent over time to avoid broken URLs, but to
 * save space we don't want to load them unnecessarily them in the frontend code.
 * So this function validates that the computation functions used in the frontend
 * code generate url segments that exactly match the url segments stored in the raw
 * region data files.
 */
function validateUrlSegments() {
  console.log('Validating URL Segments...');
  let foundInvalid = false;
  for (const state of Object.values(statesByFips)) {
    const urlSegment = generateStateUrlSegment(state.name, state.stateCode);
    if (state.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('state invalid:', state, urlSegment);
    }
  }
  for (const county of Object.values(countiesByFips)) {
    const urlSegment = generateCountyUrlSegment(county.name);
    if (county.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('county invalid:', county, urlSegment);
    }
  }
  for (const metroArea of Object.values(metroAreasByFips)) {
    const urlSegment = generateMetroAreaUrlSegment(
      metroArea.name,
      metroArea.states.map(state => state.fipsCode),
    );
    if (metroArea.urlSegment !== urlSegment) {
      foundInvalid = true;
      console.log('metro area invalid:', metroArea, urlSegment);
    }
  }
  if (foundInvalid) {
    throw new Error('Invalid URL segment(s), please fix');
  }
}

/**
 * Write easily reconsituted regions data to files we can load at runtime,
 * so we can avoid as much of the preprocessing as possible.
 */
async function writeRegionsData() {
  console.log('Preparing regions data...');

  const STATES_JSON_FILE = path.join(destinationDir, 'states_by_fips.json');
  const COUNTIES_JSON_FILE = path.join(destinationDir, 'counties_by_fips.json');
  const METRO_AREAS_JSON_FILE = path.join(
    destinationDir,
    'metro_areas_by_fips.json',
  );

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
 * Generate some url-param to FIPS mappings, which can be used to validate routes
 * and speed lookups of regions by things other than FIPS id.
 *
 * Should match the lookups in useRegionFromParams();
 */
async function generateUrlToFipsMappings() {
  console.log('  Generating <route>_to_fips.json mappings...');

  /* we don't actually want to generate or load these files by state,
  since we are putting the statesByFips object into the main bundle,
  we can just generate these at load time
  const stateCodesToFips: { [index: string]: string } = {};
  const stateUrlsToFips: { [index: string]: string } = {};
  for (const [fips, state] of Object.entries(statesByFips)) {
    stateCodesToFips[state.stateCode.toUpperCase()] = fips;
    stateUrlsToFips[state.urlSegment] = fips;
  };

  await fs.writeJson(
    path.join(destinationDir, 'state_codes_to_fips.json'),
    stateCodesToFips,
  );
  await fs.writeJson(
    path.join(destinationDir, 'state_url_segments_to_fips.json'),
    stateUrlsToFips,
  );
  */

  const countyUrlsToFips: { [index: string]: string } = {};
  for (const [fips, county] of Object.entries(countiesByFips)) {
    const key = countyUrlParamsToUrlKey(
      county.state.urlSegment,
      county.urlSegment,
    );
    countyUrlsToFips[key] = fips;
  }

  await fs.writeJson(
    path.join(destinationDir, 'county_url_segments_to_fips.json'),
    countyUrlsToFips,
  );

  const metroAreaUrlsToFips: { [index: string]: string } = {};
  for (const [fips, metroArea] of Object.entries(metroAreasByFips)) {
    metroAreaUrlsToFips[metroArea.urlSegment] = fips;
  }
  await fs.writeJson(
    path.join(destinationDir, 'metro_area_url_segments_to_fips.json'),
    metroAreaUrlsToFips,
  );
}

async function main() {
  validateUrlSegments();
  await writeRegionsData();
  await generateUrlToFipsMappings();
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
