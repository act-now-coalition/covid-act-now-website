/**
 * A one-time script to parse Surgo foundation's CCVI data for counties, states, and metros
 * (ccvi_counties.csv, ccvi_states.csv, ccvi_metros.csv)
 * https://precisionforcovid.org/ccvi
 * https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19
 *
 * NOTE: ccvi_metros.csv was manually generated from the checked-in ccvi_v3_msa.xlsx which was
 * received via email on 2021-03-01.
 *
 * Results in ccvi.json with a format of [fips]: {CCVI data}
 */
import fs from 'fs';
import path from 'path';
import { toNumber } from 'lodash';
import { FipsToCcviMap } from '../../src/common/data';
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

const outputPath = path.join(__dirname, '../../src/common/data/ccvi.json');

function formatFips(fips: string): string {
  if (fips.length === 4 || fips.length === 1) {
    return `0${fips}`;
  }
  return fips;
}

async function readCsv(filePath: string) {
  const csvText = fs.readFileSync(path.join(__dirname, filePath));
  return csvParse(csvText, { columns: true });
}

async function main() {
  const fipsToCcviData: FipsToCcviMap = {};

  const stateRows = await readCsv('ccvi_states.csv');
  const countyRows = await readCsv('ccvi_counties.csv');
  const metroRows = await readCsv('ccvi_metros.csv');

  const rows = [...stateRows, ...countyRows, ...metroRows];
  for (const row of rows) {
    if (row.FIPS === 'NA') {
      // ccvi_metros.csv includes some extra aggregations that are not MSA's
      // with FIPS "NA". Just skip them.
      continue;
    }
    const formattedFips = formatFips(row.FIPS);
    fipsToCcviData[formattedFips] = {
      overall: toNumber(row.ccvi),
      theme1: toNumber(row.theme1),
      theme2: toNumber(row.theme2),
      theme3: toNumber(row.theme3),
      theme4: toNumber(row.theme4),
      theme5: toNumber(row.theme5),
      theme6: toNumber(row.theme6),
      theme7: toNumber(row.theme7),
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(fipsToCcviData, null, 2));
}

if (require.main === module) {
  main();
}
