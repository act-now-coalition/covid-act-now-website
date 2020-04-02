const path = require('path');
const fs = require('fs-extra');
const Promise = require('bluebird');
const Pageres = require('pageres');
const moment = require('moment');
const { chunk } = require('lodash');
const SCREENSHOT_ENUMS = require('./enums');

(async () => {
  const FILE_NAME = '<%= url %>';
  const BASE_URL = 'https://covidactnow.org';
  const OUTPUT_SIZE = '1920x1080';
  const DELAY = 1;
  const CHUNK_SIZE = 20;

  const now = moment();

  const outputFolder = path.join(
    __dirname,
    'output',
    'screenshots',
    now.format('YYYY'),
    now.format('MM'),
    now.format('DD'),
    now.format('HH_mm'),
  );

  await fs.ensureDir(outputFolder);

  function screenshot(selector, page) {
    return new Pageres({
      delay: DELAY,
      filename: FILE_NAME,
      selector,
    })
      .src(BASE_URL + page, [OUTPUT_SIZE])
      .dest(outputFolder);
  }

  const promises = [
    screenshot(
      SCREENSHOT_ENUMS.HOME_PAGE.SELECTOR,
      SCREENSHOT_ENUMS.HOME_PAGE.DATASET,
    ),
  ];

  promises.push(
    ...SCREENSHOT_ENUMS.STATE_PAGES.DATASET.map(page =>
      screenshot(SCREENSHOT_ENUMS.STATE_PAGES.SELECTOR, page),
    ),
  );

  const promiseChunks = chunk(promises, CHUNK_SIZE);

  return Promise.each(promiseChunks, async chunks =>
    Promise.all(chunks.map(p => p.run())),
  );
})();
