// Script to compare FIPS<=>Name mappings in our various data sets to root out inconsistencies.

const fs = require('fs-extra');
const https = require('https');
const path = require('path');
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

const POPULATION_CSV_URL =
  'https://raw.githubusercontent.com/covid-projections/covid-data-model/main/libs/datasets/sources/fips_population.csv';
const REPO_FOLDER = path.join(__dirname, '../..');
const CENSUS_JSON_FILE = path.join(__dirname, '2018-census-fips-codes.json');
const SEARCH_JSON_FILE = path.join(
  REPO_FOLDER,
  'src/components/MapSelectors/datasets/us_states_dataset_01_02_2020.json',
);
const TOPO_FOLDER = path.join(
  REPO_FOLDER,
  'src/components/CountyMap/countyTopoJson/',
);
const MODELS_FOLDER = path.join(REPO_FOLDER, 'public/data/county/');

main();

async function main() {
  const censusData = await readCensusData();
  const searchData = await readSearchData();
  const topoData = await readTopoData();
  const modelsData = await readModelsData();
  const populationData = await readPopulationData();

  console.log(
    csv(
      'State',
      'FIPS Code',
      'Census Entry',
      'Population Entry',
      'Search Entry',
      'TOPO Entry',
    ),
  );
  for (const state of unionKeys(
    censusData,
    populationData,
    searchData,
    topoData,
    modelsData,
  )) {
    const cd = censusData[state],
      pd = populationData[state],
      sd = searchData[state],
      td = topoData[state],
      md = modelsData[state];

    // Ignore territories for now.
    if (['DC', 'PR'].includes(state)) {
      continue;
    }

    assert(cd, `Census Data is missing ${state}.`);
    assert(pd, `Population Data is missing ${state}.`);
    assert(sd, `Search Data is missing ${state}.`);
    assert(td, `Topo Data is missing ${state}.`);
    assert(md, `Model Data is missing ${state}.`);

    function compareNames(_baseline, _compare) {
      assert(_baseline, 'Baseline name must be defined.');
      if (!_compare) {
        return 'Missing';
      } else {
        const baseline = normalizeCityCountyName(_baseline);
        const compare = normalizeCityCountyName(_compare);
        if (baseline !== compare) {
          return _compare;
        } else {
          return 'Match';
        }
      }
    }

    for (const fips of unionKeys(cd, pd, sd, td, md)) {
      const census = cd[fips],
        population = pd[fips],
        search = sd[fips],
        topo = td[fips],
        model = md[fips];
      if (!census) {
        // Census is authoritative. If it's not there, there's a bug.
        throw new Error(`No census entry for ${state} / ${fips}`);
      }
      const pMatch = compareNames(census, population);
      const sMatch = compareNames(census, search);
      const tMatch = compareNames(census, topo);

      if (pMatch === 'Match' && sMatch === 'Match' && tMatch === 'Match') {
        // All data sets have an entry for this fips and the names all match.
        continue;
      }

      console.log(csv(state, fips, census, pMatch, sMatch, tMatch));
    }
  }
}

async function readCensusData() {
  return await fs.readJson(CENSUS_JSON_FILE);
}

async function readSearchData() {
  const result = {};
  const json = await fs.readJson(SEARCH_JSON_FILE);
  const stateCounties = json['state_county_map_dataset'];
  for (const state in stateCounties) {
    const counties = stateCounties[state]['county_dataset'];
    for (const countyData of counties) {
      const { full_fips_code, county } = countyData;
      record(result, state, full_fips_code, county);
    }
  }
  return result;
}

async function readTopoData() {
  const result = {};
  const files = await fs.readdir(TOPO_FOLDER);
  for (const file of files) {
    const state = file.split('.')[0];
    const json = await fs.readJson(path.join(TOPO_FOLDER, file));
    const objects = json['objects'];
    // I don't exactly understand the file, but there seems to be a single object in each JSON file.
    const objectKeys = Object.keys(objects);
    assert(
      objectKeys.length === 1,
      `Expected 1 object in ${file}, but found: ${objectKeys.join(',')}`,
    );
    const object = objects[objectKeys[0]];
    const { geometries } = object;
    for (const geometry of geometries) {
      const { properties } = geometry;
      const { GEOID, NAME } = properties;
      record(result, state, GEOID, NAME);
    }
  }
  return result;
}

async function readModelsData() {
  const result = {};
  const files = await fs.readdir(MODELS_FOLDER);
  for (const file of files) {
    const [state, county] = file.split('.');
    record(result, state, county, true);
  }
  return result;
}

async function readPopulationData() {
  const result = {};
  const csv = await fetch(POPULATION_CSV_URL);
  const parsed = await csvParse(csv);
  const columns = parsed.shift();
  for (const row of parsed) {
    const rowCols = {};
    for (let i = 0; i < row.length; i++) {
      rowCols[columns[i]] = row[i];
    }

    const { state, county, fips } = rowCols;
    record(result, state, fips, county);
  }
  return result;
}

function record(results, state, fips, countyName) {
  assert(typeof results === 'object', 'Passed uninitialized result set.');
  results[state] = results[state] || {};
  const existing = results[state][fips];
  if (existing) {
    // This shouldn't happen. But we'll just aggregate them for reporting purposes.
    results[state][fips] = existing + ', ' + countyName;
  } else {
    results[state][fips] = countyName;
  }
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    let contents = '';
    https.get(url, function (response) {
      if (response.statusCode !== 200) {
        reject(`Request Failed. Status: ${response.statusCode}`);
      }
      response.on('data', chunk => (contents += chunk));
      response.on('end', () => resolve(contents));
      response.on('error', reject);
    });
  });
}

function unionKeys(...objects) {
  const keys = {};
  for (const object of objects) {
    for (const key in object) {
      keys[key] = true;
    }
  }
  return Object.keys(keys).sort();
}

// TODO: Use a library.
function csv(...items) {
  return items
    .map(
      item => '"' + ('' + item).replace('\\', '\\\\').replace('"', '\\"') + '"',
    )
    .join(', ');
}

function normalizeCityCountyName(name) {
  if (!name) {
    return name;
  }

  name = name.toLowerCase();
  const removals = [
    'city and borough',
    'city',
    'county',
    'parish',
    'borough',
    'municipality',
    'census area',
  ];
  for (const removal of removals) {
    name = name.replace(removal, '');
  }
  return name.trim();
}

function assert(exp, message) {
  if (!exp) {
    throw new Error(message);
  }
}
