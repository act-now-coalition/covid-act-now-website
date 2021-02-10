import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as Vaccinations from 'common/metrics/vaccinations';
import * as CaseDensity from 'common/metrics/case_density';
import { Projections } from 'common/models/Projections';
import { ALL_LEVELS, Level, LevelInfo } from 'common/level';
import { fail } from 'common/utils';
import { MetricDefinition } from './metrics/interfaces';
import { formatDecimal, formatPercent } from 'common/utils';
import { isNumber } from 'lodash';
import { Metric } from './metricEnum';

export { Metric };

export const ALL_METRICS = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.HOSPITAL_USAGE,
  Metric.VACCINATIONS,
];

const ALL_METRICS_LEVEL_INFO_MAP = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_TESTS_LEVEL_INFO_MAP,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITAL_USAGE_LEVEL_INFO_MAP,
  [Metric.VACCINATIONS]: Vaccinations.VACCINATIONS_LEVEL_INFO_MAP,
  [Metric.CASE_DENSITY]: CaseDensity.CASE_DENSITY_LEVEL_INFO_MAP,
};

export function getLevelInfo(metric: Metric, value: number | null): LevelInfo {
  const level = getLevel(metric, value);
  return ALL_METRICS_LEVEL_INFO_MAP[metric][level];
}

export function getLevel(metric: Metric, value: number | null): Level {
  // Vaccinations don't have levels
  if (metric === Metric.VACCINATIONS) {
    return Level.UNKNOWN;
  }

  const levelInfoMap = ALL_METRICS_LEVEL_INFO_MAP[metric];
  if (value === null) return Level.UNKNOWN;
  for (const level of ALL_LEVELS) {
    if (value <= levelInfoMap[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}

const metricDefinitions: { [metric in Metric]: MetricDefinition } = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CaseGrowthMetric,
  [Metric.POSITIVE_TESTS]: TestRates.PositiveTestRateMetric,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.ICUCapacityUsed,
  [Metric.VACCINATIONS]: Vaccinations.VaccinationsMetric,
  [Metric.CASE_DENSITY]: CaseDensity.CaseIncidenceMetric,
};

export function getMetricDefinition(metric: Metric) {
  if (!(metric in metricDefinitions)) {
    fail('unknown metric');
  }
  return metricDefinitions[metric];
}

export function getMetricDisclaimer(metric: Metric, projections: Projections) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.renderDisclaimer(projections);
}

export function getMetricStatusText(metric: Metric, projections: Projections) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.renderStatus(projections);
}

export function getMetricName(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.metricName;
}

export function getMetricNameExtended(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.extendedMetricName;
}

export function getMetricNameForCompare(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.metricNameForCompare;
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
  } else if (chartType === Metric.VACCINATIONS) {
    return formatPercent(value, 1);
  }
  fail('Invalid Chart Type');
};
