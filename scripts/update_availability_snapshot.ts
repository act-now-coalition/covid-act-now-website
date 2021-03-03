import yargs from 'yargs';
import fs from 'fs-extra';
import {
  AggregationLevel,
  RegionSummary,
} from '../src/api/schema/RegionSummary';
import { Region, RegionType } from '../src/common/regions';
import { fetchSummariesForRegionType } from '../src/common/utils/model';
import _, { first } from 'lodash';
import { interpolateMagma } from 'd3-scale-chromatic';

interface MetricRecord {
  name: string;
  regionType: AggregationLevel;
  total: number;
  totalHasValue: number;
  allStates: Set<string>;
  statesHasValue: Set<string>;
}

const reduceMetricRecords = (records: MetricRecord[]): MetricRecord[] => {
  const accum: { [key: string]: MetricRecord } = {};
  const output = _.reduce(
    records,
    (recordsByKeyType, curr) => {
      const key = `${curr.name}-${curr.regionType}`;
      const currentRecord = recordsByKeyType[key] ?? {
        name: curr.name,
        regionType: curr.regionType,
        total: 0,
        totalHasValue: 0,
        allStates: new Set<string>(),
        statesHasValue: new Set<string>(),
      };
      currentRecord['total'] += curr.total;
      currentRecord['totalHasValue'] += curr.totalHasValue;

      curr.allStates.forEach(state => currentRecord.allStates.add(state));
      curr.statesHasValue.forEach(state =>
        currentRecord.statesHasValue.add(state),
      );
      recordsByKeyType[key] = currentRecord;
      return recordsByKeyType;
    },
    accum,
  );
  return _.values(output);
};

async function main(outputFolder: string) {
  const regionTypes = [RegionType.STATE, RegionType.COUNTY, RegionType.MSA];

  const data = await Promise.all(
    regionTypes.map(
      async regionType => await fetchSummariesForRegionType(regionType),
    ),
  );
  const allData = data.flatMap(item => item);

  var allRecords: MetricRecord[] = [];
  allData.map(state => {
    _.forEach(['riskLevels', 'metrics', 'actuals'], firstLevel => {
      console.log(state.state);
      // @ts-ignore
      _.forEach(state[firstLevel], (value, key) => {
        allRecords.push({
          name: `${firstLevel}.${key}`,
          regionType: state.level,
          total: 1,
          totalHasValue: _.isNil(value) ? 0 : 1,
          allStates: state.state
            ? new Set<string>([state.state])
            : new Set<string>(),
          statesHasValue:
            state.state && !_.isNil(value)
              ? new Set<string>([state.state])
              : new Set<string>(),
        });
      });
    });
  });

  const reducedRecords = reduceMetricRecords(allRecords);

  const availabilityDetails = _.chain(reducedRecords)
    .groupBy(record => record.name)
    .map((records, name) => {
      //
      const stateRecord = records.find(
        record => record.regionType === 'state',
      )!;
      const countyRecord = records.find(
        record => record.regionType === 'county',
      )!;
      const metroRecord = records.find(record => record.regionType === 'cbsa')!;
      const convertToAvailability = (record: MetricRecord) => ({
        totalRegions: record.total,
        regionsAvailable: record.totalHasValue,
        totalStates: record.allStates.size,
        statesAvailable: record.statesHasValue.size,
      });
      return {
        name: name,
        state: convertToAvailability(stateRecord),
        county: convertToAvailability(countyRecord),
        metro: convertToAvailability(metroRecord),
      };
    });

  await fs.writeJson(
    `${outputFolder}/availabilitySnapshot.json`,
    availabilityDetails,
    { spaces: 2 },
  );
}

interface AvailabilityDetails {
  totalRegions: number;
  regionsAvailable: number;
  totalStates: number;
  statesAvailable: number;
}

export interface MetricAvailability {
  name: string;
  state: AvailabilityDetails;
  county: AvailabilityDetails;
  metro: AvailabilityDetails;
}

if (require.main === module) {
  main('src/screens/DataApi')
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
