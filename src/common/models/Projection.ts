import _ from 'lodash';
import moment from 'moment';

import { ActualsTimeseries } from 'api';
import {
  PredictionTimeseriesRow,
  ActualsTimeseriesRow,
  RegionSummaryWithTimeseries,
  Timeseries,
} from 'api/schema/RegionSummaryWithTimeseries';
import { ICUHeadroomInfo, calcICUHeadroom } from './ICUHeadroom';
import { lastValue, indexOfLastValue } from './utils';
import { assert } from 'common/utils';

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
  | 'caseDensityByDeaths'
  | 'caseDensity';

export interface RtRange {
  /** The actual Rt value. */
  rt: number;
  /** The lower-bound of the confidence interval. */
  low: number;
  /** The upper-bound of the confidence interval. */
  high: number;
}

export interface CaseDensityRange {
  caseDensity: number;
  low: number;
  high: number;
}

/**
 * We use use an estimated case fatality ratio of 1 % with lower and upper bounds
 * of 0.5% and 1.5% respectively, used to calculate case density by deaths (main
 * series and range).
 */
// TODO: We were intending to calculate a low/high range for
// caseDensityByDeath, based on a range of CFRs, but this doesn't work when
// we merge with caseDensityByCases which has no range. So for now,
// we are punting.
// const CASE_FATALITY_RATIO_LOWER = 0.005;
// const CASE_FATALITY_RATIO_UPPER = 0.015;
export const CASE_FATALITY_RATIO = 0.01;

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

  readonly icuHeadroomInfo: ICUHeadroomInfo | null;

  readonly currentCumulativeDeaths: number | null;
  readonly currentCumulativeCases: number | null;
  readonly currentContactTracerMetric: number | null;
  readonly stateName: string;
  readonly currentCaseDensity: number | null;
  readonly currentCaseDensityByCases: number | null;
  readonly currentCaseDensityByDeaths: number | null;
  readonly currentDailyDeaths: number | null;

  private readonly cumulativeActualDeaths: Array<number | null>;

  private readonly intervention: string;
  private readonly dates: Date[];
  private readonly isCounty: boolean;

  // NOTE: These are used dynamically by getColumn()
  private readonly hospitalizations: Array<number | null>;
  private readonly beds: Array<number | null>;
  private readonly timeseries: Array<PredictionTimeseriesRow | null>;
  private readonly actualTimeseries: Array<ActualsTimeseriesRow | null>;
  private readonly cumulativeDeaths: Array<number | null>;
  private readonly cumulativeInfected: Array<number | null>;
  private readonly smoothedDailyNegativeTests: Array<number | null>;
  private readonly smoothedDailyPositiveTests: Array<number | null>;
  private readonly smoothedDailyCases: Array<number | null>;
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: Array<number | null>;
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;
  private readonly contractTracers: Array<number | null>;
  private readonly caseDensityByCases: Array<number | null>;
  private readonly caseDensityByDeaths: Array<number | null>;
  private readonly caseDensity: Array<number | null>;
  private readonly smoothedDailyDeaths: Array<number | null>;

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

    const actuals = summaryWithTimeseries.actuals;

    this.timeseries = timeseries;
    this.actualTimeseries = actualTimeseries;
    this.dates = dates;

    const lastUpdated = new Date(summaryWithTimeseries.lastUpdatedDate);
    this.locationName = this.getLocationName(summaryWithTimeseries);
    this.stateName = summaryWithTimeseries.stateName;
    this.intervention = parameters.intervention;
    this.isCounty = parameters.isCounty;
    this.totalPopulation = actuals.population;
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
    const cumulativePositiveTests = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.cumulativePositiveTests),
    );
    const cumulativeNegativeTests = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.cumulativeNegativeTests),
    );
    this.smoothedDailyPositiveTests = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(cumulativePositiveTests),
    );
    this.smoothedDailyNegativeTests = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(cumulativeNegativeTests),
    );

    const cumulativeConfirmedCases = this.smoothCumulatives(
      this.fillLeadingNullsWithZeros(
        actualTimeseries.map(row => row && row.cumulativeConfirmedCases),
      ),
    );
    this.smoothedDailyCases = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(cumulativeConfirmedCases),
    );

    this.cumulativeActualDeaths = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.cumulativeDeaths),
    );
    this.smoothedDailyDeaths = this.smoothWithRollingAverage(
      this.deltasFromCumulatives(this.cumulativeActualDeaths),
    );

    // TODO(https://trello.com/c/sackaas1): Reenable CT counties.
    const disableRt = this.isCounty && this.stateName === 'Connecticut';
    this.rtRange = disableRt ? [null] : this.calcRtRange(timeseries);
    this.testPositiveRate = this.calcTestPositiveRate();

    this.icuHeadroomInfo = calcICUHeadroom(
      this.stateName,
      this.fips,
      this.dates,
      actualTimeseries,
      timeseries,
      actuals,
      lastUpdated,
    );
    this.icuUtilization =
      this.icuHeadroomInfo?.metricSeries || this.dates.map(date => null);

    this.contractTracers = this.calcContactTracers(this.actualTimeseries);

    this.caseDensityByCases = this.calcCaseDensityByCases();
    this.caseDensityByDeaths = this.calcCaseDensityByDeaths();
    this.caseDensity = this.calcCaseDensity();

    this.currentCaseDensityByCases = lastValue(this.caseDensityByCases);
    this.currentCaseDensityByDeaths = lastValue(this.caseDensityByDeaths);
    this.currentCaseDensity = lastValue(this.caseDensity);
    this.currentDailyDeaths = lastValue(this.smoothedDailyDeaths);

    this.fixZeros(this.hospitalizations);
    this.fixZeros(this.cumulativeDeaths);

    const shortageStart =
      summaryWithTimeseries.projections?.totalHospitalBeds?.shortageStartDate ||
      null;
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
    this.currentContactTracerMetric = lastValue(this.contractTracers);
  }

  get currentContactTracers() {
    return (
      CONTACT_TRACER_STATE_OVERRIDES[this.stateName] ||
      lastValue(this.actualTimeseries.map(row => row && row.contactTracers)) ||
      null
    );
  }

  // TODO(michael): We should really pre-compute currentContactTracers and
  // currentDailyAverageCases and make sure we're pulling all of the data from
  // the same day, to make sure it matches the graph.
  get currentDailyAverageCases() {
    return lastValue(this.smoothedDailyCases);
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

  get finalAdditionalDeaths() {
    let projectedCumulativeDeaths: number =
      this.cumulativeDeaths[this.cumulativeDeaths.length - 1] || 0;
    let currentCumulativeDeaths: number =
      lastValue(this.cumulativeActualDeaths) || 0;
    return projectedCumulativeDeaths - currentCumulativeDeaths;
  }

  /** Returns the date when projections end (should be 30 days out). */
  get finalDate(): Date {
    return this.dates[this.dates.length - 1];
  }

  get currentTestPositiveRate(): number | null {
    // Corona Data Scraper is pulling in bogus test data for Washoe County.
    // Just disable for now.
    // TODO(michael): Plumb FIPS in here so this is less fragile.
    if (this.locationName === 'Washoe County, Nevada') {
      return null;
    }

    return lastValue(this.testPositiveRate);
  }

  get rt(): number | null {
    const lastIndex = indexOfLastValue(this.rtRange);
    if (lastIndex !== null && lastIndex >= RT_TRUNCATION_DAYS) {
      const range = this.rtRange[lastIndex - RT_TRUNCATION_DAYS];
      return range === null ? null : range.rt;
    } else {
      return null;
    }
  }

  get hasHospitalProjections(): boolean {
    return lastValue(this.hospitalizations) !== null;
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
      [date: string]: PredictionTimeseriesRow | ActualsTimeseriesRow;
    } = {};
    ts.forEach((row: PredictionTimeseriesRow | ActualsTimeseriesRow) => {
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
    const timeseriesRaw = summaryWithTimeseries.timeseries;
    const actualsTimeseriesRaw = summaryWithTimeseries.actualsTimeseries;
    assert(
      actualsTimeseriesRaw.length > 0,
      `FIPS ${this.fips} missing actuals timeseries!`,
    );
    let earliestDate, latestDate;
    // If we have projections, we use that time range; else we use the actuals.
    if (timeseriesRaw.length > 0) {
      earliestDate = moment.utc(_.first(timeseriesRaw)!.date);
      latestDate = moment.utc(_.last(timeseriesRaw)!.date);
    } else {
      earliestDate = moment.utc(_.first(actualsTimeseriesRaw)!.date);
      latestDate = moment.utc(_.last(actualsTimeseriesRaw)!.date);
    }

    earliestDate = moment.max(earliestDate, moment.utc('2020-03-01'));

    const timeseries: Array<PredictionTimeseriesRow | null> = [];
    const actualsTimeseries: Array<ActualsTimeseriesRow | null> = [];
    const dates: Date[] = [];

    const timeseriesDictionary = this.makeDateDictionary(timeseriesRaw);
    const actualsTimeseriesDictionary = this.makeDateDictionary(
      actualsTimeseriesRaw,
    );

    let currDate = earliestDate.clone();
    while (currDate.diff(latestDate) <= 0) {
      const timeseriesRowForDate = timeseriesDictionary[
        currDate.toString()
      ] as PredictionTimeseriesRow;
      const actualsTimeseriesrowForDate = actualsTimeseriesDictionary[
        currDate.toString()
      ] as ActualsTimeseriesRow;

      timeseries.push(timeseriesRowForDate || null);
      actualsTimeseries.push(actualsTimeseriesrowForDate || null);
      dates.push(currDate.toDate());

      // increment the date by one
      currDate = currDate.clone().add(1, 'days');
    }

    // only keep futureDaysToInclude days ahead of today
    const now = new Date();
    const todayIndex = dates.findIndex(date => date > now);
    const days =
      todayIndex >= 0 ? todayIndex + futureDaysToInclude : dates.length;
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
    return s.countyName ? `${s.countyName}, ${s.stateName}` : s.stateName;
  }

  private calcContactTracers(
    actualTimeseries: Array<ActualsTimeseriesRow | null>,
  ): Array<number | null> {
    return actualTimeseries.map((row, i) => {
      if (row && row.contactTracers) {
        const contactTracers =
          CONTACT_TRACER_STATE_OVERRIDES[this.stateName] || row.contactTracers;
        const cases = this.smoothedDailyCases[i];
        if (cases) {
          return contactTracers / (cases * TRACERS_NEEDED_PER_CASE);
        }
      }

      return null;
    });
  }

  private calcCaseDensityByCases(): Array<number | null> {
    const totalPopulation = this.totalPopulation;
    return this.smoothedDailyCases.map(cases => {
      if (totalPopulation === 0 || cases === null) {
        return null;
      } else {
        return cases / (totalPopulation / 100000);
      }
    });
  }

  private calcCaseDensityByDeaths(): Array<number | null> {
    const totalPopulation = this.totalPopulation;
    return this.smoothedDailyDeaths.map(deaths => {
      if (totalPopulation === 0 || deaths === null) {
        return null;
      } else {
        const estimatedCases = deaths / CASE_FATALITY_RATIO;
        return estimatedCases / (totalPopulation / 100000);
      }
    });
  }

  private calcCaseDensity(): Array<number | null> {
    return this.caseDensityByCases;
  }

  private calcRtRange(
    timeseries: Array<PredictionTimeseriesRow | null>,
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
    let numTailPositivesWithoutNegatives = 0;
    const testPositiveRate = this.smoothedDailyPositiveTests.map(
      (dailyPositive, idx) => {
        const positive = dailyPositive;
        const negative = this.smoothedDailyNegativeTests[idx];
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
      },
    );

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
   *
   * TODO(michael): We might want to impose a maximum gap size (e.g. 10 days)
   * to avoid papering over too much missing data.
   */
  private findGapsInCumulatives(
    data: Array<number | null>,
  ): Array<{ start: number; end: number }> {
    let lastValidValueIndex: number | null = null;
    let lastValidValue = -1;
    const gaps = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const isValid =
        value !== 0 &&
        value !== null &&
        (lastValidValueIndex === null || value !== data[lastValidValueIndex]);
      if (isValid) {
        if (
          lastValidValueIndex !== null &&
          lastValidValueIndex !== i - 1 &&
          value !== lastValidValue + 1
        ) {
          // we found a gap!
          gaps.push({ start: lastValidValueIndex, end: i });
        }
        lastValidValueIndex = i;
        lastValidValue = value!;
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

  private fillLeadingNullsWithZeros(data: Array<number | null>) {
    let nonZeroIndex = _.findIndex(data, v => v !== null);
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (i < nonZeroIndex) {
        result[i] = 0;
      } else {
        result[i] = data[i];
      }
    }
    return result;
  }

  private smoothWithRollingAverage(
    data: Array<number | null>,
    days = 7,
  ): Array<number | null> {
    const result = [];
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const oldValue = i < days ? null : data[i - days];
      if (oldValue !== null) {
        sum -= oldValue;
        count--;
      }

      const newValue = data[i];
      if (newValue !== null) {
        sum += newValue;
        count++;
        result.push(sum / count);
      } else {
        result.push(null);
      }
    }
    return result;
  }
}
