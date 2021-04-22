import { LocationSummary } from 'common/location_summaries';
import { MetricValues } from 'common/models/Projections';
import { getMetricName, ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { LevelInfo } from 'common/level';

export interface SummaryStatProps {
  levelInfo: LevelInfo;
  formattedValue: string;
  hasSubLabel: boolean;
  metricName: string;
  isMobile: boolean;
  metric: Metric;
}

export const orderedStatMetrics = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.VACCINATIONS,
];

export const metricSubLabelText: { [key in Metric]: string[] } = {
  [Metric.CASE_DENSITY]: ['per', '100k'],
  [Metric.VACCINATIONS]: ['1+', 'dose'],
  [Metric.CASE_GROWTH_RATE]: [''], // figure out deleting these empties without typescript complaining
  [Metric.HOSPITAL_USAGE]: [''],
  [Metric.POSITIVE_TESTS]: [''],
};

export const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    stats[metric] = summary.metrics[metric]?.value ?? null;
  }
  return stats;
};

export function getMetricNameForStat(metric: Metric): string {
  if (metric === Metric.VACCINATIONS) {
    return `% ${getMetricName(metric)}`;
  } else {
    return getMetricName(metric);
  }
}
