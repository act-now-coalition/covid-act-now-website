import _ from 'lodash';
import moment from 'moment';

import { ActualsTimeseries } from 'api';
import {
  ActualsTimeseriesRow,
  RegionSummaryWithTimeseries,
  MetricsTimeseriesRow,
  Metricstimeseries,
  Metrics,
} from 'api/schema/RegionSummaryWithTimeseries';
import { ICUHeadroomInfo, calcICUHeadroom } from './ICUHeadroom';
import { lastValue } from './utils';

/** Stores a list of FIPS or FIPS regex patterns to disable. */
class DisabledFips {
  constructor(private fipsPatterns: (string | RegExp)[]) {}

  includes(fips: string): boolean {
    return _.some(this.fipsPatterns, pattern => {
      if (typeof pattern === 'string') {
        return pattern === fips;
      } else {
        return pattern.test(fips);
      }
    });
  }
}

const DISABLED_CASE_DENSITY: string[] = [];

const DISABLED_INFECTION_RATE = new DisabledFips([]);

const DISABLED_TEST_POSITIVITY = new DisabledFips([
  '48113',
  '48215',
  '51', // https://trello.com/c/wW18WA48/660-virginia-test-positivity-incorrect-at-0-hhs-test-positivity-data-suspect
]);

const DISABLED_ICU = new DisabledFips([
  '47', // https://trello.com/c/aEd07i5Y/701-disabled-tn-icu-headroom
]);

const DISABLED_CONTACT_TRACING = new DisabledFips([]);

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

/** Parameters that can be provided when constructing a Projection. */
export interface ProjectionParameters {
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
  | 'rtRange'
  | 'icuUtilization'
  | 'testPositiveRate'
  | 'contractTracers'
  | 'caseDensityByCases'
  | 'caseDensityRange'
  | 'smoothedDailyCases'
  | 'smoothedDailyDeaths'
  | 'rawDailyCases'
  | 'rawDailyDeaths'
  | 'rawHospitalizations'
  | 'smoothedHospitalizations'
  | 'rawICUHospitalizations'
  | 'smoothedICUHospitalizations';

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
  newCases: number | null;
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
  readonly totalPopulation: number;
  readonly fips: string;

  readonly icuHeadroomInfo: ICUHeadroomInfo | null;

  readonly currentCumulativeDeaths: number | null;
  readonly currentCumulativeCases: number | null;
  readonly currentContactTracerMetric: number | null;
  readonly stateCode: string;
  readonly currentCaseDensity: number | null;
  readonly currentDailyDeaths: number | null;

  private readonly cumulativeActualDeaths: Array<number | null>;

  private readonly dates: Date[];
  private readonly isCounty: boolean;

  // NOTE: These are used dynamically by getColumn()
  private readonly actualTimeseries: Array<ActualsTimeseriesRow | null>;
  private readonly smoothedDailyCases: Array<number | null>;
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: Array<number | null>;
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;
  private readonly contractTracers: Array<number | null>;
  private readonly caseDensityByCases: Array<number | null>;
  private readonly caseDensityRange: Array<CaseDensityRange | null>;
  private readonly smoothedDailyDeaths: Array<number | null>;

  private readonly rawDailyCases: Array<number | null>;
  private readonly rawDailyDeaths: Array<number | null>;
  private readonly rawHospitalizations: Array<number | null>;
  private readonly smoothedHospitalizations: Array<number | null>;
  private readonly rawICUHospitalizations: Array<number | null>;
  private readonly smoothedICUHospitalizations: Array<number | null>;
  private readonly metrics: Metrics | null;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
  ) {
    const {
      actualTimeseries,
      metricsTimeseries,
      dates,
    } = this.getAlignedTimeseriesAndDates(
      summaryWithTimeseries,
      PROJECTIONS_TRUNCATION_DAYS,
    );
    const metrics = summaryWithTimeseries.metrics;
    const actuals = summaryWithTimeseries.actuals;

    this.metrics = metrics || null;
    this.actualTimeseries = actualTimeseries;
    this.dates = dates;

    this.stateCode = summaryWithTimeseries.state;
    this.isCounty = parameters.isCounty;
    this.totalPopulation = summaryWithTimeseries.population;
    this.fips = summaryWithTimeseries.fips;

    // Set up our series data exposed via getDataset().
    this.rawDailyCases = this.actualTimeseries.map(row => row && row.newCases);
    this.smoothedDailyCases = this.smoothWithRollingAverage(this.rawDailyCases);

    this.rawDailyDeaths = this.deltasFromCumulatives(
      this.fillLeadingNullsWithZeros(
        actualTimeseries.map(row => row && row.deaths),
      ),
    );
    this.smoothedDailyDeaths = this.smoothWithRollingAverage(
      this.rawDailyDeaths,
    );

    // TODO(https://trello.com/c/B6Z1kW8o/): Fix Tennessee Hospitalization data.
    const hospitalizationsDisabled =
      this.fips.length > 2 && this.fips.slice(0, 2) === '47';

    this.rawHospitalizations = hospitalizationsDisabled
      ? []
      : actualTimeseries.map(row => row && row.hospitalBeds.currentUsageCovid);
    this.smoothedHospitalizations = this.smoothWithRollingAverage(
      this.rawHospitalizations,
    );
    this.rawICUHospitalizations = actualTimeseries.map(row =>
      row?.icuBeds ? row.icuBeds.currentUsageCovid : null,
    );
    this.smoothedICUHospitalizations = this.smoothWithRollingAverage(
      this.rawICUHospitalizations,
    );

    this.cumulativeActualDeaths = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.deaths),
    );

    const disableRt = false;
    this.rtRange = disableRt ? [null] : this.calcRtRange(metricsTimeseries);
    this.testPositiveRate = metricsTimeseries.map(
      row => row && row.testPositivityRatio,
    );

    if (metrics && !DISABLED_ICU.includes(this.fips)) {
      this.icuHeadroomInfo = calcICUHeadroom(
        this.fips,
        actualTimeseries,
        metricsTimeseries,
        metrics,
        actuals,
      );
    } else {
      this.icuHeadroomInfo = null;
    }
    this.icuUtilization =
      this.icuHeadroomInfo?.metricSeries || this.dates.map(date => null);

    this.contractTracers = metricsTimeseries.map(
      row => row && row.contactTracerCapacityRatio,
    );

    this.caseDensityByCases = metricsTimeseries.map(
      row => row && row.caseDensity,
    );
    this.caseDensityRange = this.calcCaseDensityRange();

    this.currentCaseDensity =
      metrics && !DISABLED_CASE_DENSITY.includes(this.fips)
        ? metrics.caseDensity
        : null;
    this.currentDailyDeaths = lastValue(this.smoothedDailyDeaths);

    this.currentCumulativeDeaths = summaryWithTimeseries.actuals.deaths;
    this.currentCumulativeCases = summaryWithTimeseries.actuals.cases;
    this.currentContactTracerMetric =
      metrics && !DISABLED_CONTACT_TRACING.includes(this.fips)
        ? metrics.contactTracerCapacityRatio
        : null;
  }

  get currentContactTracers() {
    return lastValue(
      this.actualTimeseries.map(row => row && row.contactTracers),
    );
  }

  // TODO(michael): We should really pre-compute currentContactTracers and
  // currentDailyAverageCases and make sure we're pulling all of the data from
  // the same day, to make sure it matches the graph.
  get currentDailyAverageCases() {
    return lastValue(this.smoothedDailyCases);
  }

  /** Returns the date when projections end (should be 30 days out). */
  get finalDate(): Date {
    return this.dates[this.dates.length - 1];
  }

  get currentTestPositiveRate(): number | null {
    if (DISABLED_TEST_POSITIVITY.includes(this.fips)) {
      return null;
    }

    return this.metrics && this.metrics.testPositivityRatio;
  }

  get testPositiveRateSource(): string | null {
    return this.metrics?.testPositivityRatioDetails?.source || null;
  }

  get rt(): number | null {
    if (DISABLED_INFECTION_RATE.includes(this.fips)) {
      return null;
    }

    return this.metrics && this.metrics.infectionRate;
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
  private makeDateDictionary(ts: ActualsTimeseries | Metricstimeseries) {
    const dict: {
      [date: string]: ActualsTimeseriesRow | MetricsTimeseriesRow;
    } = {};
    ts.forEach((row: ActualsTimeseriesRow | MetricsTimeseriesRow) => {
      dict[row.date] = row;
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
    const actualsTimeseriesRaw = summaryWithTimeseries.actualsTimeseries;
    const metricsTimeseriesRaw = summaryWithTimeseries.metricsTimeseries || [];
    if (actualsTimeseriesRaw.length === 0) {
      return {
        actualTimeseries: [],
        metricsTimeseries: [],
        dates: [],
      };
    }
    let earliestDate, latestDate;
    // If we have projections, we use that time range; else we use the actuals.
    // TODO(chris): Is there a reason that this was bound to the projections timeseries first?
    // It cuts off some of the earlier dates
    if (metricsTimeseriesRaw.length > 0) {
      earliestDate = moment.utc(_.first(metricsTimeseriesRaw)!.date);
      latestDate = moment.utc(_.last(metricsTimeseriesRaw)!.date);
    } else {
      earliestDate = moment.utc(_.first(actualsTimeseriesRaw)!.date);
      latestDate = moment.utc(_.last(actualsTimeseriesRaw)!.date);
    }

    earliestDate = moment.utc('2020-03-01');

    const actualsTimeseries: Array<ActualsTimeseriesRow | null> = [];
    const metricsTimeseries: Array<MetricsTimeseriesRow | null> = [];
    const dates: Date[] = [];

    const actualsTimeseriesDictionary = this.makeDateDictionary(
      actualsTimeseriesRaw,
    );
    const metricsTimeseriesDictionary = this.makeDateDictionary(
      metricsTimeseriesRaw,
    );

    let currDate = earliestDate.clone();
    while (currDate.diff(latestDate) <= 0) {
      const ts = currDate.format('YYYY-MM-DD');
      const actualsTimeseriesrowForDate = actualsTimeseriesDictionary[
        ts
      ] as ActualsTimeseriesRow;
      const metricsTimeseriesRowForDate = metricsTimeseriesDictionary[
        ts
      ] as MetricsTimeseriesRow;
      actualsTimeseries.push(actualsTimeseriesrowForDate || null);
      metricsTimeseries.push(metricsTimeseriesRowForDate || null);
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
      actualTimeseries: actualsTimeseries.slice(0, days),
      metricsTimeseries: metricsTimeseries.slice(0, days),
      dates: dates.slice(0, days),
    };
  }

  private calcCaseDensityRange(): Array<CaseDensityRange | null> {
    return this.caseDensityByCases.map((caseDensity, indx, arr) =>
      caseDensity === null
        ? null
        : {
            caseDensity: caseDensity,
            newCases: this.smoothedDailyCases[indx],
            low: caseDensity,
            high: caseDensity,
          },
    );
  }

  private calcRtRange(
    timeseries: Array<MetricsTimeseriesRow | null>,
  ): Array<RtRange | null> {
    const rtSeries = timeseries.map(row => row && row.infectionRate);
    const rtCiSeries = timeseries.map(row => row && row.infectionRateCI90);

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

  /**
   * Given a series of cumulative values, convert it to a series of deltas.
   *
   * Always returns null for the first delta to avoid an arbitrarily large
   * delta (that may represent a bunch of historical data).
   *
   * Nulls are skipped, emitting null as the delta and keeping track of the
   * last non-null as the prior to use for calculating the next delta.
   */
  private deltasFromCumulatives(
    cumulatives: Array<number | null>,
  ): Array<number | null> {
    let lastValue: number | null = null;
    const result: Array<number | null> = [];
    for (let i = 0; i < cumulatives.length; i++) {
      const current = cumulatives[i];
      if (current === null) {
        result.push(null);
      } else {
        if (lastValue === null || current - lastValue < 0) {
          // Sometimes series have a "correction" that resets the count
          // backwards. We treat that as a 'null' delta. Note: They could also
          // have a correction in the opposite direction, forcing an unusually
          // high delta, but we don't have a way to detect / handle that. :-(
          result.push(null);
        } else {
          result.push(current - lastValue);
        }
      }
      lastValue = current;
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
    includeTrailingZeros = true,
  ): Array<number | null> {
    const result = [];
    let sum = 0;
    let count = 0;
    let lastValidIndex = data.length - 1;
    if (!includeTrailingZeros) {
      lastValidIndex = _.findLastIndex(
        data,
        value => value !== null && value !== 0,
      );
    }
    for (let i = 0; i < data.length; i++) {
      const oldValue = i < days ? null : data[i - days];
      if (oldValue !== null) {
        sum -= oldValue;
        count--;
      }

      const newValue = data[i];
      if (newValue !== null && i <= lastValidIndex) {
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
