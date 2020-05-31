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
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../../src/common/utils/model';
import { Projections } from '../../src/common/models/Projections';
import { Metric, ALL_METRICS } from '../../src/common/metric';

const BASE_URL = 'http://localhost:3000/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');
// How many screenshots to send to pageres at once.
const PAGERES_BATCH_SIZE = 10;

const SHARE_OUTPUT_SIZE = '1200x630';
const EXPORT_OUTPUT_SIZE = '2400x1350';

const BLACKLISTED_COUNTIES = [
  '11001', // DC - We treat it as a state, not a county.
];

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);

  console.log('Fetching projections...');
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();
  console.log('Fetch complete.');

  let screenshots = [] as Array<{ url: string; filename: string, outputSize: string }>;

  // Homepage share image.
  screenshots.push({ url: '/', filename: 'home', outputSize: SHARE_OUTPUT_SIZE });

  function addScreenshotsForLocation(relativeUrl: string, projections: Projections) {
    // Overall share image.
    screenshots.push({
      url: relativeUrl,
      filename: relativeUrl,
      outputSize: SHARE_OUTPUT_SIZE,
    });

    // Chart images.
    for (const metric of ALL_METRICS) {
      if (metric === Metric.FUTURE_PROJECTIONS || projections.getMetricValue(metric) !== null) {
        // TODO(michael): Unify the generation of these URLs somehow to make
        // sure we don't end up with accidental mismatches, etc.
        const shareUrl = urlJoin(relativeUrl, '/chart/', '' + metric);
        const exportUrl = urlJoin(shareUrl, '/export');
        screenshots.push({
          url: shareUrl,
          filename: shareUrl,
          outputSize: SHARE_OUTPUT_SIZE,
        });
        screenshots.push({
          url: exportUrl,
          filename: exportUrl,
          outputSize: EXPORT_OUTPUT_SIZE,
        });
      }
    }
  }

  for (const stateProjections of allStatesProjections) {
    const state = stateProjections.stateCode.toLowerCase();
    addScreenshotsForLocation(`/states/${state}`, stateProjections);
  }

  for (const countyProjections of allCountiesProjections) {
    const fips = countyProjections.county;
    if (!BLACKLISTED_COUNTIES.includes(fips)) {
      addScreenshotsForLocation(`/counties/${fips}`, countyProjections);
    }
  }

  // For testing.
  // screenshots = screenshots.slice(0, 43);

  while (screenshots.length > 0) {
    const pageres = new Pageres().dest(OUTPUT_DIR);
    const urls = [];
    const batchSize = Math.min(PAGERES_BATCH_SIZE, screenshots.length);
    for (let i = 0; i < batchSize; i++) {
      const s = screenshots.pop()!;
      urls.push(s.url);
      await fs.ensureDir(path.join(OUTPUT_DIR, s.filename, '..'));
      pageres.src(urlJoin(BASE_URL, s.url), [s.outputSize], {
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
})().catch(err => {
  console.error(err);
  process.exit(1);
});