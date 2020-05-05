// You can run via `yarn update-social-images`
import fs from 'fs-extra';
import path from 'path';
import Pageres from 'pageres';
import PromisePool from 'es6-promise-pool';
import CalculatedInterventionJSON from '../../src/assets/data/calculated_state_interventions.json';
import CalculatedCountyInterventionJSON from '../../src/assets/data/calculated_county_interventions.json';
import _ from 'lodash';

const BASE_URL = 'http://localhost:3000/internal/share-image';
const CSS_SELECTOR = '.screenshot';
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_SIZE = '1200x630';

(async () => {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.emptyDir(OUTPUT_DIR);
  await fs.emptyDir(`${OUTPUT_DIR}/states`);
  await fs.emptyDir(`${OUTPUT_DIR}/counties`);

  const pageres = new Pageres();

  addSrc(pageres, '/', 'home');

  for (const stateCode in CalculatedInterventionJSON) {
    const state = stateCode.toLowerCase();
    addSrc(pageres, `/states/${state}`);
  }

  for (const fips in CalculatedCountyInterventionJSON) {
    addSrc(pageres, `/counties/${fips}`);
  }

  await pageres.dest(OUTPUT_DIR).run();

  console.log('Completed successfully.');
  process.exit(0);
})();

async function addSrc(pageres: Pageres, url: string, filename: string = url) {
  pageres.src(BASE_URL + url, [OUTPUT_SIZE], { selector: CSS_SELECTOR, filename});
}
