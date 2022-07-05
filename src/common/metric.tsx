import isNumber from 'lodash/isNumber';
import * as CaseGrowth from 'common/metrics/case_growth';
import * as TestRates from 'common/metrics/positive_rate';
import * as Hospitalizations from 'common/metrics/hospitalizations';
import * as Vaccinations from 'common/metrics/vaccinations';
import * as CaseDensity from 'common/metrics/case_density';
import * as WeeklyNewCasesPer100k from 'common/metrics/weekly_new_cases_per_100k';
import * as AdmissionsPer100k from 'common/metrics/admissions_per_100k';
import * as RatioBedsWithCovid from 'common/metrics/ratio_beds_with_covid_patients';
import { Projections } from 'common/models/Projections';
import { ALL_LEVELS, Level, LevelInfo, LevelInfoMap } from 'common/level';
import { fail } from '@actnowcoalition/assert';
import { MetricDefinition } from './metrics/interfaces';
import { formatDecimal, formatPercent } from 'common/utils';
import { Metric } from 'common/metricEnum';

export const ALL_METRICS = [
  Metric.WEEKLY_CASES_PER_100K,
  Metric.RATIO_BEDS_WITH_COVID,
  Metric.ADMISSIONS_PER_100K,
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.HOSPITAL_USAGE,
  Metric.VACCINATIONS,
];

const ALL_METRICS_LEVEL_INFO_MAP: { [metric in Metric]: LevelInfoMap } = {
  [Metric.CASE_GROWTH_RATE]: CaseGrowth.CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  [Metric.POSITIVE_TESTS]: TestRates.POSITIVE_TESTS_LEVEL_INFO_MAP,
  [Metric.HOSPITAL_USAGE]: Hospitalizations.HOSPITAL_USAGE_LEVEL_INFO_MAP,
  [Metric.VACCINATIONS]: Vaccinations.VACCINATIONS_LEVEL_INFO_MAP,
  [Metric.CASE_DENSITY]: CaseDensity.CASE_DENSITY_LEVEL_INFO_MAP,
  [Metric.RATIO_BEDS_WITH_COVID]:
    RatioBedsWithCovid.RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP,
  [Metric.ADMISSIONS_PER_100K]:
    AdmissionsPer100k.ADMISSIONS_PER_100K_LEVEL_INFO_MAP,
  [Metric.WEEKLY_CASES_PER_100K]:
    WeeklyNewCasesPer100k.WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP,
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
    if (value < levelInfoMap[level].upperLimit) {
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
  [Metric.RATIO_BEDS_WITH_COVID]:
    RatioBedsWithCovid.RatioBedsWithCovidPatientsMetric,
  [Metric.ADMISSIONS_PER_100K]: AdmissionsPer100k.AdmissionsPer100kMetric,
  [Metric.WEEKLY_CASES_PER_100K]:
    WeeklyNewCasesPer100k.WeeklyNewCasesPer100kMetric,
};

export function getMetricDefinition(metric: Metric) {
  if (!(metric in metricDefinitions)) {
    fail('unknown metric');
  }
  return metricDefinitions[metric];
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

export function getMetricNameForSummaryStat(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.metricNameForSummaryStat;
}

/**
 * How many decimals to include when formatting each metric for display (e.g. in
 * the location header or compare table).
 */
const MetricDecimalPlaces: { [metric in Metric]: number } = {
  [Metric.CASE_DENSITY]: 1,
  [Metric.CASE_GROWTH_RATE]: 2,
  [Metric.HOSPITAL_USAGE]: 0,
  [Metric.POSITIVE_TESTS]: 1,
  [Metric.VACCINATIONS]: 1,

  // TODO(8.2) : confirm these decimal places
  [Metric.RATIO_BEDS_WITH_COVID]: 1,
  [Metric.ADMISSIONS_PER_100K]: 1,
  [Metric.WEEKLY_CASES_PER_100K]: 1,
};

/** which metrics should be formatted as percentages. */
const MetricsFormattedAsPercentage = [
  Metric.HOSPITAL_USAGE,
  Metric.POSITIVE_TESTS,
  Metric.VACCINATIONS,
  Metric.RATIO_BEDS_WITH_COVID,
];

/**
 * Formats a metric value as a string for display (e.g. in the location header
 * or compare table).
 */
export const formatValue = (
  metric: Metric,
  value: number | null,
  nullValueCopy: string,
): string => {
  if (!isNumber(value)) {
    return nullValueCopy;
  }
  let decimalPlaces = MetricDecimalPlaces[metric];
  if (MetricsFormattedAsPercentage.includes(metric)) {
    return formatPercent(value, decimalPlaces);
  } else {
    return formatDecimal(value, decimalPlaces);
  }
};

/**
 * Rounds a metric value to the necessary # of decimal places to avoid
 * losing precision that we would want for display purposes.  Used to
 * optimize the data we store in our location summaries JSON.
 */
export const roundMetricValue = (
  metric: Metric,
  value: number | null,
): number | null => {
  if (value === null) {
    return null;
  }

  let decimalPlaces = MetricDecimalPlaces[metric];
  if (MetricsFormattedAsPercentage.includes(metric)) {
    // The metric will be a 0.xyz ratio that needs to be multiplied by 100 before we
    // apply the desired number of decimal places, so we need to add 2.
    decimalPlaces += 2;
  }
  return Number(value.toFixed(decimalPlaces));
};
