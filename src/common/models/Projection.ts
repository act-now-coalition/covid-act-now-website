import moment from 'moment';

import {
  RegionSummaryWithTimeseries,
  Timeseries,
  ActualsTimeseries,
} from 'api';
import {
  CANPredictionTimeseriesRow,
  CANActualsTimeseriesRow,
} from 'api/schema/CovidActNowStatesTimeseries';

/**
 * We truncate (or in the case of charts, switch to a dashed line) the last
 * seven days of r(t) data because it is susceptible to continued change as we
 * get future data points.
 */
export const RT_TRUNCATION_DAYS = 7;

/**
 * We subtract this "decomp" factor from the typical ICU Utilization rates we
 * get from the API to account for hospitals being able to decrease their utilization
 * (by cancelling elective surgeries, using surge capacity, etc.).
 */
const ICU_DECOMP_FACTOR = 0.3;
const DEFAULT_UTILIZATION = 0.75;

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
  intervention: string;
  isCounty: boolean;
}

export interface Column {
  x: number; // ms since epoch
  y: any;
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
 */
export class Projection {
  readonly locationName: string;
  readonly totalPopulation: number;
  readonly dateOverwhelmed: Date | null;
  readonly totalICUCapacity: number | null;
  readonly typicallyFreeICUCapacity: number | null;
  readonly currentCovidICUPatients: number | null;
  readonly typicalICUUtilization: number;
  readonly currentCumulativeDeaths: number | null;
  readonly currentCumulativeCases: number | null;
  readonly stateName: string;

  private readonly intervention: string;
  private readonly dates: Date[];
  private readonly isCounty: boolean;

  // NOTE: These are used dynamically by getColumn()
  private readonly hospitalizations: Array<number | null>;
  private readonly beds: Array<number | null>;
  private readonly timeseries: Array<CANPredictionTimeseriesRow | null>;
  private readonly actualTimeseries: Array<CANActualsTimeseriesRow | null>;
  private readonly cumulativeDeaths: Array<number | null>;
  private readonly cumulativeInfected: Array<number | null>;
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
    const {
      timeseries,
      actualsTimeseries,
      dates,
    } = this.getAlignedTimeseriesAndDates(summaryWithTimeseries);
    this.timeseries = timeseries;
    this.actualTimeseries = actualsTimeseries;
    this.dates = dates;

    const lastUpdated = new Date(summaryWithTimeseries.lastUpdatedDate);
    this.locationName = this.getLocationName(summaryWithTimeseries);
    this.stateName = summaryWithTimeseries.stateName;
    this.intervention = parameters.intervention;
    this.isCounty = parameters.isCounty;
    this.totalPopulation = summaryWithTimeseries.actuals.population;

    // Set up our series data exposed via getDataset().
    this.hospitalizations = timeseries.map(
      row => row && row.hospitalBedsRequired,
    );
    this.beds = timeseries.map(row => row && row.hospitalBedCapacity);
    this.cumulativeDeaths = timeseries.map(row => row && row.cumulativeDeaths);
    this.cumulativeInfected = timeseries.map(
      row => row && row.cumulativeInfected,
    );
    this.cumulativePositiveTests = this.smoothCumulatives(
      timeseries.map(row => row && row.cumulativePositiveTests),
    );
    this.cumulativeNegativeTests = this.smoothCumulatives(
      timeseries.map(row => row && row.cumulativeNegativeTests),
    );
    this.rtRange = this.calcRtRange(timeseries);
    this.testPositiveRate = this.calcTestPositiveRate();

    const ICUBeds = summaryWithTimeseries?.actuals?.ICUBeds;
    this.totalICUCapacity = ICUBeds && ICUBeds.totalCapacity;
    this.typicalICUUtilization =
      ICUBeds?.typicalUsageRate || DEFAULT_UTILIZATION;
    this.typicallyFreeICUCapacity =
      ICUBeds && ICUBeds.capacity * (1 - ICUBeds.typicalUsageRate);
    this.currentCovidICUPatients = this.calcCurrentCovidICUPatients(
      timeseries,
      lastUpdated,
    );

    // We have in the past disabled states due to bad data. We can do that
    // by flipping this flag. If we don't use this
    const disableIcu = false; //summaryWithTimeseries.stateName === 'BadState';
    this.icuUtilization = disableIcu
      ? [null]
      : this.calcICUHeadroom(this.actualTimeseries, timeseries, lastUpdated);

    this.fixZeros(this.hospitalizations);
    this.fixZeros(this.cumulativeDeaths);

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);

    this.currentCumulativeDeaths =
      summaryWithTimeseries.actuals.cumulativeDeaths;
    this.currentCumulativeCases =
      summaryWithTimeseries.actuals.cumulativeConfirmedCases;
  }

  /**
   * If one of the most recent days has any data for all of:
   *   - currentUsageCovid
   *   - totalCapacity
   *   - currentUsageTotal
   * Then we want to use the actual timeseries for them
   */
  get hasActualData() {
    for (var i = 0; i < this.actualTimeseries.length; i++) {
      const actual = this.actualTimeseries[i];
      if (
        actual &&
        actual.ICUBeds.currentUsageCovid &&
        actual.ICUBeds.totalCapacity &&
        actual.ICUBeds.currentUsageTotal
      ) {
        return true;
      }
    }
    return false;
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

  get nonCovidPatients() {
    if (this.hasActualData) {
      const latestCurrentUssage = this.lastValue(
        this.actualTimeseries.map(row => row && row.ICUBeds.currentUsageTotal),
      );
      const latestUsageCovid = this.lastValue(
        this.actualTimeseries.map(row => row && row.ICUBeds.currentUsageCovid),
      );
      return latestCurrentUssage! - latestUsageCovid!;
    }
    return (
      this.totalICUCapacity! *
      Math.max(0, this.typicalICUUtilization - ICU_DECOMP_FACTOR)
    );
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

  get currentTestPositiveRate(): number | null {
    // Corona Data Scraper is pulling in bogus test data for Washoe County.
    // Just disable for now.
    // TODO(michael): Plumb FIPS in here so this is less fragile.
    if (this.locationName === 'Washoe County, Nevada') {
      return null;
    }

    return this.lastValue(this.testPositiveRate);
  }

  get currentIcuUtilization(): number | null {
    return this.lastValue(this.icuUtilization);
  }

  get rt(): number | null {
    const lastIndex = this.indexOfLastValue(this.rtRange);
    if (lastIndex !== null && lastIndex >= RT_TRUNCATION_DAYS) {
      const range = this.rtRange[lastIndex - RT_TRUNCATION_DAYS];
      return range === null ? null : range.rt;
    } else {
      return null;
    }
  }

  private getColumn(columnName: string): Column[] {
    return this.dates.map((date, idx) => ({
      x: date.getTime(),
      y: (this as any)[columnName][idx],
    }));
  }

  getDataset(dataset: DatasetId): Column[] {
    return this.getColumn(dataset);
  }

  /** Makes a dictionary from a timerseries to a row so that we can look up the values
   * based off the date. Eventually would be nice to use this around instead of the
   * two list scenario we have going right now.
   */
  private makeDateDictionary(ts: Timeseries | ActualsTimeseries) {
    const dict: {
      [date: string]: CANPredictionTimeseriesRow | CANActualsTimeseriesRow;
    } = {};
    ts.forEach((row: CANPredictionTimeseriesRow | CANActualsTimeseriesRow) => {
      const ts_date = moment.utc(row.date).toString();
      dict[ts_date] = row;
    });
    return dict;
  }

  /** getAlignedTimeseriesAndDates aligns all timeseries (both the actuals and predicted
   * timeseries) as well as the dates to be consistent (since we keep track of
   * three lists).
   *
   * In order to this grab the earliest and latest dates from the
   * timeseries and for every single day in between them fill the each array
   * (the dates, the actuals and the timeseres(predicted)) with the value at
   * that date or null.
   */
  private getAlignedTimeseriesAndDates(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
  ) {
    const earliestDate = moment.min(
      summaryWithTimeseries.timeseries.map(row => moment.utc(row.date)),
    );
    const latestDate = moment.max(
      summaryWithTimeseries.timeseries.map(row => moment.utc(row.date)),
    );

    const timeseries: Array<CANPredictionTimeseriesRow | null> = [];
    const actualsTimeseries: Array<CANActualsTimeseriesRow | null> = [];
    const dates: Date[] = [];

    const timeseriesDictionary = this.makeDateDictionary(
      summaryWithTimeseries.timeseries,
    );
    const actualsTimeseriesDictionary = this.makeDateDictionary(
      summaryWithTimeseries.actualsTimeseries,
    );

    let currDate = earliestDate.clone();
    while (currDate.diff(latestDate) <= 0) {
      const timeseriesRowForDate = timeseriesDictionary[
        currDate.toString()
      ] as CANPredictionTimeseriesRow;
      const actualsTimeseriesrowForDate = actualsTimeseriesDictionary[
        currDate.toString()
      ] as CANActualsTimeseriesRow;

      timeseries.push(timeseriesRowForDate || null);
      actualsTimeseries.push(actualsTimeseriesrowForDate || null);
      dates.push(currDate.toDate());

      // increment the date by one
      currDate = currDate.clone().add(1, 'days');
    }

    return {
      timeseries,
      actualsTimeseries,
      dates,
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

  private calcRtRange(
    timeseries: Array<CANPredictionTimeseriesRow | null>,
  ): Array<RtRange | null> {
    const rtSeriesRaw = timeseries.map(row => row && row.RtIndicator);
    const rtCiSeriesRaw = timeseries.map(row => row && row.RtIndicatorCI90);

    // This hides small gaps (less than 2 data points) in the rt series to make
    // it more visually appealing without making up large amounts of data.
    // TODO(michael): Remove this if we fix it in the model / API.
    // https://github.com/covid-projections/covid-data-model/issues/340
    const rtSeries = this.interpolateNullGaps(rtSeriesRaw, /*maxGap=*/ 2);
    const rtCiSeries = this.interpolateNullGaps(rtCiSeriesRaw, /*maxGap=*/ 2);

    return rtSeries.map((rt, idx) => {
      const ci = rtCiSeries[idx];
      if (rt !== null && ci !== null) {
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

  private calcICUHeadroom(
    actualTimeseries: Array<CANActualsTimeseriesRow | null>,
    timeseries: Array<CANPredictionTimeseriesRow | null>,
    lastUpdated: Date,
  ): Array<number | null> {
    let icuUtilization;

    if (this.hasActualData) {
      icuUtilization = actualTimeseries.map(row => {
        if (
          row &&
          row.ICUBeds.currentUsageCovid !== null &&
          row.ICUBeds.totalCapacity !== null &&
          row.ICUBeds.currentUsageTotal !== null
        ) {
          const nonCovidPatientsAtDate =
            row.ICUBeds.currentUsageTotal - row.ICUBeds.currentUsageCovid;
          if (row.ICUBeds.currentUsageCovid === 0) return 0;
          const icuHeadroomUsed =
            row.ICUBeds.currentUsageCovid /
            (row.ICUBeds.totalCapacity - nonCovidPatientsAtDate);
          // TODO: This metric needs to go to the chart eventually
          return Math.min(1, icuHeadroomUsed);
        } else {
          return null;
        }
      });
    } else {
      icuUtilization = timeseries.map(row => {
        if (
          row &&
          this.totalICUCapacity &&
          this.totalICUCapacity > 0 &&
          row.ICUBedsInUse > 0
        ) {
          const predictedNonCovidPatientsAtDate =
            this.totalICUCapacity! *
            Math.max(0, this.typicalICUUtilization - ICU_DECOMP_FACTOR);

          const icuHeadroomUsed =
            row.ICUBedsInUse /
            (this.totalICUCapacity - predictedNonCovidPatientsAtDate);
          // TODO: This metric needs to go to the chart eventually
          return Math.min(1, icuHeadroomUsed);
        } else {
          return null;
        }
      });
    }
    // Strip off the future projections.
    // TODO(michael): I'm worried about an off-by-one here. I _think_ we usually
    // update our projections using yesterday's data. So we want to strip
    // everything >= lastUpdatedDate. But since the ICU data is all estimates, I
    // can't really validate that's correct.
    return this.omitDataAtOrAfterDate(icuUtilization, lastUpdated);
  }

  private calcCurrentCovidICUPatients(
    timeseries: Array<CANPredictionTimeseriesRow | null>,
    lastUpdated: Date,
  ): number | null {
    /** This is specifically current icu patients with covid */
    let icuPatients;
    if (this.hasActualData) {
      icuPatients = this.omitDataAtOrAfterDate(
        this.actualTimeseries.map(row => row && row.ICUBeds.currentUsageCovid),
        lastUpdated,
      );
    } else {
      icuPatients = this.omitDataAtOrAfterDate(
        timeseries.map(row => row && row.ICUBedsInUse),
        lastUpdated,
      );
    }

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
  private fixZeros(data: (number | null)[]) {
    for (let i = 1; i < data.length - 1; i++) {
      if (
        (data[i] === null || data[i] === 0) &&
        data[i - 1] !== 0 &&
        data[i - 1] !== null &&
        data[i + 1] !== 0 &&
        data[i + 1] !== null
      ) {
        data[i] = (data[i - 1]! + data[i + 1]!) / 2;
      }
    }
  }

  private indexOfLastValue<T>(data: Array<T | null>): number | null {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] !== null && data[i] !== undefined) {
        return i;
      }
    }
    return null;
  }

  private lastValue<T>(data: Array<T | null>): T | null {
    const i = this.indexOfLastValue(data);
    return i === null ? null : data[i]!;
  }

  private interpolateNullGaps(data: Array<number | null>, maxGap: number) {
    const gaps = this.findNullGaps(data).filter(({ start, end }) => {
      const length = end - start - 1;
      return length <= maxGap;
    });

    return this.interpolateRanges(data, gaps);
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

  /**
   * Given a series of data points, finds any "gaps" where data is `null`.
   *
   * The returned {start, end} tuples are the indices of the entries surrounding each gap.
   *
   * Any `null` data points at the beginning or end of the data are not considered a gap.
   */
  private findNullGaps(
    data: Array<number | null>,
  ): Array<{ start: number; end: number }> {
    let lastValidValueIndex: number | null = null;
    const gaps = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (value !== null) {
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
