/**
 * Generates all of our share images (for Open Graph tags, etc.)
 *
 * Run via: yarn generate-share-images
 *
 * You must be running local server on port 3000 already (e.g. via `yarn start` or
 * `yarn serve -l 3000`)
 */
import fs from 'fs-extra';
import path from 'path';
import Pageres from 'pageres';
import urlJoin from 'url-join';
import { STATES } from '../../src/common';

// We don't care about the values here, but this is a cheap way to determine all
// of the counties we have any data for and should therefore screenshot.
import CalculatedCountyInterventionJSON from '../../src/assets/data/calculated_county_interventions.json';
const COUNTIES = Object.keys(CalculatedCountyInterventionJSON);

const BASE_URL = 'http://localhost:3000/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_SIZE = '1200x630';
// How many screenshots to send to pageres at once.
const PAGERES_BATCH_SIZE = 10;

const BLACKLISTED_COUNTIES = [
  '11001', // DC - We treat it as a state, not a county.
];

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);
  await fs.emptyDir(`${OUTPUT_DIR}/states`);
  await fs.emptyDir(`${OUTPUT_DIR}/counties`);

  let screenshots = [] as Array<{ url: string; filename: string }>;

  screenshots.push({ url: '/', filename: 'home' });

  for (const stateCode in STATES) {
    const state = stateCode.toLowerCase();
    screenshots.push({
      url: `/states/${state}`,
      filename: `/states/${state}`,
    });
  }

  for (const fips of COUNTIES) {
    if (!BLACKLISTED_COUNTIES.includes(fips)) {
      screenshots.push({
        url: `/counties/${fips}`,
        filename: `/counties/${fips}`,
      });
    }
  }

  // For testing.
  // screenshots = screenshots.slice(0, 43);

  while (screenshots.length > 0) {
    const pageres = new Pageres().dest(
      OUTPUT_DIR,
    );
    const urls = [];
    const batchSize = Math.min(PAGERES_BATCH_SIZE, screenshots.length);
    for (let i = 0; i < batchSize; i++) {
      const s = screenshots.pop()!;
      urls.push(s.url);
      pageres.src(urlJoin(BASE_URL, s.url), [OUTPUT_SIZE], {
        selector: CSS_SELECTOR,
        filename: s.filename,
      });
    }
    const batchUrls = urls.join(', ');
    console.log('Screenshotting:', batchUrls);
    console.log('Remaining screenshots:', screenshots.length);
    await pageres.run();
  }

  console.log('Completed successfully.');
  process.exit(0);
})();
