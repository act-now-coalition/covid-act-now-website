import _ from 'lodash';
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
 * We truncate our projections to 4 weeks out.
 */
export const PROJECTIONS_TRUNCATION_DAYS = 30;

/**
 * We will assume roughly 5 tracers are needed to trace a case within 48h.
 * The range we give here could be between 5-15 contact tracers per case.
 */
export const TRACERS_NEEDED_PER_CASE = 5;

/**
 * We subtract this "decomp" factor from the typical ICU Utilization rates we
 * get from the API to account for hospitals being able to decrease their utilization
 * (by cancelling elective surgeries, using surge capacity, etc.).
 */
const ICU_DECOMP_FACTOR = 0.21;
const ICU_DECOMP_FACTOR_STATE_OVERRIDES: { [key: string]: number } = {
  Alabama: 0.15,
  Arizona: 0,
  Delaware: 0.3,
  'District of Columbia': 0.025,
  Georgia: 0.1,
  Mississippi: 0.12,
  Nevada: 0.25,
  'Rhode Island': 0,
};

const DEFAULT_UTILIZATION = 0.75;

/**
 * We override the contact tracing for specific states due to data inconsistincies.
 * Ideally we would fix this in either the original data source or in the API level,
 * but for now, check if the state is in the dictionary and return the constant
 * value for the time being.
 * TODO: Revert this to use the API data once it's more valid
 */
const CONTACT_TRACER_STATE_OVERRIDES: { [key: string]: number } = {};

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
  | 'testPositiveRate'
  | 'contractTracers'
  | 'caseDensityByCases'
  | 'caseDensityByDeaths';

export interface RtRange {
  /** The actual Rt value. */
  rt: number;
  /** The lower-bound of the confidence interval. */
  low: number;
  /** The upper-bound of the confidence interval. */
  high: number;
}

const estimatedCaseFatalityRatio = 0.01; // 1% of cases expected to turn into deaths, used in calcCaseDensityByDeaths

/**
 * Represents a single projection for a given state or county.  Contains a
 * time-series of things like hospitalizations, hospital capacity, infections, etc.
 */
export class Projection {
  readonly locationName: string;
  readonly totalPopulation: number;
  readonly finalHospitalBeds: number;
  readonly fips: string;
  readonly dateOverwhelmed: Date | null;
  readonly totalICUCapacity: number | null;
  readonly typicallyFreeICUCapacity: number | null;
  readonly currentCovidICUPatients: number | null;
  readonly typicalICUUtilization: number;
  readonly icuNearCapacityOverride: boolean;
  readonly currentCumulativeDeaths: number | null;
  readonly currentCumulativeCases: number | null;
  readonly currentContactTracerMetric: number | null;
  readonly stateName: string;
  readonly dailyPositiveTests: Array<number | null>;
  readonly currentCaseDensityByCases: number | null;
  readonly currentCaseDensityByDeaths: number | null;

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
  private readonly dailyNegativeTests: Array<number | null>;
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: Array<number | null>;
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;
  private readonly contractTracers: Array<number | null>;
  private readonly caseDensityByCases: Array<number | null>;
  private readonly caseDensityByDeaths: Array<number | null>;
  private readonly dailyDeaths: Array<number | null>;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const {
      timeseries,
      actualTimeseries,
      dates,
    } = this.getAlignedTimeseriesAndDates(
      summaryWithTimeseries,
      PROJECTIONS_TRUNCATION_DAYS,
    );

    this.timeseries = timeseries;
    this.actualTimeseries = actualTimeseries;
    this.dates = dates;

    const lastUpdated = new Date(summaryWithTimeseries.lastUpdatedDate);
    this.locationName = this.getLocationName(summaryWithTimeseries);
    this.stateName = summaryWithTimeseries.stateName;
    this.intervention = parameters.intervention;
    this.isCounty = parameters.isCounty;
    this.totalPopulation = summaryWithTimeseries.actuals.population;
    this.fips = summaryWithTimeseries.fips;

    // Set up our series data exposed via getDataset().
    this.hospitalizations = timeseries.map(
      row => row && row.hospitalBedsRequired,
    );
    this.beds = timeseries.map(row => row && row.hospitalBedCapacity);
    this.finalHospitalBeds = this.beds[this.beds.length - 1]!;
    this.cumulativeDeaths = timeseries.map(row => row && row.cumulativeDeaths);
    this.cumulativeInfected = timeseries.map(
      row => row && row.cumulativeInfected,
    );
    this.cumulativePositiveTests = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.cumulativePositiveTests),
    );
    this.cumulativeNegativeTests = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.cumulativeNegativeTests),
    );
    this.dailyPositiveTests = this.deltasFromCumulatives(
      this.cumulativePositiveTests,
    );
    this.dailyNegativeTests = this.deltasFromCumulatives(
      this.cumulativeNegativeTests,
    );

    const cumulativeActualDeaths = this.smoothCumulatives(
      actualTimeseries.map(row => row?.cumulativeDeaths || null),
    );
    this.dailyDeaths = this.deltasFromCumulatives(cumulativeActualDeaths);

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

    // We sometimes need to override the ICU metric for locations due to bad data, etc.
    // TODO(https://trello.com/c/CPcYKmdo/): Review once we have better estimates for
    // these counties
    const overrideIcu =
      [
        '01101', // Montgomery, AL
        '48201', // Harris, TX
      ].indexOf(this.fips) > -1;
    this.icuUtilization = overrideIcu
      ? actualTimeseries.map(row => 0.9) // 90% utilized
      : this.calcICUHeadroom(this.actualTimeseries, timeseries, lastUpdated);
    this.icuNearCapacityOverride = overrideIcu;

    this.contractTracers = this.calcContactTracers(this.actualTimeseries);

    this.caseDensityByCases = this.calcCaseDensityByCases();
    this.caseDensityByDeaths = this.calcCaseDensityByDeaths();

    this.currentCaseDensityByCases = this.lastValue(this.caseDensityByCases);
    this.currentCaseDensityByDeaths = this.lastValue(this.caseDensityByDeaths);

    this.fixZeros(this.hospitalizations);
    this.fixZeros(this.cumulativeDeaths);

    const shortageStart =
      summaryWithTimeseries.projections.totalHospitalBeds.shortageStartDate;
    this.dateOverwhelmed =
      shortageStart === null ? null : new Date(shortageStart);
    if (
      moment(this.dateOverwhelmed).diff(moment(), 'days') >
      PROJECTIONS_TRUNCATION_DAYS
    ) {
      this.dateOverwhelmed = null;
    }

    this.currentCumulativeDeaths =
      summaryWithTimeseries.actuals.cumulativeDeaths;
    this.currentCumulativeCases =
      summaryWithTimeseries.actuals.cumulativeConfirmedCases;
    this.currentContactTracerMetric = this.lastValue(this.contractTracers);
  }

  get currentContactTracers() {
    return (
      CONTACT_TRACER_STATE_OVERRIDES[this.stateName] ||
      this.lastValue(
        this.actualTimeseries.map(row => row && row.contactTracers),
      ) ||
      null
    );
  }
  /**
   * If one of the most recent days has any data for all of:
   *   - currentUsageCovid
   *   - totalCapacity
   *   - currentUsageTotal
   * Then we want to use the actual timeseries for them
   */
  get hasActualData() {
    // TODO(https://trello.com/c/qW1dJ1um/): Reenable actuals once we get Valorum
    // data fixed?
    /*
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
    */
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

  get nonCovidICUUtilization(): number {
    if (this.stateName in ICU_DECOMP_FACTOR_STATE_OVERRIDES) {
      return Math.max(
        0,
        this.typicalICUUtilization -
          ICU_DECOMP_FACTOR_STATE_OVERRIDES[this.stateName],
      );
    } else {
      return Math.max(0, this.typicalICUUtilization - ICU_DECOMP_FACTOR);
    }
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
    return this.totalICUCapacity! * this.nonCovidICUUtilization;
  }

  /** Returns the date when projections end (should be 30 days out). */
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
    futureDaysToInclude: number,
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

    // only keep futureDaysToInclude days ahead of today
    const now = new Date();
    const days = dates.findIndex(date => date > now) + futureDaysToInclude;
    return {
      timeseries: timeseries.slice(0, days),
      actualTimeseries: actualsTimeseries.slice(0, days),
      dates: dates.slice(0, days),
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

  /**
   * Gets the cases/day on day i, by averaging the trailing week of cases/day
   * data.
   *
   * Note: In the case of a data point with negative cases/day (can happen due
   * to reporting weirdness), we skip that data point and may average fewer
   * than 7 days worth of data.
   */

  getWeeklyAverageForDay(data: Array<number | null>, i?: number) {
    const lastIndex = this.indexOfLastValue(data);
    if (i === undefined) {
      if (!lastIndex) return null;
      i = lastIndex;
    } else if (lastIndex === null || i > lastIndex) {
      return null;
    }
    // Get last week of sane data (ignore negative values)
    const lastWeekOfPositives = _.filter(
      data.slice(Math.max(0, i - 6), i + 1),
      p => p !== null && p >= 0,
    );
    return _.mean(lastWeekOfPositives);
  }

  private calcContactTracers(
    actualTimeseries: Array<CANActualsTimeseriesRow | null>,
  ): Array<number | null> {
    // use date.getWeek() to get the week number
    return actualTimeseries.map(
      (row: CANActualsTimeseriesRow | null, i: number) => {
        if (row && row.contactTracers) {
          const contactTracers =
            CONTACT_TRACER_STATE_OVERRIDES[this.stateName] ||
            row.contactTracers;
          const weeklyAverage = this.getWeeklyAverageForDay(
            this.dailyPositiveTests,
            i,
          );

          if (weeklyAverage) {
            return contactTracers / (weeklyAverage * TRACERS_NEEDED_PER_CASE);
          }
        }

        return null;
      },
    );
  }

  private calcCaseDensityByCases(): Array<number | null> {
    const caseDensityByCases = [];
    const totalPopulation = this.totalPopulation;
    for (let i = 0; i < this.dates.length; i++) {
      const weeklyAverage = this.getWeeklyAverageForDay(
        this.dailyPositiveTests,
        i,
      );
      if (totalPopulation === 0 || weeklyAverage === null) {
        caseDensityByCases.push(null);
      } else {
        const val = weeklyAverage / (totalPopulation / 100000);
        caseDensityByCases.push(val);
      }
    }
    return caseDensityByCases;
  }

  private calcCaseDensityByDeaths(): Array<number | null> {
    const caseDensityByDeaths = [];
    const totalPopulation = this.totalPopulation;
    for (let i = 0; i < this.dates.length; i++) {
      const weeklyAverage = this.getWeeklyAverageForDay(this.dailyDeaths, i);
      if (totalPopulation === 0 || weeklyAverage === null) {
        caseDensityByDeaths.push(null);
      } else {
        const estimatedCases = weeklyAverage / estimatedCaseFatalityRatio;
        const val = estimatedCases / (totalPopulation / 100000);
        caseDensityByDeaths.push(val);
      }
    }
    return caseDensityByDeaths;
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
      this.dailyPositiveTests,
    );
    const dailyNegatives = this.smoothWithRollingAverage(
      this.dailyNegativeTests,
    );

    let numTailPositivesWithoutNegatives = 0;
    const testPositiveRate = dailyPositives.map((dailyPositive, idx) => {
      const positive = dailyPositive;
      const negative = dailyNegatives[idx];
      // If there are no negatives (but there are positives), then this is
      // likely the last data point, else it would have gotten smoothed, and
      // it's probably a reporting lag issue. So just return null.
      if (negative !== null && positive !== null && negative > 0) {
        numTailPositivesWithoutNegatives = 0;
        return positive / (negative + positive);
      } else {
        if (positive !== null && (negative === null || negative === 0)) {
          numTailPositivesWithoutNegatives += 1;
        }
        return null;
      }
    });

    // if we've stopped getting testing data more than a week ago, don't report a metric
    if (numTailPositivesWithoutNegatives > 7 /* one week */) {
      return [];
    } else {
      return testPositiveRate;
    }
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
        if (current - lastNonNull < 0) {
          // Sometimes series have a "correction" that resets the count
          // backwards. We treat that as a 'null' delta. Note: They could also
          // have a correction in the opposite direction, forcing an unusually
          // high delta, but we don't have a way to detect / handle that. :-(
          result.push(null);
        } else {
          result.push(current - lastNonNull);
        }
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
          row.ICUBedsInUse !== null
        ) {
          const predictedNonCovidPatientsAtDate =
            this.totalICUCapacity! * this.nonCovidICUUtilization;

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
