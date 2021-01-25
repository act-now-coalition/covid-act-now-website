// You can run via `yarn update-location-summaries`
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
  fetchAllMetroProjections,
} from '../src/common/utils/model';
import {
  currentSnapshot,
  fetchMasterSnapshotNumber,
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
  await buildSummaries(
    allStatesProjections,
    allCountiesProjections,
    allMetroProjections,
  );
  await buildAggregations(allStatesProjections, allCountiesProjections);
  await buildSlackSummary();
  console.log('done');
}

async function buildSummaries(
  allStatesProjections: Projections[],
  allCountiesProjections: Projections[],
  allMetroProjections: Projections[],
) {
  const summaries = {} as { [fips: string]: LocationSummary };

  for (const stateProjections of allStatesProjections) {
    summaries[stateProjections.fips] = stateProjections.summary;
  }

  for (const countyProjections of allCountiesProjections) {
    summaries[countyProjections.fips] = countyProjections.summary;
  }

  for (const metroProjections of allMetroProjections) {
    summaries[metroProjections.fips] = metroProjections.summary;
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

// Aggregates of county level data should not include hospitalizations
// because we may know hopsitalizations for some counties but not others, leading
// to misleading aggregates.
const COUNTY_AGGREGATED_DATASETS: DatasetId[] = [
  'rawDailyCases',
  'smoothedDailyCases',
  'rawDailyDeaths',
  'smoothedDailyDeaths',
  /*
  'rawHospitalizations',
  'smoothedHospitalizations',
  'rawICUHospitalizations',
  'smoothedICUHospitalizations',
  */
];

const STATE_AGGREGATED_DATASETS: DatasetId[] = [
  'rawDailyCases',
  'smoothedDailyCases',
  'rawDailyDeaths',
  'smoothedDailyDeaths',
  'rawHospitalizations',
  'smoothedHospitalizations',
  'rawICUHospitalizations',
  'smoothedICUHospitalizations',
];

function aggregate(
  allProjections: Projections[],
  datasetsToAggregate: DatasetId[],
) {
  const totalPopulation = _.sumBy(allProjections, p => p.population);
  const totalCases = _.sumBy(
    allProjections,
    p => p.primary.currentCumulativeCases || 0,
  );
  const totalDeaths = _.sumBy(
    allProjections,
    p => p.primary.currentCumulativeDeaths || 0,
  );
  const totalVaccinationsInitiated = _.sumBy(
    allProjections,
    p => p.primary.vaccinationsInfo?.peopleInitiated || 0,
  );
  const dates: number[] = [];
  let aggregatedDatasets: { [key: string]: Array<number | null> } = {};
  for (const datasetId of datasetsToAggregate) {
    const aggregatedSeries = [];
    for (const projections of allProjections) {
      const projection = projections.primary;
      const data = projection.getDataset(datasetId);
      assert(
        data[0].x == new Date('2020-03-01').getTime(),
        'We rely on datasets starting on the same date (2020-03-01).',
      );
      for (let i = 0; i < data.length; i++) {
        const y = data[i].y;
        // TODO(michael): Is keeping aggregate data where some components have gaps okay?
        if (y !== null && y > 0) {
          dates[i] = data[i].x;
          if (aggregatedSeries[i] === undefined) {
            aggregatedSeries[i] = 0;
          }
          aggregatedSeries[i] += y;
        }
      }
    }
    aggregatedDatasets[datasetId] = aggregatedSeries;
  }

  return {
    totalPopulation,
    totalCases,
    totalDeaths,
    totalVaccinationsInitiated,
    dates,
    ...aggregatedDatasets,
  };
}

async function buildAggregations(
  allStatesProjections: Projections[],
  allCountiesProjections: Projections[],
) {
  const aggregations = {
    // US
    '00001': aggregate(allStatesProjections, STATE_AGGREGATED_DATASETS),
    // Native American Majority Counties
    '00002': aggregate(
      allCountiesProjections.filter(p => INDIGENOUS_FIPS.includes(p.fips)),
      COUNTY_AGGREGATED_DATASETS,
    ),
  };

  await fs.writeJson(`${OUTPUT_FOLDER}/aggregations.json`, aggregations);
}

async function buildSlackSummary() {
  const masterSnapshot = await fetchMasterSnapshotNumber();
  const oldSummaries: SummariesMap = await fs.readJSON(
    path.join(SUMMARIES_FOLDER, `${masterSnapshot}.json`),
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
