import { RegionSummaryWithTimeseries, Timeseries } from 'api';

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
  intervention: string;
  isInferred: boolean;
}

export interface Column {
  x: Date;
  y: any;
}

export interface ProjectionDataset {
  label: string;
  data: Column[];
}

// TODO(michael): Rework the way we expose datasets (use an enum or separate
// functions instead of magic strings).
// These names must match exactly the field in `Projection` that stores the
// data. See `getColumn()`.
export type DatasetId =
  | 'hospitalizations'
  | 'beds'
  | 'cumulativeDeaths'
  | 'cumulativeInfected'
  | 'rtRange'
  | 'icuUtilization'
  | 'testPositiveRate';

export interface RtRange {
  /** The actual Rt value. */
  rt: number;
  /** The lower-bound of the confidence interval. */
  low: number;
  /** The upper-bound of the confidence interval. */
  high: number;
}

/**
 * Represents a single projection for a given state or county.  Contains a
 * time-series of things like hospitalizations, hospital capacity, infections, etc.
 * The projection is either static or "inferred".  Inferred projections are based
 * on the actual data observed in a given location
 */
export class Projection {
  readonly isInferred: boolean;
  readonly totalPopulation: number;
  readonly cumulativeDead: number;
  readonly dateOverwhelmed: Date | null;
  readonly rt: number | null;

  private readonly intervention: string;
  private readonly dates: Date[];

  // NOTE: These are used dynamically by getColumn()
  private readonly hospitalizations: number[];
  private readonly beds: number[];
  private readonly cumulativeDeaths: number[];
  private readonly cumulativeInfected: number[];
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: number[];
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const timeseries = summaryWithTimeseries.timeseries;
    this.intervention = parameters.intervention;
    this.isInferred = parameters.isInferred;
    this.totalPopulation = summaryWithTimeseries.actuals.population;
    this.rt = null;
    if (this.isInferred) {
      this.rt = summaryWithTimeseries.projections.Rt;
    }

    this.dates = timeseries.map(row => new Date(row.date));

    // Set up our series data exposed via getDataset().
    this.hospitalizations = timeseries.map(row => row.hospitalBedsRequired);
    this.beds = timeseries.map(row => row.hospitalBedCapacity);
    this.cumulativeDeaths = timeseries.map(row => row.cumulativeDeaths);
    this.cumulativeInfected = timeseries.map(row => row.cumulativeInfected);
    this.rtRange = this.calcRtRange(timeseries);
    this.testPositiveRate = this.calcTestPositiveRate(timeseries);
    this.icuUtilization = this.calcIcuUtilization(timeseries);

    this.fixZeros(this.hospitalizations);
    this.fixZeros(this.cumulativeDeaths);

    this.cumulativeDead = this.cumulativeDeaths[
      this.cumulativeDeaths.length - 1
    ];

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);
  }

  get label() {
    return this.intervention;
  }

  cumulativeInfectedAfter(days: number) {
    return this.cumulativeInfected[this.cumulativeInfected.length - 1];
  }
  cumulativeDeadAfter(days: number) {
    return this.cumulativeDeaths[this.cumulativeDeaths.length - 1];
  }
  dateAfter(days: number) {
    return this.dates[this.dates.length - 1];
  }

  private getColumn(columnName: string): Column[] {
    return this.dates.map((date, idx) => ({
      x: date,
      y: (this as any)[columnName][idx],
    }));
  }

  getDataset(dataset: DatasetId, customLabel?: string): ProjectionDataset {
    return {
      label: customLabel ? customLabel : this.label,
      data: this.getColumn(dataset),
    };
  }

  private calcRtRange(timeseries: Timeseries): Array<RtRange | null> {
    return timeseries.map(row => {
      // TODO(michael): Why are the types wrong? I think
      // json-schema-to-typescript may be broken. :-(
      const rt = (row.Rt as any) as number;
      const ci = (row.RtCI90 as any) as number;
      if (rt) {
        return {
          rt: round(rt, 2),
          low: round(rt - ci, 2),
          high: round(rt + ci, 2),
        };
      } else {
        return null;
      }
    });
  }

  private calcTestPositiveRate(timeseries: Timeseries): Array<number | null> {
    const dailyPositives = this.deltasFromCumulatives(
      timeseries.map(row => row.cumulativePositiveTests),
    );
    const dailyNegatives = this.deltasFromCumulatives(
      timeseries.map(row => row.cumulativeNegativeTests),
    );

    return dailyPositives.map((dailyPositive, idx) => {
      const positive = dailyPositive || 0;
      const negative = dailyNegatives[idx] || 0;
      const total = positive + negative;
      return total > 0 ? round(positive / total, 3) : null;
    });
  }

  /**
   * Given a series of cumulative values, convert it to a series of deltas.
   *
   * Always returns null for the first value to avoid an arbitrarily large
   * delta (that may represent a bunch of historical data).
   *
   * Nulls are skipped, emitting null as the delta and keeping track of the
   * last non-null as the prior to use for calculating the next delta.
   */
  private deltasFromCumulatives(
    cumulatives: Array<number | null>,
  ): Array<number | null> {
    let lastNonNull = 0;
    const result: Array<number | null> = [null];
    for (let i = 1; i < cumulatives.length; i++) {
      const current = cumulatives[i];
      if (current === null) {
        result.push(null);
      } else {
        result.push(current - lastNonNull);
        lastNonNull = current;
      }
    }
    return result;
  }

  private calcIcuUtilization(timeseries: Timeseries): number[] {
    return timeseries.map(row => {
      return round(row.ICUBedsInUse / row.ICUBedCapacity, 3);
    });
  }

  // TODO: Due to
  // https://github.com/covid-projections/covid-data-model/issues/315 there may
  // be an erroneous "zero" data point ~today. We detect these and just average
  // the adjacent numbers.
  private fixZeros(data: number[]) {
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] === 0 && data[i - 1] !== 0 && data[i + 1] !== 0) {
        data[i] = (data[i - 1] + data[i + 1]) / 2;
      }
    }
  }
}

// Round a number to have only decimalDigits digits after the decimal.
function round(x: number, decimalDigits: number): number {
  return parseFloat(x.toFixed(decimalDigits));
}
