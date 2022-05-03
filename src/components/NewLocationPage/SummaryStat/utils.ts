import { LocationSummary } from 'common/location_summaries';
import { MetricValues } from 'common/models/Projections';
import { getMetricNameForSummaryStat, ALL_METRICS } from 'common/metric';
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

export const metricSubLabelText: { [key in Metric]: string[] } = {
  [Metric.CASE_DENSITY]: ['per', '100k'],
  [Metric.VACCINATIONS]: ['Booster', 'shot'],
  [Metric.CASE_GROWTH_RATE]: [''], // figure out deleting these empties without typescript complaining
  [Metric.HOSPITAL_USAGE]: [''],
  [Metric.POSITIVE_TESTS]: [''],
  [Metric.WEEKLY_CASES_PER_100K]: ['per', '100k'],
  [Metric.RATIO_BEDS_WITH_COVID]: ['of all', 'beds'],
  [Metric.ADMISSIONS_PER_100K]: ['per', '100k'],
};

export const metricNameSubLabel: { [key in Metric]: string } = {
  [Metric.CASE_DENSITY]: '',
  [Metric.VACCINATIONS]: 'Booster Shot',
  [Metric.CASE_GROWTH_RATE]: '',
  [Metric.HOSPITAL_USAGE]: '',
  [Metric.POSITIVE_TESTS]: '',
  [Metric.WEEKLY_CASES_PER_100K]: 'Weekly new reported cases per 100k',
  [Metric.RATIO_BEDS_WITH_COVID]: 'Patients with COVID of all beds',
  [Metric.ADMISSIONS_PER_100K]: 'Weekly COVID admissions per 100k',
};

export const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    if (metric === Metric.VACCINATIONS) {
      stats[metric] = summary.vb ?? null;
    } else {
      stats[metric] = summary.metrics[metric]?.value ?? null;
    }
  }
  return stats;
};

export function getMetricNameForStat(metric: Metric): string {
  if (metric === Metric.VACCINATIONS) {
    return `% ${getMetricNameForSummaryStat(metric)}`;
  } else {
    return getMetricNameForSummaryStat(metric);
  }
}
