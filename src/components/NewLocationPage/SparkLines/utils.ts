import max from 'lodash/max';
import { assert } from 'common/utils';

export interface Point {
  x: number;
  y: number;
}

export enum SparkLineMetric {
  CASES,
  HOSPITALIZATIONS,
  DEATHS,
}

// function getDatasetIdByMetric(metric: SparkLineMetric) {
//   switch (metric) {
//     case SparkLineMetric.CASES:
//       return 'rawDailyCases';
//     case SparkLineMetric.HOSPITALIZATIONS:
//       return 'rawHospitalizations';
//     case SparkLineMetric.DEATHS:
//       return 'rawDailyDeaths';
//   }
// }

/**
 * Adds padding above the spark line that's equivalent to 30% of the max Y value
 */
export function getCapY(data: Point[]) {
  const yVals = data.map(point => point.y);
  const maxY = max(yVals);
  assert(maxY, 'max Y is unexpectedly undefined');
  return 1.3 * maxY;
}
