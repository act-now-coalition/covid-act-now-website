import path from 'path';

import * as script_regions_data from './regions_data_do_not_use';
const fs = require('fs-extra');

const destinationDir = path.join(__dirname, '../../src/common/data/regions/');

/**
 * Generates the pre-processed region-by-fips-code mappings, avoids having
 * to build up everything on each load.
 *
 * The region objects still need to be "hydrated" -- reconstructed from PODT
 * JSON objects.  But this avoids a number of iterations and re-mappings.
 */
async function generateRegionByFipsMappings() {
  const STATES_JSON_FILE = path
    .join(destinationDir, 'states_by_fips.json')
    .toString();
  const COUNTIES_JSON_FILE = path
    .join(destinationDir, 'counties_by_fips.json')
    .toString();
  const METRO_AREAS_JSON_FILE = path
    .join(destinationDir, 'metro_areas_by_fips.json')
    .toString();

  console.log('  Generating <region>_by_fips.json mappings...');
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

/**
 * Generate some url-param to FIPS mappings, which can be used to validate routes
 * and speed lookups of regions by things other than FIPS id.
 *
 * Should match the lookups in useRegionFromParams();
 */
async function generateUrlToFipsMappings() {
  console.log('  Generating <route>_to_fips.json mappings...');

  const stateCodesToFips: { [index: string]: string } = {};
  const stateUrlsToFips: { [index: string]: string } = {};
  Object.keys(script_regions_data.statesByFips).forEach((fips: string) => {
    const state = script_regions_data.statesByFips[fips];
    stateCodesToFips[state.stateCode.toUpperCase()] = fips;
    stateUrlsToFips[state.urlSegment] = fips;
  });
  await fs.writeJson(
    path.join(destinationDir, 'state_codes_to_fips.json'),
    stateCodesToFips,
  );
  await fs.writeJson(
    path.join(destinationDir, 'state_url_segments_to_fips.json'),
    stateUrlsToFips,
  );

  const countyUrlsToFips: { [index: string]: string } = {};
  Object.keys(script_regions_data.countiesByFips).forEach((fips: string) => {
    const county = script_regions_data.countiesByFips[fips];
    // combine these in case counties have the same name
    const key = `${county.state.urlSegment}-${county.urlSegment}`;
    countyUrlsToFips[key] = fips;
  });
  await fs.writeJson(
    path.join(destinationDir, 'county_url_segments_to_fips.json'),
    countyUrlsToFips,
  );

  const metroAreaUrlsToFips: { [index: string]: string } = {};
  Object.keys(script_regions_data.metroAreasByFips).forEach((fips: string) => {
    const metroArea = script_regions_data.metroAreasByFips[fips];
    metroAreaUrlsToFips[metroArea.urlSegment] = fips;
  });
  await fs.writeJson(
    path.join(destinationDir, 'metro_area_url_segments_to_fips.json'),
    metroAreaUrlsToFips,
  );
}

async function main() {
  console.log('Preparing regions data');

  await generateRegionByFipsMappings();
  await generateUrlToFipsMappings();
  //console.log('  Generating valid routes')

  //

  //
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
