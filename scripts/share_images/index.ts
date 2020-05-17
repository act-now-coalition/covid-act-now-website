// You can run via `yarn update-social-images`
import fs from 'fs-extra';
import path from 'path';
import Pageres from 'pageres';
import puppeteer from 'puppeteer';
import CalculatedInterventionJSON from '../../src/assets/data/calculated_state_interventions.json';
import CalculatedCountyInterventionJSON from '../../src/assets/data/calculated_county_interventions.json';

const BASE_URL = 'http://localhost:3000/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_SIZE = '1200x630';
// How many screenshots to send to pageres at once.
const PAGERES_BATCH_SIZE = 10;

const BLACKLISTED_COUNTIES = [
  '11001', // DC - missing data
];

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);
  await fs.emptyDir(`${OUTPUT_DIR}/states`);
  await fs.emptyDir(`${OUTPUT_DIR}/counties`);

  const browser = await puppeteer.launch();

  let screenshots = [] as Array<{ url: string; filename: string }>;

  screenshots.push({ url: '/', filename: 'home' });

  try {
    for (const stateCode in CalculatedInterventionJSON) {
      const state = stateCode.toLowerCase();
      screenshots.push({
        url: `/states/${state}`,
        filename: `/states/${state}`,
      });
    }

    for (const fips in CalculatedCountyInterventionJSON) {
      if (!BLACKLISTED_COUNTIES.includes(fips)) {
        screenshots.push({
          url: `/counties/${fips}`,
          filename: `/counties/${fips}`,
        });
      }
    }

    // For testing, just do first 101 screenshots.
    screenshots = screenshots.slice(0, 101);

    while (screenshots.length > 0) {
      const pageres = new Pageres({ browser, keepAlive: true }).dest(
        OUTPUT_DIR,
      );
      const urls = [];
      const batchSize = Math.min(PAGERES_BATCH_SIZE, screenshots.length);
      for (let i = 0; i < batchSize; i++) {
        const s = screenshots.pop()!;
        urls.push(s.url);
        pageres.src(BASE_URL + s.url, [OUTPUT_SIZE], {
          selector: CSS_SELECTOR,
          filename: s.filename,
        });
      }
      const batchUrls = urls.join(', ');
      console.log('Screenshotting:', batchUrls);
      console.log('Remaining screenshots:', screenshots.length);
      try {
        await pageres.run();
      } catch (err) {
        console.log('ERROR with batch:', batchUrls);
      }
    }
  } catch (err) {
    await browser.close();
    throw err;
  }

  await browser.close();

  console.log('Completed successfully.');
  process.exit(0);
})();
