// You can run via `yarn update-location-summaries`
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../src/common/utils/model';
import { currentSnapshot } from '../src/common/utils/snapshots';
import { LocationSummary } from '../src/common/location_summaries';
import { Projections } from '../src/common/models/Projections';
import { DatasetId } from '../src/common/models/Projection';
import { assert } from '../src/common/utils';

const OUTPUT_FOLDER = path.join(__dirname, '..', 'src', 'assets', 'data');

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
  buildSummaries(allStatesProjections, allCountiesProjections);
  buildAggregations(allStatesProjections, allCountiesProjections);
  console.log('done');
}

async function buildSummaries(
  allStatesProjections: Projections[],
  allCountiesProjections: Projections[],
) {
  const summaries = {} as { [fips: string]: LocationSummary };

  for (const stateProjections of allStatesProjections) {
    summaries[stateProjections.fips] = stateProjections.summary;
  }

  for (const countyProjections of allCountiesProjections) {
    summaries[countyProjections.fips] = countyProjections.summary;
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

const AGGREGATED_DATASETS: DatasetId[] = [
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

function aggregate(allProjections: Projections[]) {
  const totalPopulation = _.sumBy(allProjections, p => p.population);
  const dates: number[] = [];
  let aggregatedDatasets: { [key: string]: Array<number | null> } = {};
  for (const datasetId of AGGREGATED_DATASETS) {
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
    '00001': aggregate(allStatesProjections),
    // Native American Majority Counties
    '00002': aggregate(
      allCountiesProjections.filter(p => INDIGENOUS_FIPS.includes(p.fips)),
    ),
  };

  await fs.writeJson(`${OUTPUT_FOLDER}/aggregations.json`, aggregations);
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
