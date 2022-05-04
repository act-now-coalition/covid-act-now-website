import { Metric } from 'common/metricEnum';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { SummaryForCompare } from 'common/utils/compare';
import {
  formatValue,
  getMetricNameForCompare,
  getLevelInfo,
} from 'common/metric';
import React from 'react';
import {
  DataCellValue,
  VaccinationsCell,
  VaccinationsCellProgressBar,
  VaccinationsCellValue,
} from './Compare.style';
import { formatPercent } from 'common/utils';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';

const UNKNOWN_VALUE_TEXT = '---';

/**
 * Represents a column in the compare table (e.g. for the weekly new cases metric).
 * Implementations must define the name, getValue(), render() functions, etc. as appropriate.
 */
export interface ColumnDefinition {
  /** A unique ID used to identify the column, e.g. to identify which column is sorted. */
  columnId: number;

  /** The column name. */
  name: string;

  /** The % width this column should be in relation to other columns. */
  desiredWidthPercent: number;

  /**
   * min-width of this column (e.g. to ensure enough space for the column header).
   * This is probably the width that will be used on mobile so try to make it
   * look nice. :-)
   */
  minWidthPx: number;

  /** Get the numeric value for the specified `row`. (used for sorting) */
  getValue(row: SummaryForCompare): number | null;

  /** Renders the contents of this column's cell for the provided `row`. */
  render(row: SummaryForCompare, locationName: string): React.ReactNode;
}

/** Represents a compare table column backed by a Metric (e.g. case density). */
class MetricColumn implements ColumnDefinition {
  constructor(
    private readonly metric: Metric,
    private readonly renderDot: boolean = true,
  ) {}

  columnId = this.metric;

  name = getMetricNameForCompare(this.metric);

  desiredWidthPercent = 14;
  minWidthPx = 110;

  getValue(row: SummaryForCompare): number | null {
    return row.metricsInfo.metrics[this.metric]?.value ?? null;
  }

  render(row: SummaryForCompare, locationName: string): React.ReactNode {
    const metricInfo = row.metricsInfo.metrics[this.metric];
    const value = metricInfo?.value ?? null;
    const formattedValue = formatValue(this.metric, value, UNKNOWN_VALUE_TEXT);
    const { color } = getLevelInfo(this.metric, value);

    return (
      <>
        {this.renderDot && <FiberManualRecordIcon style={{ color }} />}
        <DataCellValue
          $valueUnknown={!Number.isFinite(value)}
          $textAlign="right"
          $fontSize="16px"
        >
          {formattedValue}
        </DataCellValue>
      </>
    );
  }
}

class VaccinationsColumn extends MetricColumn {
  constructor() {
    super(Metric.VACCINATIONS);
  }

  desiredWidthPercent = 22;
  // Make it wide enough so progress bar doesn't look squashed on mobile.
  minWidthPx = 180;

  render(row: SummaryForCompare, locationName: string): React.ReactNode {
    const vaccinationsInitiated =
      row.metricsInfo.metrics[Metric.VACCINATIONS]?.value;
    const vaccinationsCompleted = row.metricsInfo.vc;

    if (!vaccinationsInitiated || !vaccinationsCompleted) {
      return (
        <DataCellValue $valueUnknown={true} $textAlign="right" $fontSize="16px">
          {UNKNOWN_VALUE_TEXT}
        </DataCellValue>
      );
    }

    return (
      <>
        <VaccinationsCell>
          <VaccinationsCellValue>
            {formatPercent(vaccinationsInitiated)}
          </VaccinationsCellValue>
          <VaccinationsCellProgressBar>
            <VaccineProgressBar
              vaccinationsCompleted={vaccinationsCompleted}
              vaccinationsInitiated={vaccinationsInitiated}
              locationName={locationName}
            />
          </VaccinationsCellProgressBar>
        </VaccinationsCell>
      </>
    );
  }
}

// All of the compare table columns we use.
const weeklyCasesPer100kColumn = new MetricColumn(Metric.WEEKLY_CASES_PER_100K);
const admissionsPer100kColumn = new MetricColumn(Metric.ADMISSIONS_PER_100K);
const ratioBedsWithCovidColumn = new MetricColumn(Metric.RATIO_BEDS_WITH_COVID);
const infectionRateColumn = new MetricColumn(
  Metric.CASE_GROWTH_RATE,
  /*renderDot=*/ false,
);
const vaccinationsColumn = new VaccinationsColumn();

/** Ordered array of columns. */
export const orderedColumns = [
  weeklyCasesPer100kColumn,
  admissionsPer100kColumn,
  ratioBedsWithCovidColumn,
  infectionRateColumn,
  vaccinationsColumn,
];

/** Ordered array of columns but with vaccinations first. */
export const orderedColumnsVaccineFirst = [
  vaccinationsColumn,
  ...orderedColumns.filter(c => c !== vaccinationsColumn),
];
