/**
 * Generates all of our share images (for Open Graph tags, etc.)
 *
 * Run via: yarn generate-share-images
 *
 * You must be running local server on port 3000 already (e.g. via `yarn start` or
 * `yarn serve -l 3000`)
 */
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import Pageres from 'pageres';
import moment from 'moment';
import urlJoin from 'url-join';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../../src/common/utils/model';
import { Projections } from '../../src/common/models/Projections';
import { ALL_METRICS } from '../../src/common/metric';
import {
  EXPLORE_METRICS,
  getChartIdByMetric,
} from '../../src/components/Explore';
import os from 'os-utils';

const BASE_URL = 'http://localhost:3000/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');

// How many screenshots to send to pageres at once.
const PAGERES_BATCH_SIZE = 50;
// How long (seconds) to wait for the expected div to render in the browser.
const PAGERES_TIMEOUT = 90;
// How many times to retry after any pageres failure.
const PAGERES_RETRIES = 2;

const SHARE_OUTPUT_SIZE = '1200x630';
const EXPORT_OUTPUT_SIZE = '2400x1350';

const BLACKLISTED_COUNTIES = [
  '11001', // DC - We treat it as a state, not a county.
];

export function getHomeSocialImageFilename() {
  const date = moment().format('YYYY-MM-DD');
  return `${date}-image-covid-us-map-cases.png`;
}

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);

  // Pageres adds process exit listeners for each chrome instance it launches,
  // and these can exceed the node's memory leak detection threshold and trigger
  // noisy "Possible EventEmitter memory leak detected." messages.
  process.setMaxListeners(100);

  console.log('Fetching projections...');
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();
  console.log('Fetch complete.');

  let screenshots = [] as Array<{
    url: string;
    filename: string;
    outputSize: string;
  }>;

  // Homepage share image.
  screenshots.push({
    url: '/',
    filename: getHomeSocialImageFilename(),
    outputSize: SHARE_OUTPUT_SIZE,
  });

  function addScreenshotsForLocation(
    relativeUrl: string,
    projections: Projections,
  ) {
    // Overall share image.
    screenshots.push({
      url: relativeUrl,
      filename: relativeUrl,
      outputSize: SHARE_OUTPUT_SIZE,
    });

    // Chart images.
    for (const metric of ALL_METRICS) {
      if (projections.getMetricValue(metric) !== null) {
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

    // Explore share images
    for (const exploreMetric of EXPLORE_METRICS) {
      const chartId = getChartIdByMetric(exploreMetric);
      const shareUrl = urlJoin(relativeUrl, `/explore/${chartId}`);
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

  for (const stateProjections of allStatesProjections) {
    const state = stateProjections.stateCode.toLowerCase();
    addScreenshotsForLocation(`/states/${state}`, stateProjections);
  }

  for (const countyProjections of allCountiesProjections) {
    const fips = countyProjections.primary.fips;
    if (!BLACKLISTED_COUNTIES.includes(fips)) {
      addScreenshotsForLocation(`/counties/${fips}`, countyProjections);
    }
  }

  // For testing.
  // screenshots = screenshots.slice(0, 43);

  const batches = _.chunk(screenshots, PAGERES_BATCH_SIZE);
  let screenshotsDone = 0;

  const start = Date.now();
  setInterval(() => {
    os.cpuUsage(v => {
      const minutes = (Date.now() - start) / 1000 / 60;
      const spm = (screenshotsDone / minutes).toFixed(2);
      console.log(`Screenshots left: ${screenshots.length - screenshotsDone}`);
      console.log(`Avg Screenshots/min: ${spm}`);
      console.log(
        `CPU Usage (%): ${Math.floor(v * 100)} [total cores: ${os.cpuCount()}]`,
      );
      console.log(
        `Memory Free: ${Math.floor(os.freemem())} / ${Math.floor(
          os.totalmem(),
        )}`,
      );
    });
  }, 60000);

  for (const batch of batches) {
    let triesLeft = PAGERES_RETRIES + 1;
    let success = false;
    while (!success && triesLeft > 0) {
      console.log(`Screenshotting: ${batch.map(s => s.url).join(', ')}`);
      const pageres = new Pageres({
        timeout: PAGERES_TIMEOUT,
      }).dest(OUTPUT_DIR);
      for (const s of batch) {
        await fs.ensureDir(path.join(OUTPUT_DIR, s.filename, '..'));
        pageres.src(urlJoin(BASE_URL, s.url), [s.outputSize], {
          selector: CSS_SELECTOR,
          filename: s.filename,
        });
      }

      try {
        await pageres.run();
        success = true;
        screenshotsDone += batch.length;
      } catch (e) {
        triesLeft--;
        if (triesLeft > 0) {
          console.error(e);
          console.error('Retries left: ', triesLeft);
        } else {
          throw e;
        }
      }
    }
  }

  console.log('Completed successfully.');
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
