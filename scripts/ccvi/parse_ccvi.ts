/**
 * A one-time script to parse Surgo foundation's CCVI data for counties and states (ccvi_counties.csv, ccvi_states.csv)
 * https://precisionforcovid.org/ccvi
 * https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19
 *
 * Results in ccvi-data.json with a format of [fips]: {CCVI data}
 */
import fs from 'fs';
import path from 'path';
import { toNumber } from 'lodash';
import { FipsToCcviMap } from '../../src/common/data';
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

const outputPath = path.join(__dirname, '../../src/common/data/ccvi-data.json');

function formatFips(fips: string): string {
  if (fips.length === 4 || fips.length === 1) {
    return `0${fips}`;
  }
  return fips;
}

async function readCsv(filePath: string) {
  const csvText = fs.readFileSync(path.join(__dirname, filePath));
  const [, ...rows] = await csvParse(csvText);
  return rows;
}

async function main() {
  const fipsToCcviData: FipsToCcviMap = {};

  const stateRows = await readCsv('ccvi_states.csv');
  const countyRows = await readCsv('ccvi_counties.csv');

  for (const row of stateRows) {
    const formattedFips = formatFips(row[0]);
    fipsToCcviData[formattedFips] = {
      overall: toNumber(row[2]),
      theme1: toNumber(row[3]),
      theme2: toNumber(row[4]),
      theme3: toNumber(row[5]),
      theme4: toNumber(row[6]),
      theme5: toNumber(row[7]),
      theme6: toNumber(row[8]),
      theme7: toNumber(row[9]),
    };
  }

  for (const row of countyRows) {
    const formattedFips = formatFips(row[0]);
    fipsToCcviData[formattedFips] = {
      overall: toNumber(row[3]),
      theme1: toNumber(row[4]),
      theme2: toNumber(row[5]),
      theme3: toNumber(row[6]),
      theme4: toNumber(row[7]),
      theme5: toNumber(row[8]),
      theme6: toNumber(row[9]),
      theme7: toNumber(row[10]),
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(fipsToCcviData, null, 2));
}

if (require.main === module) {
  main();
}
