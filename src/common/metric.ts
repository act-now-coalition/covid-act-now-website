import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as ContactTracing from 'common/metrics/contact_tracing';
import * as FutureProjections from 'common/metrics/future_projection';

import { Level, LevelInfo } from 'common/level';
import { assert } from './utils';

export enum Metric {
  CASE_GROWTH_RATE,
  POSITIVE_TESTS,
  HOSPITAL_USAGE,
  CONTACT_TRACING,
  FUTURE_PROJECTIONS,
}

// Not sure if there's a better way to enumerate all enum values? :-(
export const ALL_METRICS = Object.values(Metric).filter(
  v => typeof v === 'number',
) as Metric[];

const METRIC_TO_NAME = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.METRIC_NAME,
  [Metric.POSITIVE_TESTS]: TestRates.METRIC_NAME,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.METRIC_NAME,
  [Metric.CONTACT_TRACING]: ContactTracing.METRIC_NAME,
  [Metric.FUTURE_PROJECTIONS]: FutureProjections.METRIC_NAME,
};

export function getMetricName(metric: Metric) {
  return METRIC_TO_NAME[metric];
}

const ALL_METRICS_LEVEL_INFO_MAP = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_TESTS_LEVEL_INFO_MAP,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITAL_USAGE_LEVEL_INFO_MAP,
  [Metric.CONTACT_TRACING]: ContactTracing.CONTACT_TRACING_LEVEL_INFO_MAP,
  [Metric.FUTURE_PROJECTIONS]: null, // Future Projections doesn't have levels.
};

export function getLevelInfo(metric: Metric, value: number | null): LevelInfo {
  assert(
    metric !== Metric.FUTURE_PROJECTIONS,
    `Future Projections don't have levels`,
  );
  const level = getLevel(metric, value);
  return ALL_METRICS_LEVEL_INFO_MAP[metric][level];
}

export function getLevel(metric: Metric, value: number | null): Level {
  assert(
    metric !== Metric.FUTURE_PROJECTIONS,
    `Future Projections don't have levels`,
  );
  const levelInfoMap = ALL_METRICS_LEVEL_INFO_MAP[metric];
  // TODO(michael): Is there a typesafe way to enumerate enum values? :-/
  if (value === null) return Level.UNKNOWN;
  for (const level of [
    Level.LOW,
    Level.MEDIUM,
    Level.MEDIUM_HIGH,
    Level.HIGH,
  ]) {
    if (value <= levelInfoMap[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}
