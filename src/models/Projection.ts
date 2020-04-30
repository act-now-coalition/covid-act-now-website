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
  readonly dateOverwhelmed: Date | null;
  readonly totalICUCapacity: number;
  readonly typicallyFreeICUCapacity: number;
  readonly currentICUPatients: number | null;

  private readonly intervention: string;
  private readonly dates: Date[];

  // NOTE: These are used dynamically by getColumn()
  private readonly hospitalizations: number[];
  private readonly beds: number[];
  private readonly cumulativeDeaths: number[];
  private readonly cumulativeInfected: number[];
  private readonly cumulativePositiveTests: Array<number | null>;
  private readonly cumulativeNegativeTests: Array<number | null>;
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
    this.dates = timeseries.map(row => new Date(row.date));

    // Set up our series data exposed via getDataset().
    this.hospitalizations = timeseries.map(row => row.hospitalBedsRequired);
    this.beds = timeseries.map(row => row.hospitalBedCapacity);
    this.cumulativeDeaths = timeseries.map(row => row.cumulativeDeaths);
    this.cumulativeInfected = timeseries.map(row => row.cumulativeInfected);
    this.cumulativePositiveTests = this.smoothCumulatives(
      timeseries.map(row => row.cumulativePositiveTests),
    );
    this.cumulativeNegativeTests = this.smoothCumulatives(
      timeseries.map(row => row.cumulativeNegativeTests),
    );
    this.rtRange = this.calcRtRange(timeseries);
    this.testPositiveRate = this.calcTestPositiveRate();
    this.icuUtilization = this.calcIcuUtilization(timeseries, lastUpdated);

    this.totalICUCapacity = this.calcIcuCapacity(summaryWithTimeseries);
    this.typicallyFreeICUCapacity =
      summaryWithTimeseries.actuals.ICUBeds.capacity * (1 - summaryWithTimeseries.actuals.ICUBeds.typicalUsageRate);
    this.currentICUPatients = this.calcCurrentICUPatients(
      timeseries,
      lastUpdated,
    );

    this.fixZeros(this.hospitalizations);
    this.fixZeros(this.cumulativeDeaths);

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);
  }

  get label() {
    return this.intervention;
  }

  get finalCumulativeInfected() {
    return this.cumulativeInfected[this.cumulativeInfected.length - 1];
  }

  get finalCumulativeDeaths() {
    return this.cumulativeDeaths[this.cumulativeDeaths.length - 1];
  }

  /** Returns the date when projections end (should be 90 days out). */
  get finalDate(): Date {
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
    return this.lastValue(this.testPositiveRate);
  }

  get currentIcuUtilization(): number | null {
    return this.lastValue(this.icuUtilization);
  }

  get rt(): number | null {
    const lastRange = this.lastValue(this.rtRange);
    return lastRange && lastRange.rt;
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
      const rt = (row.RtIndicator as any) as number;
      const ci = (row.RtIndicatorCI90 as any) as number;
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

  private calcTestPositiveRate(): Array<number | null> {
    const dailyPositives = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(this.cumulativePositiveTests),
    );
    const dailyNegatives = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(this.cumulativeNegativeTests),
    );

    return dailyPositives.map((dailyPositive, idx) => {
      const positive = dailyPositive || 0;
      const negative = dailyNegatives[idx] || 0;
      const total = positive + negative;
      // If there are no negatives (but there are positives), then this is
      // likely the last data point, else it would have gotten smoothed, and
      // it's probably a reporting lag issue. So just return null.
      return negative > 0 ? positive / total : null;
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
    // The API gives us the beds in use *by covid*, and the total capacity *for
    // covid*, using an assumption that ICUs are usually 75% full with non-covid
    // patients. We've decided to show full ICU utilization (not just covid), so
    // we need to undo that assumption.
    // TODO(igor): Update this on the API side so we can undo this logic.
    const icuUtilization = timeseries.map(row => {
      if (row.ICUBedCapacity > 0 && row.ICUBedsInUse > 0) {
        return Math.min(1, row.ICUBedsInUse / row.ICUBedCapacity);
      } else {
        return null;
      }
    });

    // Strip off the future projections.
    // TODO(michael): I'm worried about an off-by-one here. I _think_ we usually
    // update our projections using yesterday's data. So we want to strip
    // everything >= lastUpdatedDate. But since the ICU data is all estimates, I
    // can't really validate that's correct.
    return this.omitDataAtOrAfterDate(icuUtilization, lastUpdated);
  }

  private calcIcuCapacity(s: RegionSummaryWithTimeseries) {
    return  s.actuals.ICUBeds.capacity;
  }

  private calcCurrentICUPatients(
    timeseries: Timeseries,
    lastUpdated: Date,
  ): number | null {
    const icuPatients = this.omitDataAtOrAfterDate(
      timeseries.map(row => row.ICUBedsInUse),
      lastUpdated,
    );

    return this.lastValue(icuPatients);
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

  private indexOfLastValue<T>(data: Array<T | null>): number | null {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] !== null) {
        return i;
      }
    }
    return null;
  }

  private lastValue<T>(data: Array<T | null>): T | null {
    const i = this.indexOfLastValue(data);
    return i === null ? null : data[i]!;
  }

  /**
   * Finds any "gaps" where data is missing or stalls at a steady number for
   * multiple days and replaces them with interpolated data.
   */
  private smoothCumulatives(data: Array<number | null>): Array<number | null> {
    const gaps = this.findGapsInCumulatives(data);
    return this.interpolateRanges(data, gaps);
  }

  /**
   * Given data and a list of ranges, interpolates the values inside each
   * range, using the start/end of each range as the fixed values to
   * interpolate between.
   */
  private interpolateRanges(
    data: Array<number | null>,
    ranges: Array<{ start: number; end: number }>,
  ): Array<number | null> {
    let result = [...data];
    for (const { start, end } of ranges) {
      const startValue = data[start]!;
      const endValue = data[end]!;
      const round = Number.isInteger(startValue) && Number.isInteger(endValue);
      const divisions = end - start;
      const divisionDelta = (endValue - startValue) / divisions;
      for (let i = start + 1; i < end; i++) {
        const value = startValue + divisionDelta * (i - start);
        result[i] = round ? Math.round(value) : value;
      }
    }
    return result;
  }

  /**
   * Given a series of data points representing cumulative values (should be
   * monotonically increasing), finds any "gaps" where data is `0`, `null`, or
   * stalls at a steady number for multiple days.
   *
   * The returned {start, end} tuples are the indices of the entries surrounding each gap.
   *
   * Any `0` / `null` data points at the beginning or end of the data are not
   * considered a gap.
   */
  private findGapsInCumulatives(
    data: Array<number | null>,
  ): Array<{ start: number; end: number }> {
    let lastValidValueIndex: number | null = null;
    const gaps = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const isValid =
        value !== 0 &&
        value !== null &&
        (lastValidValueIndex === null || value !== data[lastValidValueIndex]);
      if (isValid) {
        if (lastValidValueIndex !== null && lastValidValueIndex !== i - 1) {
          // we found a gap!
          gaps.push({ start: lastValidValueIndex, end: i });
        }
        lastValidValueIndex = i;
      }
    }
    return gaps;
  }

  private smoothWithRollingAverage(
    data: Array<number | null>,
    days = 7,
  ): Array<number | null> {
    const result = [];
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const newValue = data[i];
      if (newValue !== null) {
        sum += newValue;
        count++;
        result.push(sum / count);
      } else {
        result.push(null);
      }

      const oldValue = i < days ? null : data[i - days];
      if (oldValue !== null) {
        sum -= oldValue;
        count--;
      }
    }
    return result;
  }
}
