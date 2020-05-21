import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as ContactTracing from 'common/metrics/contact_tracing';

import { Level, LevelInfo } from 'common/level';

export enum Metric {
  CASE_GROWTH_RATE,
  POSITIVE_TESTS,
  HOSPITAL_USAGE,
  CONTACT_TRACING,
}

const METRIC_TO_NAME = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.METRIC_NAME,
  [Metric.POSITIVE_TESTS]: TestRates.METRIC_NAME,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.METRIC_NAME,
  [Metric.CONTACT_TRACING]: ContactTracing.METRIC_NAME,
};

export function getMetricName(metric: Metric) {
  return METRIC_TO_NAME[metric];
}

const ALL_METRICS_LEVEL_INFO_MAP = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_TESTS_LEVEL_INFO_MAP,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITAL_USAGE_LEVEL_INFO_MAP,
  [Metric.CONTACT_TRACING]: ContactTracing.CONTACT_TRACING_LEVEL_INFI_MAP,
};

export function getLevelInfo(metric: Metric, value: number | null): LevelInfo {
  const level = getLevel(metric, value);
  return ALL_METRICS_LEVEL_INFO_MAP[metric][level];
}

export function getLevel(metric: Metric, value: number | null): Level {
  const levelInfoMap = ALL_METRICS_LEVEL_INFO_MAP[metric];
  // TODO(michael): Is there a typesafe way to enumerate enum values? :-/
  if (value === null) return Level.UNKNOWN;
  for (const level of [Level.LOW, Level.MEDIUM, Level.HIGH]) {
    if (value <= levelInfoMap[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}
