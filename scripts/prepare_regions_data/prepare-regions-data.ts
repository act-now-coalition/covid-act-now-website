import path from 'path';

import * as script_regions_data from './regions_data_do_not_use';

import { LocationSummariesByFIPS } from '../../src/common/location_summaries';

const fs = require('fs-extra');
const destinationDir = path.join(__dirname, '../../src/common/data/');

function ensureDirectoryExistence(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  const dirname = path.dirname(dirPath);
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirPath);
}

/**
 * Generates the pre-processed region-by-fips-code mappings, avoids having
 * to build up everything on each load.
 *
 * The region objects still need to be "hydrated" -- reconstructed from PODT
 * JSON objects.  But this avoids a number of iterations and re-mappings.
 */
async function generateRegionByFipsMappings() {
  const destDir = path.join(destinationDir, 'regions');
  ensureDirectoryExistence(destDir);

  const STATES_JSON_FILE = path.join(destDir, 'states_by_fips.json').toString();
  const COUNTIES_JSON_FILE = path
    .join(destDir, 'counties_by_fips.json')
    .toString();
  const METRO_AREAS_JSON_FILE = path
    .join(destDir, 'metro_areas_by_fips.json')
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
    Object.entries(m).forEach(([k, v]) => {
      result[k] = v.toObject();
    });
    return result;
  };

  await Object.entries(files).forEach(async ([file, regionsByFips]) => {
    await fs.writeJson(file, toObjMap(regionsByFips));
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

  const destDir = path.join(destinationDir, 'regions');
  ensureDirectoryExistence(destDir);

  const stateCodesToFips: { [index: string]: string } = {};
  const stateUrlsToFips: { [index: string]: string } = {};
  Object.entries(script_regions_data.statesByFips).forEach(([fips, state]) => {
    //const state = script_regions_data.statesByFips[fips];
    stateCodesToFips[state.stateCode.toUpperCase()] = fips;
    stateUrlsToFips[state.urlSegment] = fips;
  });
  await fs.writeJson(
    path.join(destDir, 'state_codes_to_fips.json'),
    stateCodesToFips,
  );
  await fs.writeJson(
    path.join(destDir, 'state_url_segments_to_fips.json'),
    stateUrlsToFips,
  );

  const countyUrlsToFips: { [index: string]: string } = {};
  Object.entries(script_regions_data.countiesByFips).forEach(
    ([fips, county]) => {
      //const county = script_regions_data.countiesByFips[fips];
      // combine these in case counties have the same name
      const key = `${county.state.urlSegment}-${county.urlSegment}`;
      countyUrlsToFips[key] = fips;
    },
  );
  await fs.writeJson(
    path.join(destDir, 'county_url_segments_to_fips.json'),
    countyUrlsToFips,
  );

  const metroAreaUrlsToFips: { [index: string]: string } = {};
  Object.entries(script_regions_data.metroAreasByFips).forEach(
    ([fips, metroArea]) => {
      //const metroArea = script_regions_data.metroAreasByFips[fips];
      metroAreaUrlsToFips[metroArea.urlSegment] = fips;
    },
  );
  await fs.writeJson(
    path.join(destDir, 'metro_area_url_segments_to_fips.json'),
    metroAreaUrlsToFips,
  );
}

async function generateLocationPageProps() {
  console.log('  Generating location page props...');

  const fipsDestDir = path.join(destinationDir, 'fips');

  ensureDirectoryExistence(fipsDestDir);

  const regionsByFips = {
    ...script_regions_data.statesByFips,
    ...script_regions_data.countiesByFips,
    ...script_regions_data.metroAreasByFips,
    ...script_regions_data.customAreasByFips,
  };

  await Object.entries(regionsByFips).forEach(async ([fips, region]) => {
    const locationSummary = LocationSummariesByFIPS[fips];
    if (!Boolean(locationSummary)) {
      console.log('No location summary for ' + fips);
    } else {
      const props = {
        regionObject: region.toObject(),
        locationSummary,
      };

      await fs.writeJson(path.join(fipsDestDir, `${fips}-props.json`), props);
    }
  });
}

async function main() {
  console.log('Preparing regions data');

  await generateRegionByFipsMappings();
  await generateUrlToFipsMappings();
  await generateLocationPageProps();
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
