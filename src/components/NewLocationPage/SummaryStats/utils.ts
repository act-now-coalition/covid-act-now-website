import { LocationSummary } from 'common/location_summaries';
import { MetricValues } from 'common/models/Projections';
import { getMetricName, ALL_METRICS } from 'common/metric';
import { Metric } from 'common/metricEnum';

export const metricMeasureText: { [key in Metric]: string[] } = {
  [Metric.CASE_DENSITY]: ['per', '100k'],
  [Metric.VACCINATIONS]: ['1+', 'dose'],
  [Metric.CASE_GROWTH_RATE]: [''], // delete these empties without typescript complaining
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
