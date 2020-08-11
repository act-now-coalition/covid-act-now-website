import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as ContactTracing from 'common/metrics/contact_tracing';
import * as FutureProjections from 'common/metrics/future_projection';
import * as CaseDensity from 'common/metrics/case_density';
import { Projections } from 'common/models/Projections';
import { Level, LevelInfo } from 'common/level';
import { fail, assert } from 'common/utils';
import { MetricDefinition } from './metrics/interfaces';
import { formatDecimal, formatPercent } from 'common/utils';
import { isNumber } from 'lodash';

export enum Metric {
  // NOTE: Always add new metrics to the end (don't reorder). For better or
  // worse, the metric number is encoded in URLs and in our persisted summaries
  // files (used by /internal/compare/), etc. So reordering them would break
  // things.
  CASE_GROWTH_RATE,
  POSITIVE_TESTS,
  HOSPITAL_USAGE,
  CONTACT_TRACING,
  FUTURE_PROJECTIONS, // no longer used but we leave it to preserve the numbering.
  CASE_DENSITY,
}

export const ALL_METRICS = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.HOSPITAL_USAGE,
  Metric.CONTACT_TRACING,
];

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
  [Metric.CASE_DENSITY]: 'Daily new cases',
};

export function getMetricName(metric: Metric) {
  return METRIC_TO_NAME[metric];
}

export function getMetricNameExtended(metric: Metric) {
  if (metric === Metric.CASE_DENSITY) {
    return `${METRIC_TO_NAME[metric]} per 100k population`;
  } else {
    return METRIC_TO_NAME[metric];
  }
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

const metricDefinitions: { [metric in Metric]: MetricDefinition } = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CaseGrowthMetric,
  [Metric.POSITIVE_TESTS]: TestRates.PositiveTestRateMetric,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.ICUHeadroomMetric,
  [Metric.CONTACT_TRACING]: ContactTracing.ContactTracingMetric,
  [Metric.FUTURE_PROJECTIONS]: FutureProjections.FutureProjectionsMetric,
  [Metric.CASE_DENSITY]: CaseDensity.CaseIncidenceMetric,
};

export function getMetricStatusText(metric: Metric, projections: Projections) {
  if (!(metric in metricDefinitions)) {
    fail('unknown metric');
  }

  const metricDefinition = metricDefinitions[metric];
  return metricDefinition.renderStatus(projections);
}

export const formatValue = (
  chartType: Metric,
  value: number | null,
  nullValueCopy: string,
): string => {
  if (!isNumber(value)) {
    return nullValueCopy;
  }
  if (chartType === Metric.CASE_DENSITY) {
    return formatDecimal(value, 1);
  } else if (chartType === Metric.CASE_GROWTH_RATE) {
    return formatDecimal(value);
  } else if (chartType === Metric.HOSPITAL_USAGE) {
    return formatPercent(value);
  } else if (chartType === Metric.POSITIVE_TESTS) {
    return formatPercent(value, 1);
  } else if (chartType === Metric.CONTACT_TRACING) {
    return formatPercent(value, 0);
  }
  fail('Invalid Chart Type');
};

//TODO (chelsi)- consolidate getMetricName functions
export function getMetricNameForCompare(metric: Metric) {
  if (metric === Metric.CASE_DENSITY) {
    return `${METRIC_TO_NAME[metric]} per 100k`;
  } else {
    return METRIC_TO_NAME[metric];
  }
}
