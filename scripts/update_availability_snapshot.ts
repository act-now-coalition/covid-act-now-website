import yargs from 'yargs';
import {
  AggregationLevel,
  RegionSummary,
} from '../src/api/schema/RegionSummary';
import { Region, RegionType } from '../src/common/regions';
import { fetchSummariesForRegionType } from '../src/common/utils/model';
import _, { first } from 'lodash';
import { interpolateMagma } from 'd3-scale-chromatic';

const getValue = (regionSummary: RegionSummary, key: string): any => {
  var tmp = regionSummary;
  console.log('yo');
  key.split('.').forEach(key => {
    console.log(key);
    console.log(tmp);
    // @ts-ignore
    tmp = tmp[key];
  });
  return tmp;
};

const metricMap: { [key: string]: string } = {
  'Daily new cases': 'metrics.caseDensity',
};

interface MetricRecord {
  name: string;
  regionType: AggregationLevel;
  total: number;
  totalHasValue: number;
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
      };
      currentRecord['total'] += curr.total;
      currentRecord['totalHasValue'] += curr.totalHasValue;
      recordsByKeyType[key] = currentRecord;
      return recordsByKeyType;
    },
    accum,
  );
  return _.values(output);
};

async function main() {
  const regionTypes = [RegionType.COUNTY, RegionType.STATE, RegionType.MSA];

  const data = await Promise.all(
    regionTypes.map(
      async regionType => await fetchSummariesForRegionType(regionType),
    ),
  );
  const allData = data.flatMap(item => item);

  var allRecords: MetricRecord[] = [];
  allData.map(state => {
    _.forEach(['riskLevels', 'metrics', 'actuals'], firstLevel => {
      // @ts-ignore
      _.forEach(state[firstLevel], (value, key) => {
        allRecords.push({
          name: `${firstLevel}.${key}`,
          regionType: state.level,
          total: 1,
          totalHasValue: _.isNil(value) ? 0 : 1,
        });
      });
    });
  });
  console.log(reduceMetricRecords(allRecords));
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
