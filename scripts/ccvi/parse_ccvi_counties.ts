import fs from 'fs';
import path from 'path';
import { startCase, lowerCase, toNumber } from 'lodash';
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

interface CountyItem {
  county_name: string;
  state_name: string;
  overall: number;
  theme1: number;
  theme2: number;
  theme3: number;
  theme4: number;
  theme5: number;
  theme6: number;
  theme7: number;
}

interface CountyToCcviMap {
  [fips: string]: CountyItem;
}

const outputPath = path.join(__dirname, '../../src/common/data/ccvi-data.json');

function formatCountyFips(fips: string) {
  if (fips.length === 4) {
    return `0${fips}`;
  }
  return fips;
}

async function main() {
  const countyFipsToCcviMap: CountyToCcviMap = {};

  const csvText = fs.readFileSync(path.join(__dirname, 'ccvi_counties.csv'));
  const [, ...rows] = await csvParse(csvText);

  for (const row of rows) {
    const formattedFips = formatCountyFips(row[0]);
    countyFipsToCcviMap[formattedFips] = {
      county_name: row[1],
      state_name: startCase(lowerCase(row[2])),
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

  fs.writeFileSync(
    outputPath,
    JSON.stringify({ counties: countyFipsToCcviMap }, null, 2),
  );
}

if (require.main === module) {
  main();
}
