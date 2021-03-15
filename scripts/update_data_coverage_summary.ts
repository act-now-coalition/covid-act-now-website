/**
 * Run via: yarn update-data-coverage-summary
 *
 * Reads latest summary files from API and generates a summary of coverage by
 * metric.
 */

import yargs from 'yargs';
import fs from 'fs-extra';
import { AggregationLevel } from '../src/api/schema/RegionSummary';
import { RegionType } from '../src/common/regions';
import { fetchSummariesForRegionType } from '../src/common/utils/model';
import _ from 'lodash';
import { assert } from '../src/common/utils';
import {
  MetricCoverage,
  CoverageDetails,
} from '../src/screens/DataApi/DataCoverageTable';

interface SingleLevelMetricCoverage {
  name: string;
  regionType: AggregationLevel;
  total: number;
  totalHasValue: number;
  allStates: Set<string>;
  statesHasValue: Set<string>;
}

const combineCoverageByMetric = (
  metricKey: string,
  coverageRecords: SingleLevelMetricCoverage[],
): MetricCoverage => {
  const stateRecord = coverageRecords.find(
    record => record.regionType === 'state',
  );
  const countyRecord = coverageRecords.find(
    record => record.regionType === 'county',
  );
  const metroRecord = coverageRecords.find(
    record => record.regionType === 'cbsa',
  );

  assert(metroRecord && stateRecord && countyRecord);

  const convertToCoverage = (record: SingleLevelMetricCoverage) => ({
    totalRegions: record.total,
    regionsAvailable: record.totalHasValue,
    totalStates: record.allStates.size,
    statesAvailable: record.statesHasValue.size,
  });

  return {
    name: metricKey,
    state: convertToCoverage(stateRecord),
    county: convertToCoverage(countyRecord),
    metro: convertToCoverage(metroRecord),
  };
};

const newCoverageRecord = (metricPath: string, level: AggregationLevel) => ({
  name: metricPath,
  regionType: level,
  total: 0,
  totalHasValue: 0,
  allStates: new Set<string>(),
  statesHasValue: new Set<string>(),
});

async function main(outputFolder: string) {
  const regionTypes = [RegionType.STATE, RegionType.COUNTY, RegionType.MSA];

  const regionTypeSummaries = await Promise.all(
    regionTypes.map(
      async regionType => await fetchSummariesForRegionType(regionType),
    ),
  );
  const allSummaries = regionTypeSummaries.flatMap(item => item);

  const coverageByMetricAndLevel: {
    [key: string]: SingleLevelMetricCoverage;
  } = {};

  // Iterating over all region summaries and building coverage for each metric by region type.
  allSummaries.forEach(regionSummary => {
    _.forEach(['riskLevels', 'metrics', 'actuals'], firstLevel => {
      // summaryDataSection is a sub object of a `RegionSummary`.  Accessing it
      // directly generates a typescript error, but we know it will always have a value
      // as it's part of the
      // @ts-ignore
      const summaryDataSection = regionSummary[firstLevel];
      _.forEach(summaryDataSection, (value, key) => {
        const metricPath = `${firstLevel}.${key}`;
        const coverageKey = `${regionSummary.level}-${metricPath}`;

        const coverageForKey =
          coverageByMetricAndLevel[coverageKey] ??
          newCoverageRecord(metricPath, regionSummary.level);

        const hasValue = !_.isNil(value);

        coverageForKey.total += 1;

        if (regionSummary.state) {
          coverageForKey.allStates.add(regionSummary.state);
        }

        if (hasValue) {
          coverageForKey.totalHasValue += 1;
        }

        if (hasValue && regionSummary.state) {
          coverageForKey.statesHasValue.add(regionSummary.state);
        }

        coverageByMetricAndLevel[coverageKey] = coverageForKey;
      });
    });
  });

  const coverageDetails = _.chain(coverageByMetricAndLevel)
    .values()
    .groupBy(record => record.name)
    .map((records, metricPath) => combineCoverageByMetric(metricPath, records));

  await fs.writeJson(`${outputFolder}/coverage-summary.json`, coverageDetails, {
    spaces: 2,
  });
}

if (require.main === module) {
  const argv = yargs.options({
    outputDir: {
      default: 'src/components/DataCoverageTable',
      description: 'Output directory to save summary.',
    },
  }).argv;

  main(argv.outputDir)
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
