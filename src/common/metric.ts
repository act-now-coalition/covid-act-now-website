import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as ContactTracing from 'common/metrics/contact_tracing';
import * as FutureProjections from 'common/metrics/future_projection';
import * as CaseDensity from 'common/metrics/case_density';
import { Projection } from 'common/models/Projection';

import { Level, LevelInfo } from 'common/level';
import { assert } from './utils';

export enum Metric {
  CASE_GROWTH_RATE,
  POSITIVE_TESTS,
  HOSPITAL_USAGE,
  CONTACT_TRACING,
  FUTURE_PROJECTIONS,
  CASE_DENSITY,
}

// Not sure if there's a better way to enumerate all enum values? :-(
export const ALL_METRICS = Object.values(Metric).filter(
  v => typeof v === 'number',
) as Metric[];

// Future Projections has a graph but not a value.
export const ALL_VALUE_METRICS = ALL_METRICS.filter(
  m => m !== Metric.FUTURE_PROJECTIONS,
);

const METRIC_TO_NAME = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.METRIC_NAME,
  [Metric.POSITIVE_TESTS]: TestRates.METRIC_NAME,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.METRIC_NAME,
  [Metric.CONTACT_TRACING]: ContactTracing.METRIC_NAME,
  [Metric.FUTURE_PROJECTIONS]: FutureProjections.METRIC_NAME,
  [Metric.CASE_DENSITY]: CaseDensity.METRIC_NAME,
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
  [Metric.CASE_DENSITY]: CaseDensity.CASE_DENSITY_LEVEL_INFO_MAP,
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
  for (const level of [Level.LOW, Level.MEDIUM, Level.HIGH, Level.CRITICAL]) {
    if (value <= levelInfoMap[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}

const METRIC_TO_DISCLAIMER: { [metricName: number]: string } = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_DISCLAIMER,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_RATE_DISCLAIMER,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITALIZATIONS_DISCLAIMER,
  [Metric.CONTACT_TRACING]: ContactTracing.CONTACT_TRACING_DISCLAIMER,
  [Metric.CASE_DENSITY]: CaseDensity.CASE_DENSITY_DISCLAIMER,
};

export function getMetricDisclaimer(metric: Metric) {
  return METRIC_TO_DISCLAIMER[metric];
}

export function getMetricStatusText(metric: Metric, projection: Projection) {
  const METRIC_TO_STATUS_TEXT: { [metricName: number]: string } = {
    [Metric.CASE_GROWTH_RATE]: CaseGrowth.caseGrowthStatusText(projection),
    [Metric.POSITIVE_TESTS]: TestRates.positiveTestsStatusText(projection),
    [Metric.HOSPITAL_USAGE]: Hospitalizations.hospitalOccupancyStatusText(
      projection,
    ),
    [Metric.CONTACT_TRACING]: ContactTracing.contactTracingStatusText(
      projection,
    ),
    [Metric.CASE_DENSITY]: CaseDensity.caseDensityStatusText(projection),
  };
  return METRIC_TO_STATUS_TEXT[metric];
}
