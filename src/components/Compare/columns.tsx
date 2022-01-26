import { Metric } from 'common/metricEnum';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { SummaryForCompare } from 'common/utils/compare';
import { formatValue, getMetricNameForCompare } from 'common/metric';
import { LEVEL_COLOR } from 'common/colors';
import { Level } from 'common/level';
import { getCcviLevel, getCcviLevelColor, getCcviLevelName } from 'common/ccvi';
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

// Arbitrarily start non-Metric columns at 100.
const CCVI_COLUMN_ID = 100;
const HOSPITALIZATIONS_DENSITY_ID = 101;

/**
 * Represents a column in the compare table (e.g. for the case density metric or CCVI).
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
  constructor(private readonly metric: Metric) {}

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
    const color = LEVEL_COLOR[metricInfo?.level ?? Level.UNKNOWN];
    return (
      <>
        <FiberManualRecordIcon style={{ color }} />
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

/** Represents the CCVI column in the compare table. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CcviColumn implements ColumnDefinition {
  columnId = CCVI_COLUMN_ID;

  name = 'Vulnerability Level';

  desiredWidthPercent = 14;
  // Need 130px to fit "Vulnerability" in the header.
  minWidthPx = 130;

  getValue(row: SummaryForCompare): number | null {
    return row.metricsInfo.ccvi;
  }

  render(row: SummaryForCompare): React.ReactNode {
    let color = LEVEL_COLOR[Level.UNKNOWN];
    let formattedValue = UNKNOWN_VALUE_TEXT;
    const ccvi = row.metricsInfo.ccvi;
    if (ccvi !== null) {
      const level = getCcviLevel(ccvi);
      color = getCcviLevelColor(level);
      formattedValue = getCcviLevelName(level);
    }

    return (
      <>
        <FiberManualRecordIcon style={{ color }} />
        <DataCellValue
          $valueUnknown={ccvi === null}
          $textAlign="left"
          $fontSize="14px"
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

class HospitalizationsDensityColumn implements ColumnDefinition {
  columnId = HOSPITALIZATIONS_DENSITY_ID;

  name = 'Hospitalizations per 100k';

  desiredWidthPercent = 14;
  // Make it wide enough so progress bar doesn't look squashed on mobile.
  minWidthPx = 130;

  getValue(row: SummaryForCompare): number | null {
    return row.metricsInfo.hd;
  }

  render(row: SummaryForCompare): React.ReactNode {
    const hd = row.metricsInfo.hd;
    let formattedValue = UNKNOWN_VALUE_TEXT;
    if (hd !== null) {
      formattedValue = hd.toFixed(1);
    }

    return (
      <DataCellValue
        $valueUnknown={hd === null}
        $textAlign="left"
        $fontSize="16px"
      >
        {formattedValue}
      </DataCellValue>
    );
  }
}

// All of the compare table columns we use.
const caseDensityColumn = new MetricColumn(Metric.CASE_DENSITY);
const caseGrowthRateColumn = new MetricColumn(Metric.CASE_GROWTH_RATE);
const positiveTestsColumn = new MetricColumn(Metric.POSITIVE_TESTS);
const vaccinationsColumn = new VaccinationsColumn();
const hospitalizationsDensityColumn = new HospitalizationsDensityColumn();

/** Ordered array of columns. */
export const orderedColumns = [
  caseDensityColumn,
  caseGrowthRateColumn,
  positiveTestsColumn,
  hospitalizationsDensityColumn,
  vaccinationsColumn,
];

/** Ordered array of columns but with vaccinations first. */
export const orderedColumnsVaccineFirst = [
  vaccinationsColumn,
  ...orderedColumns.filter(c => c !== vaccinationsColumn),
];
