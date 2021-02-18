import fetch from 'node-fetch';
import { groupBy, sortBy } from 'lodash';
import * as yargs from 'yargs';
import path from 'path';
import fs from 'fs-extra';
import {
  stateVaccinationPhases,
  RegionVaccinePhaseInfo,
} from '../../src/cms-content/vaccines/phases';

import regions from '../../src/common/regions/region_db';

const parse = require('csv-parse/lib/sync');

const PHASES_PATH = path.join(
  __dirname,
  '..',
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
    state: row['State'].trimRight().trimLeft(),
    eligibilityUrl: row['Eligibility Information URL'],
    currentlyEligible: row['Currently Eligible'].trimRight() !== '',
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
): RegionVaccinePhaseInfo => {
  const firstRow = rows[0];

  return {
    locationName: state,
    fips: regions.findByFullName(state.trimRight())!.fipsCode,
    eligibilityInfoUrl: firstRow.eligibilityUrl,
    emailAlertVersion: 1,
    phaseGroups: rows.map(row => ({
      phase: row.phase,
      tier: row.tier,
      currentlyEligible: row.currentlyEligible,
      description: row.generalGroup,
      expandedDefinitionUrl: row.descriptionUrl,
      startDate: row.startDate,
      updatedAt: new Date().toISOString(),
    })),
  };
};

const updateStatePhases = (
  cmsRecord: RegionVaccinePhaseInfo,
  spreadsheetRecord: RegionVaccinePhaseInfo,
): RegionVaccinePhaseInfo => {
  return {
    ...cmsRecord,
    ...{
      eligibilityInfoUrl: spreadsheetRecord.eligibilityInfoUrl,
      phaseGroups: spreadsheetRecord.phaseGroups,
    },
  };
};

async function main(dryRun: boolean) {
  const csv = await fetch(GOOGLE_SHEETS_CSV_URL);
  const content = await csv.text();
  const rows = parse(content, { columns: true });
  const records = rows.map(parseRow);
  const recordsByState = groupBy(records, value => value.state);

  const existingFips = stateVaccinationPhases.map(phase => phase.fips);

  const groups = Object.keys(recordsByState).map(key => {
    if (key === 'Arizona') {
      console.log(recordsByState[key]);
      console.log(buildRegionGroup(key, recordsByState[key]));
    }
    return buildRegionGroup(key, recordsByState[key]);
  });

  const spreadsheetFips = groups.map(group => group.fips);

  const matchingCMSRecords = stateVaccinationPhases.filter(phase =>
    spreadsheetFips.includes(phase.fips),
  );

  const newStates = groups.filter(group => !existingFips.includes(group.fips));

  const inCmsNotSpreadsheet = stateVaccinationPhases.filter(
    phase => !spreadsheetFips.includes(phase.fips),
  );

  const updatedMatchingRecords = matchingCMSRecords.map(cmsRecord =>
    updateStatePhases(
      cmsRecord,
      groups.find(group => group.fips === cmsRecord.fips)!,
    ),
  );

  console.log(
    `In spreadsheet but not CMS: ${newStates.map(state => state.locationName)}`,
  );
  console.log(
    `In both: ${matchingCMSRecords.map(state => state.locationName)}`,
  );

  console.log(
    `In CMS but not spreadsheet: ${inCmsNotSpreadsheet.map(
      state => state.locationName,
    )}`,
  );

  if (dryRun) {
    console.log('Dry run -- exiting');
    return;
  }

  await fs.writeFile(
    PHASES_PATH,
    JSON.stringify(
      {
        regions: sortBy(
          [...updatedMatchingRecords, ...newStates, ...inCmsNotSpreadsheet],
          state => state.locationName,
        ),
      },
      null,
      2,
    ),
  );
}

if (require.main === module) {
  const argv = yargs.options({
    dryRun: {
      default: false,
    },
  }).argv;

  main(argv.dryRun).catch(e => {
    console.error(e);
    process.exit(-1);
  });
}
