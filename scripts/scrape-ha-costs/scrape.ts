/**
 * Run via: yarn scrape-ha-costs
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import uniq from 'lodash/uniq';
import countyZipcodes from '../../src/common/data/county-zipcode.json';
import regions, { belongsToState } from '../../src/common/regions';

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

async function main() {
  const result = {};
  for (const state of regions.states) {
    // Find counties in state.
    const counties = regions.counties.filter(c =>
      belongsToState(c, state.fipsCode),
    );
    // Find zipcodes in counties.
    const zipcodes = uniq(
      counties.map(c => (countyZipcodes as any)[c.fipsCode] || []).flat(),
    );

    // Check up to 3 zipcodes
    for (const zip of zipcodes.slice(0, 3)) {
      const url = `https://www.homeadvisor.com/sm/cost/widget/updateGeo?zipCode=${zip}&costGuideId=${COST_GUIDE_ID}`;
      const res = await fetch(url);
      const json = await res.json();
      const costData = json['costGuideWidgetDataHolder'];
      const regionCostData = costData['regionCostData'];

      // See if we got state data.
      if (regionCostData) {
        // Make sure it's the right state, since zipcodes cross state boundaries.
        if (
          state.fullName !== 'District of Columbia' &&
          regionCostData['geoName'] !== state.fullName
        ) {
          console.log(
            `Skipping zip ${zip} which returned ${regionCostData['geoName']} instead of ${state.fullName}`,
          );
          continue;
        }
        // Store state data.
        (result as any)[state.fipsCode] = {
          fipsCode: state.fipsCode,
          stateCode: state.stateCode,
          stateName: state.fullName,
          ...regionCostData,
        };
        break; // we can go to next state
      } else {
        console.log(`No ${state.name} data via zipcode ${zip}`);
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
  for (const entry of Object.values(result)) {
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

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
