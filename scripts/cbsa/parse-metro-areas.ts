import fs from 'fs';
import path from 'path';
import { groupBy, values, words, deburr, sum } from 'lodash';
import regions from '../../src/common/regions';
const promisify = require('util').promisify;
const csvParse = promisify(require('csv-parse'));

/**
 * This is a one-off script to parse and format metro areas from the
 * mar2020.csv file.
 */

enum StatisticalAreaType {
  Metro = 'Metropolitan Statistical Area',
  Micro = 'Micropolitan Statistical Area',
}

interface CsvRow {
  cbsaCode: string;
  metropolitanDivisionCode: string;
  csaCode: string;
  cbsaTitle: string;
  statisticalAreaType: StatisticalAreaType;
  metropolitanDivisionTitle: string;
  csaTitle: string;
  countyEquivalent: string;
  stateName: string;
  fipsStateCode: string;
  fipsCountyCode: string;
  centralOutlyingCounty: string;
}

const outputPath = path.join(__dirname, '../../src/common/data/msa-data.json');

async function main() {
  const csvText = fs.readFileSync(path.join(__dirname, 'mar2020.csv'));
  const [, ...rows] = await csvParse(csvText);
  const metroAreas: CsvRow[] = rows
    .map(parseRow)
    .filter(
      (cbsaRow: CsvRow) =>
        cbsaRow.statisticalAreaType === StatisticalAreaType.Metro,
    );

  const groupedByCbsaCode = splitBy(metroAreas, ({ cbsaCode }) => cbsaCode);
  const msaItems = groupedByCbsaCode.map(formatGroup);

  fs.writeFileSync(
    outputPath,
    JSON.stringify({ metro_areas: msaItems }, null, 2),
  );
}

function splitBy(items: CsvRow[], keyFn: (item: CsvRow) => string) {
  return values(groupBy(items, keyFn));
}

function formatUrl(name: string) {
  return name
    .toLowerCase()
    .split(', ')
    .map(part => deburr(words(part).join('-')))
    .join('_');
}

function formatGroup(groupItems: CsvRow[]) {
  const firstItem = groupItems[0];
  const name = firstItem.cbsaTitle.split(',')[0];

  const countyFipsCodes = groupItems.map(
    item => `${item.fipsStateCode}${item.fipsCountyCode}`,
  );

  const counties = countyFipsCodes
    .map(countyFips => {
      const county = regions.findByFipsCode(countyFips);
      return county || null;
    })
    .filter(county => county);

  const totalPopulation = sum(counties.map(county => county?.population || 0));

  return {
    cbsaCode: firstItem.cbsaCode,
    cbsaTitle: firstItem.cbsaTitle,
    name,
    countyFipsCodes: groupItems.map(
      item => `${item.fipsStateCode}${item.fipsCountyCode}`,
    ),
    urlSegment: formatUrl(firstItem.cbsaTitle),
    population: totalPopulation,
  };
}

function parseRow(row: string[]): CsvRow {
  return {
    cbsaCode: row[0],
    metropolitanDivisionCode: row[1],
    csaCode: row[2],
    cbsaTitle: row[3],
    statisticalAreaType: row[4] as StatisticalAreaType,
    metropolitanDivisionTitle: row[5],
    csaTitle: row[6],
    countyEquivalent: row[7],
    stateName: row[8],
    fipsStateCode: row[9],
    fipsCountyCode: row[10],
    centralOutlyingCounty: row[11],
  };
}

if (require.main === module) {
  main();
}
