import yargs from 'yargs';
import fs from 'fs-extra';
import { AggregationLevel } from '../src/api/schema/RegionSummary';
import { RegionType } from '../src/common/regions';
import { fetchSummariesForRegionType } from '../src/common/utils/model';
import _ from 'lodash';

interface MetricRecord {
  name: string;
  regionType: AggregationLevel;
  total: number;
  totalHasValue: number;
  allStates: Set<string>;
  statesHasValue: Set<string>;
}

interface CoverageDetails {
  totalRegions: number;
  regionsAvailable: number;
  totalStates: number;
  statesAvailable: number;
}

export interface MetricCoverage {
  name: string;
  state: CoverageDetails;
  county: CoverageDetails;
  metro: CoverageDetails;
}

const reduceMetricRecords = (records: MetricRecord[]): MetricRecord[] => {
  const accum: { [key: string]: MetricRecord } = {};
  const output = _.reduce(
    records,
    (recordsByKeyType, curr) => {
      const key = `${curr.name}-${curr.regionType}`;

      // If current record doesn't exist, create a new empty
      // aggregate record to add to.
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
  allData.map(regionData => {
    _.forEach(['riskLevels', 'metrics', 'actuals'], firstLevel => {
      // @ts-ignore
      _.forEach(regionData[firstLevel], (value, key) => {
        allRecords.push({
          name: `${firstLevel}.${key}`,
          regionType: regionData.level,
          total: 1,
          totalHasValue: _.isNil(value) ? 0 : 1,
          allStates: regionData.state
            ? new Set<string>([regionData.state])
            : new Set<string>(),
          statesHasValue:
            regionData.state && !_.isNil(value)
              ? new Set<string>([regionData.state])
              : new Set<string>(),
        });
      });
    });
  });

  const reducedRecords = reduceMetricRecords(allRecords);

  // Reduce records and output one MetricCoverage record per key.
  const coverageDetails = _.chain(reducedRecords)
    .groupBy(record => record.name)
    .map((records, name) => {
      // Forcing the value to be present as we should always have the state, county, and metro value
      // for each key.
      const stateRecord = records.find(
        record => record.regionType === 'state',
      )!;
      const countyRecord = records.find(
        record => record.regionType === 'county',
      )!;
      const metroRecord = records.find(record => record.regionType === 'cbsa')!;

      const convertToCoverage = (record: MetricRecord) => ({
        totalRegions: record.total,
        regionsAvailable: record.totalHasValue,
        totalStates: record.allStates.size,
        statesAvailable: record.statesHasValue.size,
      });

      return {
        name: name,
        state: convertToCoverage(stateRecord),
        county: convertToCoverage(countyRecord),
        metro: convertToCoverage(metroRecord),
      };
    });

  await fs.writeJson(
    `${outputFolder}/coverage-snapshot.json`,
    coverageDetails,
    {
      spaces: 2,
    },
  );
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
