// You can run via `yarn update-location-summaries`
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import {
  fetchAllStateProjections,
  fetchAllMetroProjections,
  fetchAllCountyProjections,
  fetchProjectionsRegion,
} from '../src/common/utils/model';
import {
  currentSnapshot,
  fetchMainSnapshotNumber,
  snapshotFromUrl,
  SNAPSHOT_URL,
} from '../src/common/utils/snapshots';
import {
  LocationSummary,
  SummariesMap,
} from '../src/common/location_summaries';
import { Projections } from '../src/common/models/Projections';
import { DatasetId } from '../src/common/models/Projection';
import { assert } from '../src/common/utils';
import { Level } from '../src/common/level';
import regions from '../src/common/regions';
import { importFipsToCcviMap } from '../src/common/data';

const OUTPUT_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'data');
const SUMMARIES_FOLDER = path.join(__dirname, 'alert_emails/summaries');

// Via https://en.wikipedia.org/wiki/List_of_U.S._counties_with_Native_American_majority_populations
const INDIGENOUS_FIPS = [
  '02050',
  '02070',
  '02164',
  '02180',
  '02185',
  '02188',
  '02158',
  '02290',
  '04001',
  '30003',
  '30035',
  '30085',
  '31173',
  '35031',
  '38079',
  '38085',
  '46007',
  '46017',
  '46031',
  '46041',
  '46095',
  '46102',
  '46121',
  '46137',
  '49037',
  '55078',
];

async function main() {
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();
  const allMetroProjections = await fetchAllMetroProjections();
  await buildSummaries([
    ...allStatesProjections,
    ...allCountiesProjections,
    ...allMetroProjections,
  ]);

  await buildSiteSummaryData();

  try {
    await buildSlackSummary();
  } catch (e) {
    console.warn("Couldn't generate slack summary.");
  }
  console.log('done');
}

async function buildSummaries(allProjections: Projections[]) {
  const fipsToCcviMap = await importFipsToCcviMap();
  const summaries = {} as { [fips: string]: LocationSummary };

  for (const projections of allProjections) {
    const fips = projections.fips;
    summaries[fips] = projections.summary(fipsToCcviMap[fips]?.overall ?? null);
  }

  await fs.writeJson(`${OUTPUT_FOLDER}/summaries.json`, summaries);

  // We also store the historical summaries for email alerts purposes.
  const snapshotSummaryFile = path.join(
    __dirname,
    'alert_emails',
    'summaries',
    `${currentSnapshot()}.json`,
  );
  await fs.writeJSON(snapshotSummaryFile, summaries);
}

/**
 * Precomputes any data we want available in the main bundle (e.g. for use on
 * the homepage).
 */
async function buildSiteSummaryData() {
  const usaProjection = (await fetchProjectionsRegion(regions.usa)).primary;
  const usaSummaryData = {
    lastDate: usaProjection.finalDate.getTime(),

    totalCases: usaProjection.currentCumulativeCases,
    totalDeaths: usaProjection.currentCumulativeDeaths,

    twoWeekPercentChangeInCases: usaProjection.twoWeekPercentChangeInCases,
    twoWeekPercentChangeInDeaths: usaProjection.twoWeekPercentChangeInDeaths,

    totalVaccinationsInitiated:
      usaProjection.vaccinationsInfo?.peopleInitiated ?? null,
    totalPopulation: usaProjection.totalPopulation,
  };

  const summaryData = {
    usa: usaSummaryData,
  };

  await fs.writeJson(`${OUTPUT_FOLDER}/site-summary.json`, summaryData);
}

async function buildSlackSummary() {
  const mainSnapshot = await fetchMainSnapshotNumber();
  const oldSummaries: SummariesMap = await fs.readJSON(
    path.join(SUMMARIES_FOLDER, `${mainSnapshot}.json`),
  );
  const newSnapshot = snapshotFromUrl(SNAPSHOT_URL);
  const newSummaries: SummariesMap = await fs.readJSON(
    path.join(SUMMARIES_FOLDER, `${newSnapshot}.json`),
  );

  const better = [],
    worse = [];

  for (const state of regions.states) {
    const oldLevel = oldSummaries[state.fipsCode].level;
    const newLevel = newSummaries[state.fipsCode].level;
    const changeString = `${state.fullName} (${Level[oldLevel]} => ${Level[newLevel]})`;
    if (newLevel > oldLevel) {
      worse.push(changeString);
    } else if (newLevel < oldLevel) {
      better.push(changeString);
    }
  }
  const summaryLines = [];
  if (better.length > 0) {
    summaryLines.push(`States doing better: ${better.join(', ')}`);
  }
  if (worse.length > 0) {
    summaryLines.push(`States doing worse: ${worse.join(', ')}`);
  }

  const dest = path.join(__dirname, 'slack-summary.txt');
  // separate lines with %0A so the github action set-output parses the newlines.
  await fs.writeFile(dest, summaryLines.join('%0A'));
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
