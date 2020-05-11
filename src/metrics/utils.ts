import * as CaseGrowth from 'metrics/case_growth';
import * as TestRates from 'metrics/test_rates';
import * as Hospitalizations from 'metrics/hospitalizations';

import { Level, LevelInfo } from 'enums/levels';
import { Metric } from 'enums/metrics';

const METRIC_TO_NAME = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.METRIC_NAME,
  [Metric.POSITIVE_TESTS]: TestRates.METRIC_NAME,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.METRIC_NAME,
};

export function getMetricName(metric: Metric) {
  return METRIC_TO_NAME[metric];
}

const CHART_LEVELS = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_RATE_LEVELS,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_TESTS_LEVELS,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITAL_USAGE_LEVELS,
};

export function getLevelInfo(metric: Metric, value: number | null): LevelInfo {
  const level = getLevel(metric, value);
  return CHART_LEVELS[metric][level];
}

export function getLevel(metric: Metric, value: number | null): Level {
  const levels = CHART_LEVELS[metric];
  // TODO(michael): Is there a typesafe way to enumerate enum values? :-/
  if (value === null) return Level.UNKNOWN;
  for (const level of [Level.LOW, Level.MEDIUM, Level.HIGH]) {
    if (value <= levels[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}
