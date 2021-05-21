/**
 * Generates a JSON data file containing the historical case density of every
 * county in the US over time.
 *
 * You can run via `yarn generate-county-history-data`
 */

import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import { fetchAllCountyProjectionsByState } from '../../src/common/utils/model';
import { Projection } from '../../src/common/models/Projection';

async function main() {
  const allProjections = await fetchAllCountyProjectionsByState();
  const result = {} as {
    [date: string]: {
      [fips: string]: { population: number; caseDensity: number | null };
    };
  };

  for (const projections of allProjections) {
    const fips = projections.fips;
    const population = projections.population;
    const caseDensityData = (projections.primary as Projection).getDataset(
      'caseDensityByCases',
    );
    let lastValue: number | null = null;
    for (const point of caseDensityData) {
      const date = new Date(point.x);
      const caseDensity: number | null = point.y ?? lastValue;
      lastValue = caseDensity;
      const dateString = date.toISOString().replace(/T.*$/, '');
      result[dateString] = result[dateString] || {};
      result[dateString][fips] = {
        population,
        caseDensity,
      };
    }
  }

  const destDir = path.join(__dirname, 'out');
  fs.ensureDirSync(destDir);
  const dest = path.join(destDir, 'county-history-data.json');
  await fs.writeJson(dest, result);

  console.log(`Generated ${dest}`);
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(-1);
  });
}
