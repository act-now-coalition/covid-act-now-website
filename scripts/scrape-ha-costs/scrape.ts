/**
 * Run via: yarn scrape-ha-costs
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import uniq from 'lodash/uniq';
import fromPairs from 'lodash/fromPairs';
import countyZipcodes from '../../src/common/data/county-zipcode.json';
import regions, {
  belongsToState,
  County,
  State,
} from '../../src/common/regions';
import { assert } from '../../src/common/utils';

// Refers to the HomeAdvisor input data that we're collecting costs for.  E.g.
// if you visit https://www.homeadvisor.com/cost/heating-and-cooling/install-a-furnace/ and
// enter your zipcode in the "Furnace Replacement Cost Calculator", the network request you see
// in the Chrome network tab is:
// https://www.homeadvisor.com/sm/cost/widget/updateGeo?zipCode=94107&costGuideId=88&...
// so the cost guide ID is '88'
// Some known IDs:
// https://www.homeadvisor.com/cost/heating-and-cooling/install-a-heat-pump/ => 116
// https://www.homeadvisor.com/cost/heating-and-cooling/install-a-furnace/ => 88
// https://www.homeadvisor.com/cost/plumbing/install-a-water-heater/ => 263
const COST_GUIDE_ID = '116';

// false = just states; true = include metros
const SCRAPE_METROS = false;

async function main() {
  const states = {};
  const cbsas = {};

  let countySets = getCountySets();
  for (const [name, counties] of Object.entries(countySets)) {
    // Find zipcodes in counties.
    const zipcodes = uniq(
      counties.map(c => (countyZipcodes as any)[c.fipsCode] || []).flat(),
    );

    // Check up to 5 zipcodes
    for (const zip of pickEvenly(zipcodes, 5)) {
      const url = `https://www.homeadvisor.com/sm/cost/widget/updateGeo?zipCode=${zip}&costGuideId=${COST_GUIDE_ID}`;
      const res = await fetch(url);
      const json = await res.json();
      const costData = json['costGuideWidgetDataHolder'];
      const regionCostData = costData['regionCostData'];
      const localCostData = costData['localCostData'];

      // See if we got state data.
      if (regionCostData) {
        // Make sure it's the right state, since zipcodes cross state boundaries.
        let stateName = regionCostData['geoName'];
        if (stateName === 'Washington DC') {
          stateName = 'District of Columbia';
        }
        const state = regions.findByFullName(stateName) as State | undefined;
        if (!state) {
          console.log(
            `Skipping zip ${zip} which returned unknown state ${regionCostData['geoName']}`,
          );
          continue;
        }
        // Store state data.
        (states as any)[state.fipsCode] = {
          fipsCode: state.fipsCode,
          stateCode: state.stateCode,
          stateName: state.fullName,
          ...regionCostData,
        };
      }

      if (SCRAPE_METROS && localCostData) {
      } else {
        console.log(`No data via zipcode ${zip}`);
      }
    }
  }

  // CSV columns
  const keys = [
    'fipsCode',
    'stateCode',
    'stateName',
    'avgCost',
    'avgRangeMinCost',
    'avgRangeMaxCost',
    'minCost',
    'maxCost',
    'numCostProfiles',
  ];

  // Output CSV.
  const lines = [];
  lines.push(keys.join(','));
  for (const entry of Object.values(states)) {
    lines.push(
      keys
        .map(key => (entry as any)[key])
        .map(v => (typeof v === 'string' && v.includes(' ') ? `"${v}"` : v))
        .join(','),
    );
  }

  const file = path.join(__dirname, 'costs.csv');
  fs.writeFileSync(file, lines.join('\n'));
  console.log('Wrote results to', file);
}

function getCountySets(): { [name: string]: County[] } {
  if (SCRAPE_METROS) {
    return fromPairs(
      regions.metroAreas.map(metro => [
        metro.name,
        metro.countiesFips.map(
          fips => regions.findByFipsCodeStrict(fips) as County,
        ),
      ]),
    );
  } else {
    return fromPairs(
      regions.states.map(state => [
        state.name,
        regions.counties.filter(c => belongsToState(c, state.fipsCode)),
      ]),
    );
  }
}

function pickEvenly<T>(array: T[], n: number): T[] {
  const result = [] as T[];
  const skip = Math.floor(array.length / n) || 1;
  for (let i = 0; i < array.length && result.length < n; i += skip) {
    result.push(array[i]);
  }
  assert(result.length === n || n > array.length);
  return result;
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
