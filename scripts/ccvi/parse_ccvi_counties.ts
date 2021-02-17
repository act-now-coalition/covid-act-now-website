import fs from 'fs';
import path from 'path';
import { toNumber } from 'lodash';
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

interface RegionCcviItem {
  overall: number;
  theme1: number;
  theme2: number;
  theme3: number;
  theme4: number;
  theme5: number;
  theme6: number;
  theme7: number;
}

interface FipsToCcviMap {
  [key: string]: RegionCcviItem;
}

const outputPath = path.join(__dirname, '../../src/common/data/ccvi-data.json');

function formatFips(fips: string): string {
  if (fips.length === 4 || fips.length === 1) {
    return `0${fips}`;
  }
  return fips;
}

async function main() {
  const fipsToCcviData: FipsToCcviMap = {};

  const statecCsvText = fs.readFileSync(
    path.join(__dirname, 'ccvi_states.csv'),
  );
  const [, ...stateRows] = await csvParse(statecCsvText);

  const countyCsvText = fs.readFileSync(
    path.join(__dirname, 'ccvi_counties.csv'),
  );
  const [, ...countyRows] = await csvParse(countyCsvText);

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
