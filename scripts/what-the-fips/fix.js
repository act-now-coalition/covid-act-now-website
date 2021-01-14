// Throwaway script to fix up mismatched counties in us_states_dataset_01_02_2020.json

const fs = require('fs-extra');
const https = require('https');
const path = require('path');
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

const POPULATION_CSV_URL =
  'https://raw.githubusercontent.com/covid-projections/covid-data-model/main/libs/datasets/sources/fips_population.csv';
const REPO_FOLDER = path.join(__dirname, '../..');
const SEARCH_JSON_FILE = path.join(
  REPO_FOLDER,
  'src/components/MapSelectors/datasets/us_states_dataset_01_02_2020.json',
);

main();

function compareNames(_baseline, _compare) {
  assert(_baseline, 'Baseline name must be defined.');
  if (!_compare) {
    return 'Missing';
  } else {
    const baseline = normalizeCityCountyName(_baseline.replace(/county/i, ''));
    const compare = normalizeCityCountyName(_compare);
    return baseline === compare;
  }
}

async function main() {
  const populationData = await readPopulationData();
  await fixSearchData(populationData);
}

async function fixSearchData(populationData) {
  const json = await fs.readJson(SEARCH_JSON_FILE);
  const stateCounties = json['state_county_map_dataset'];
  for (const state in stateCounties) {
    const countyPops = populationData[state];
    const counties = stateCounties[state]['county_dataset'];
    for (const countyData of counties) {
      const { county, full_fips_code } = countyData;
      if (
        ['36005', '36047', '36061', '36081', '36085'].includes(full_fips_code)
      ) {
        // skip NYC stuff.
        continue;
      }
      if (full_fips_code === '35013') {
        // Skip Doña Ana County
        continue;
      }
      const countyPopData = findPopData(countyPops, full_fips_code, county);
      const { fips, population } = countyPopData;
      countyData['full_fips_code'] = fips;
      countyData['state_fips_code'] = fips.substring(0, 2);
      countyData['county_fips_code'] = fips.substring(2);
      countyData['population'] = population;
    }
  }
  await fs.writeJson(SEARCH_JSON_FILE, json, { spaces: 2 });
}

function findPopData(countyPops, fips, name) {
  let bestFips = 0;
  for (const popFips in countyPops) {
    if (compareNames(countyPops[popFips].name, name)) {
      bestFips = popFips;
      if (countyPops[popFips].name.toLowerCase() === name.toLowerCase()) {
        break;
      }
    }
  }
  assert(
    bestFips !== 0,
    `Couldn't find population match for ${fips} / ${name}`,
  );
  return countyPops[bestFips];
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

    const { state, county, fips, population } = rowCols;
    result[state] = result[state] || {};
    result[state][fips] = {
      fips,
      name: county,
      population: parseInt(population),
    };
  }
  return result;
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
