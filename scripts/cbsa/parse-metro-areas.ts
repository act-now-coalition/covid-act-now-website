import fs from 'fs';
import path from 'path';
import { groupBy, values } from 'lodash';
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

async function main() {
  const csvText = fs.readFileSync(path.join(__dirname, 'mar2020.csv'));
  const [, ...rows] = await csvParse(csvText);
  const items: CsvRow[] = rows
    .map(parseRow)
    .filter((item: CsvRow) => item.csaCode);

  const groupedByCbsa = splitBy(items, item => item.cbsaCode);
  const msaItems = groupedByCbsa
    .map(formatGroup)
    .filter(metroArea => metroArea.countyFips.length > 1);

  const outputPath = path.join(
    __dirname,
    '../../src/common/data/msa-data.json',
  );
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ msa_regions: msaItems }, null, 2),
  );
}

function splitBy(items: CsvRow[], keyFn: (item: CsvRow) => string) {
  return values(groupBy(items, keyFn));
}

function formatGroup(groupItems: CsvRow[]) {
  const firstItem = groupItems[0];
  const [name] = firstItem.cbsaTitle.split(',');
  return {
    cbsaCode: firstItem.cbsaCode,
    cbsaTitle: firstItem.cbsaTitle,
    csaCode: firstItem.csaCode,
    csaTitle: firstItem.csaTitle,
    name,
    countyFips: groupItems.map(
      item => `${item.fipsStateCode}${item.fipsCountyCode}`,
    ),
  };
}

function parseRow(row: string[]) {
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
