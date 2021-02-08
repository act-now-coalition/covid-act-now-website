import fetch from 'node-fetch';
import { groupBy, forOwn } from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import { RegionVaccinationGroups } from '../src/cms-content/vaccines';
import regions from '../src/common/regions/region_db';

const parse = require('csv-parse/lib/sync');

const PHASES_PATH = path.join(
  __dirname,
  '..',
  'src',
  'cms-content',
  'vaccines',
  'state-vaccine-phases.json',
);

const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjhGx1L-_kWAwfOdeVbVEa9QSI5Uq9sL6xTqOk-vU0k2ncIDhRIJKBdURBlKebqrPcTey_iOw2224l/pub?gid=0&single=true&output=csv';

interface CsvRow {
  state: string;
  eligibilityUrl: string;
  currentlyEligible: boolean;
  phase: string;
  tier: string;
  startDate: string;
  groupDetails: string;
  generalGroup: string;
  descriptionUrl: string;
  notes: string;
}

const parseRow = (row: { [key: string]: string }): CsvRow => {
  return {
    state: row['State'],
    eligibilityUrl: row['Eligibility Information URL'],
    currentlyEligible: row['Currently Eligible'] === 'x',
    startDate: row['Estimated Start Date'],
    phase: row['Phase'],
    tier: row['Tier'],
    groupDetails: row['Detailed Group'],
    generalGroup: row['General Group'],
    descriptionUrl: row['Expanded description url'],
    notes: row['Notes for Internal QA'],
  };
};

const buildRegionGroup = (
  state: string,
  rows: CsvRow[],
): RegionVaccinationGroups => {
  const firstRow = rows[0];
  console.log(state);
  return {
    locationName: state,
    fips: regions.findByFullName(state.trimRight())!.fipsCode,
    eligibilityInfoUrl: firstRow.eligibilityUrl,
    emailAlertVersion: 1,
    phaseGroups: rows.map(row => ({
      phase: row.phase,
      tier: row.tier,
      description: row.generalGroup,
      expandedDefinitionUrl: row.descriptionUrl,
      startDate: row.startDate,
    })),
  };
};

async function main() {
  const csv = await fetch(GOOGLE_SHEETS_CSV_URL);
  const content = await csv.text();
  const rows = parse(content, { columns: true });
  const records = rows.map(parseRow);
  const recordsByState = groupBy(records, value => value.state);

  const groups = Object.keys(recordsByState).map(key => {
    return buildRegionGroup(key, recordsByState[key]);
  });
  await fs.writeFile(PHASES_PATH, JSON.stringify(groups, null, 2));
  console.log(groups);
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
