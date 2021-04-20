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
