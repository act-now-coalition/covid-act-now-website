import { RegionSummaryWithTimeseries, Timeseries } from 'api';

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
  intervention: string;
  isInferred: boolean;
}

export interface Column {
  x: number; // ms since epoch
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
  readonly locationName: string;
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
  private readonly cumulativePositiveTests: Array<number | null>;
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: Array<number | null>;
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const timeseries = summaryWithTimeseries.timeseries;
    const lastUpdated = new Date(summaryWithTimeseries.lastUpdatedDate);
    this.locationName = this.getLocationName(summaryWithTimeseries);
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
    this.cumulativePositiveTests = timeseries.map(
      row => row.cumulativePositiveTests,
    );
    this.rtRange = this.calcRtRange(timeseries);
    this.testPositiveRate = this.calcTestPositiveRate(timeseries);
    this.icuUtilization = this.calcIcuUtilization(timeseries, lastUpdated);

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

  /**
   * Returns the delta between the number of new cases in the past week and the
   * number in the prior week.
   */
  get weeklyNewCasesDelta(): number {
    const i = this.indexOfLastValue(this.cumulativePositiveTests);
    if (i === null) {
      return 0;
    } else {
      // NOTE: If i < 14 we'll be taking advantage of JS letting us do negative
      // array indexes. :-)
      const cumulativeToday = this.cumulativePositiveTests[i] || 0;
      const cumulative7daysAgo = this.cumulativePositiveTests[i - 7] || 0;
      const cumulative14daysAgo = this.cumulativePositiveTests[i - 14] || 0;
      const thisWeek = cumulativeToday - cumulative7daysAgo;
      const lastWeek = cumulative7daysAgo - cumulative14daysAgo;
      return thisWeek - lastWeek;
    }
  }

  // TODO(michael): We should probably average this out over a week since the data can be spiky.
  get currentTestPositiveRate(): number | null {
    const i = this.indexOfLastValue(this.testPositiveRate);
    return i && this.testPositiveRate[i];
  }

  get currentIcuUtilization(): number | null {
    const i = this.indexOfLastValue(this.icuUtilization);
    return i && this.icuUtilization[i];
  }

  private getColumn(columnName: string): Column[] {
    return this.dates.map((date, idx) => ({
      x: date.getTime(),
      y: (this as any)[columnName][idx],
    }));
  }

  getDataset(dataset: DatasetId, customLabel?: string): ProjectionDataset {
    return {
      label: customLabel ? customLabel : this.label,
      data: this.getColumn(dataset),
    };
  }

  private getLocationName(s: RegionSummaryWithTimeseries) {
    // TODO(michael): I don't like hardcoding "County" into the name. We should
    // probably delete this code and get the location name from somewhere other
    // than the API (or improve the API value).
    return s.countyName
      ? `${s.countyName} County, ${s.stateName}`
      : s.stateName;
  }

  private calcRtRange(timeseries: Timeseries): Array<RtRange | null> {
    return timeseries.map(row => {
      // TODO(michael): Why are the types wrong? I think
      // json-schema-to-typescript may be broken. :-(
      const rt = (row.Rt as any) as number;
      const ci = (row.RtCI90 as any) as number;
      if (rt) {
        return {
          rt: rt,
          low: rt - ci,
          high: rt + ci,
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
      return total > 0 ? positive / total : null;
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

  private calcIcuUtilization(
    timeseries: Timeseries,
    lastUpdated: Date,
  ): Array<number | null> {
    const icuUtilization = timeseries.map(
      row => row.ICUBedsInUse / row.ICUBedCapacity,
    );

    // Strip off the future projections.
    // TODO(michael): I'm worried about an off-by-one here. I _think_ we usually
    // update our projections using yesterday's data. So we want to strip
    // everything >= lastUpdatedDate. But since the ICU data is all estimates, I
    // can't really validate that's correct.
    return this.omitDataAtOrAfterDate(icuUtilization, lastUpdated);
  }

  /**
   * Replaces all values at or after (>=) the specified date with nulls. Keeps data for
   * dates before (<) the specified date as-is.
   */
  private omitDataAtOrAfterDate<T>(
    data: Array<T | null> | Array<T>,
    cutoffDate: Date,
  ): Array<T | null> {
    return this.dates.map((date, idx) => {
      const value = data[idx];
      return date < cutoffDate ? value : null;
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

  private indexOfLastValue(data: Array<number | null>): number | null {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] !== null) {
        return i;
      }
    }
    return null;
  }
}
