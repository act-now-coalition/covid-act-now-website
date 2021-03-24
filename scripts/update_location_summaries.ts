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

// Based on https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf
const CENSUS_DIVISIONS = {
  'New England': ['09', '23', '25', '33', '44', '50'],
  'Middle Atlantic': ['34', '36', '42'],
  'East North Central': ['18', '17', '26', '39', '55'],
  'West North Central': ['19', '20', '27', '29', '31', '38', '46'],
  'South Atlantic': ['10', '11', '12', '13', '24', '37', '45', '51', '54'],
  'East South Central': ['01', '21', '28', '47'],
  'West South Central': ['05', '22', '40', '48'],
  Mountain: ['04', '08', '16', '35', '30', '49', '32', '56'],
  Pacific: ['02', '06', '15', '41', '53'],
};

const CENSUS_REGIONS = {
  Northeast: [
    ...CENSUS_DIVISIONS['New England'],
    ...CENSUS_DIVISIONS['Middle Atlantic'],
  ],
  Midwest: [
    ...CENSUS_DIVISIONS['East North Central'],
    ...CENSUS_DIVISIONS['West North Central'],
  ],
  South: [
    ...CENSUS_DIVISIONS['South Atlantic'],
    ...CENSUS_DIVISIONS['East South Central'],
    ...CENSUS_DIVISIONS['West South Central'],
  ],
  West: [...CENSUS_DIVISIONS['Mountain'], ...CENSUS_DIVISIONS['Pacific']],
};

async function main() {
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();
  const allMetroProjections = await fetchAllMetroProjections();
  await buildSummaries([
    ...allStatesProjections,
    ...allCountiesProjections,
    ...allMetroProjections,
  ]);
  await buildAggregations(allStatesProjections, allCountiesProjections);
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
    '00003': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['New England'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00004': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['Middle Atlantic'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00005': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['East North Central'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00006': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['West North Central'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00007': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['South Atlantic'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00008': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['East South Central'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00009': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['West South Central'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00010': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['Mountain'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00011': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_DIVISIONS['Pacific'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00012': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_REGIONS['Northeast'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00013': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_REGIONS['Midwest'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00014': aggregate(
      allStatesProjections.filter(p =>
        CENSUS_REGIONS['South'].includes(p.fips),
      ),
      STATE_AGGREGATED_DATASETS,
    ),
    '00015': aggregate(
      allStatesProjections.filter(p => CENSUS_REGIONS['West'].includes(p.fips)),
      STATE_AGGREGATED_DATASETS,
    ),
  };

  await fs.writeJson(`${OUTPUT_FOLDER}/aggregations.json`, aggregations);
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
