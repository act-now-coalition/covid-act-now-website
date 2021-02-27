import { Metric } from 'common/metricEnum';
import { SummaryForCompare } from 'common/utils/compare';
import { formatValue, getMetricNameForCompare } from 'common/metric';
import { LEVEL_COLOR } from 'common/colors';
import { Level } from 'common/level';
import { getCcviLevel, getCcviLevelColor, getCcviLevelName } from 'common/ccvi';

const UNKNOWN_VALUE_TEXT = '---';

// Arbitrarily start non-Metric columns at 100.
const CCVI_COLUMN_ID = 100;

/**
 * Represents a column in the compare table (e.g. for the case density metric or CCVI).
 * Implementations must define the name, getValue() function, etc. as appropriate.
 */
export interface ColumnDefinition {
  /** A unique ID used to identify the column, e.g. to identify which column is sorted. */
  columnId: number;

  /** The column name. */
  name: string;

  /** Get the numeric value for the specified `row`. (used for sorting) */
  getValue(row: SummaryForCompare): number | null;

  /** Get the formatted value for the specified `row`. (used for display). */
  getFormattedValue(row: SummaryForCompare): string;

  /** Get the color of the dot to display next to the formatted value for the specified `row`. */
  getIconColor(row: SummaryForCompare): string;
}

/** Represents a compare table column backed by a Metric (e.g. case density). */
class MetricColumn implements ColumnDefinition {
  constructor(private readonly metric: Metric) {}

  columnId = this.metric;

  name = getMetricNameForCompare(this.metric);

  getValue(row: SummaryForCompare): number | null {
    return row.metricsInfo.metrics[this.metric]?.value ?? null;
  }

  getFormattedValue(row: SummaryForCompare): string {
    return formatValue(this.metric, this.getValue(row), UNKNOWN_VALUE_TEXT);
  }

  getIconColor(row: SummaryForCompare): string {
    const level = row.metricsInfo.metrics[this.metric]?.level ?? Level.UNKNOWN;
    return LEVEL_COLOR[level];
  }
}

/** Represents the CCVI column in the compare table. */
class CcviColumn implements ColumnDefinition {
  columnId = CCVI_COLUMN_ID;

  name = 'Vulnerability Level';

  getValue(row: SummaryForCompare): number | null {
    return row.metricsInfo.ccvi;
  }

  getFormattedValue(row: SummaryForCompare): string {
    const ccvi = row.metricsInfo.ccvi;
    if (ccvi === null) {
      return UNKNOWN_VALUE_TEXT;
    }
    const level = getCcviLevel(ccvi);
    return getCcviLevelName(level);
  }

  getIconColor(row: SummaryForCompare): string {
    const ccvi = row.metricsInfo.ccvi;
    if (ccvi === null) {
      return LEVEL_COLOR[Level.UNKNOWN];
    }
    const level = getCcviLevel(ccvi);
    return getCcviLevelColor(level);
  }
}

// All of the compare table columns we use.
const caseDensityColumn = new MetricColumn(Metric.CASE_DENSITY);
const caseGrowthRateColumn = new MetricColumn(Metric.CASE_GROWTH_RATE);
const positiveTestsColumn = new MetricColumn(Metric.POSITIVE_TESTS);
const hospitalUsageColumn = new MetricColumn(Metric.HOSPITAL_USAGE);
const vaccinationsColumn = new MetricColumn(Metric.VACCINATIONS);
const ccviColumn = new CcviColumn();

/** Ordered array of columns. */
export const orderedColumns = [
  caseDensityColumn,
  caseGrowthRateColumn,
  positiveTestsColumn,
  hospitalUsageColumn,
  vaccinationsColumn,
  ccviColumn,
];

/** Ordered array of columns but with vaccinations first. */
export const orderedColumnsVaccineFirst = [
  vaccinationsColumn,
  ...orderedColumns.filter(c => c !== vaccinationsColumn),
];
