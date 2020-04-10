const path = require('path');
const tar = require('tar');
const fs = require('fs-extra');
const Promise = require('bluebird');
const Pageres = require('pageres');
const moment = require('moment');
const { chunk } = require('lodash');
const SCREENSHOT_ENUMS = require('./enums');

(async () => {
  const FILE_NAME = '<%= url %>';
  const BASE_URL = 'http://localhost:3000';
  const OUTPUT_SIZE = '1920x1080';
  const DELAY = 2;
  const CHUNK_SIZE = 10;

  const now = moment();

  const outputFolder = path.join(__dirname, 'output', 'screenshots');

  await fs.ensureDir(outputFolder);
  await fs.emptyDir(outputFolder);

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

  await Promise.each(promiseChunks, async chunks =>
    Promise.all(chunks.map(p => p.run())),
  );

  await tar.c(
    {
      gzip: true,
      file: path.resolve(
        `${__dirname}/output/archives/page_screenshots_${moment().format(
          'YYYY-MM-DD-HH_mm',
        )}.tgz`,
      ),
      cwd: path.resolve(`${__dirname}/output`),
    },
    ['screenshots'],
  );

  await fs.emptyDir(outputFolder);

  process.exit();
})();
