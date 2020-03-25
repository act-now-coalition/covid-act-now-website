/**
 * 1. Downloads https://e.infogram.com/_/bo5pjUi7dprQAvs1l6oZ?src=embed
 *    (borrowed from https://www.aei.org/covid-2019-action-tracker/ embed).
 * 2. Saves it to data/aei-interventions-<GMT datetime>.html for safe-keeping.
 * 2. Parses out per-state granular intervention data.
 * 3. Buckets each state based on schools closed, bars/restaurants closed,
 *    and shelter-in-place ordered.
 * 4. Writes the results to data/aei-buckets-<GMT datetime>.csv for safe-keeping and diffing.
 *
 * See https://docs.google.com/document/d/1UTT2Lhbd2nExi46LIe7t66JEq5BMb45-PS47QVVDIlk/edit# for details.
 */

// For testing/dev: Set to the timestamp of an already downloaded file to avoid re-downloading repeatedly.
const USE_EXISTING_FILE = ''; // '20200325061811';

const AEI_EMBED_URL = 'https://e.infogram.com/_/bo5pjUi7dprQAvs1l6oZ?src=embed';

// This is the path to the actual data within the 'infographicData={...}' object.
const JSON_PATH_TO_DATA = ['elements', 'content', 'content', 'entities', '8bbc0f22-218e-4ad9-aa1d-262e2e6aa154', 'props', 'chartData', 'data', 0];

// Maps AEI data to short predictable strings. For things we want to ignore we explicitly map to ''
// so as to help us notice if their data structure changes.
const INTERVENTION_MAP = {
  'Confirmed cases': '', // we don't need them and they're not accurate.
  'Restricted state travel for state employees': 'restricted_travel',
  'School closure': 'closed_schools',
  'Closed non-essential businesses': 'closed_nonessential_businesses',
  'Closed bars and restaurants': 'closed_bars_restaurants',
  'Imposed or recommended curfew': 'curfew',
  'Waived fees for testing': 'free_testing',
  'Mandatory quarantine for visitors': 'visitor_quarantine',
  'Ordered residents to stay indoors': 'stay_at_home_order',
  'Limit size of gatherings': 'gathering_size_limit',

  'Activated National Guard': '',
  'Relaxed medical licensure': '',
  'Postponed Primaries': '',
  'Ordered elective surgeries postponed': '',
  'Ordered hospitals to increase capacity': '',
};


const execSync = require('child_process').execSync;
const fs = require('fs');
const dataDir = `${__dirname}/data`;

// Change YYYY-MM-DDTHH:MM:SS.mmm ISO timestamp into YYYYMMDDHHMMSS for
// including in filenames.
const FILE_TIME = USE_EXISTING_FILE || new Date().toISOString()
  .replace('T', '')
  .replace(/-/g, '')
  .replace(/:/g, '')
  .replace(/\..+/, '');

let html = downloadAEIHtml();
let rawData = extractRawInterventionsDataFromHtml(html)
const data = massageRawInterventionsData(rawData);
bucketData(data);

// Downloads the HTML page, saves it in data/, and returns the contents.
function downloadAEIHtml() {
  let file = '';
  file = `${dataDir}/aei-interventions-${FILE_TIME}.html`
  if (USE_EXISTING_FILE) {
    console.log(`Using existing ${file} file.`);
  } else {
    execSync(`curl -s ${AEI_EMBED_URL} > ${file}`);
    console.log(`Downloaded ${AEI_EMBED_URL} to ${file}`);
  }

  return fs.readFileSync(file, 'utf8');
}

// Parses out the interventions from the HTML and returns as JSON.
function extractRawInterventionsDataFromHtml(html) {
  const match = html.match(/<script>window.infographicData=({.*});<\/script>/);
  const parsed = JSON.parse(match[1]);

  // Traverse the JSON to the actual data we want.
  let data = parsed;
  JSON_PATH_TO_DATA.forEach(key => { data = data[key] });

  const result = {};
  data.forEach(stateData => {
    const state = stateData.shift();
    if (state === 'Washington DC') {
      return;
    }
    stateData.forEach(stateItem => {
      // Some items have some extra whitespace.
      stateItem = stateItem.replace(/\s*\n\s*/g, ' ');
      // We only care about the 'key: value' items.
      const itemMatch = stateItem.match(/\s*(.*)\s*:\s*(.*)\s*/);
      if (itemMatch) {
        const key = itemMatch[1];
        const value = itemMatch[2];
        result[state] = result[state] || { };
        result[state][key] = value;
      }
    });
  });
  return result;
}

function massageRawInterventionsData(data) {
  const result = { };
  for(const state in data) {
    const stateData = data[state];
    for(const key in stateData) {
      const value = stateData[key];
      const mapped_key = INTERVENTION_MAP[key];
      if (mapped_key !== '') {
        let mapped_value;
        if (mapped_key === 'gathering_size_limit') {
          mapped_value = (value === 'No limit') ? false : parseInt(value);
        } else if (mapped_key === 'curfew') {
          // coerce 'Recommended' into true.
          mapped_value = (value === 'No') ? false : true;
        } else if (value === 'Yes') {
          mapped_value = true;
        } else if (value === 'No') {
          mapped_value = false;
        }
        if (mapped_key === undefined || mapped_value === undefined) {
          console.error('Unexpected AEI data:', state, ':', key, ':', value);
          process.exit(-1);
        }
        result[state] = result[state] || { };
        result[state][mapped_key] = mapped_value;
      }
    }
  }
  return result;
}

function bucketData(data) {
  const buckets = [];
  for(const state in data) {
    const stateData = data[state];
    let action;
    const { stay_at_home_order, closed_schools, closed_bars_restaurants } = stateData;
    if (stay_at_home_order) {
      action = 'Shelter in Place';
    } else if (closed_schools && closed_bars_restaurants) {
      action = 'Social Distancing';
    } else {
      action = 'No Action';
    }
    const bucket = [
      state,
      action,
      stay_at_home_order ? 'Stay At Home' : '',
      closed_schools ? 'Closed Schools' : '',
      closed_bars_restaurants ? 'Closed Bars/Restaurants' : ''
    ];
    buckets.push(bucket.join(','));
  }
  const file = `${dataDir}/aei-buckets-${FILE_TIME}.csv`;
  fs.writeFileSync(file, buckets.join('\n'));
  console.log(`Wrote bucketization to ${file}`);
}
