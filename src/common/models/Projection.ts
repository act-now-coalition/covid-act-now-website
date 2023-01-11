import first from 'lodash/first';
import last from 'lodash/last';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import { assert } from '@actnowcoalition/assert';
import { ActualsTimeseries } from 'api';
import {
  ActualsTimeseriesRow,
  RegionSummaryWithTimeseries,
  MetricsTimeseriesRow,
  Metricstimeseries,
  Metrics,
  Actuals,
  Annotations,
  HospitalResourceUtilization,
  HospitalResourceUtilizationWithAdmissions,
} from 'api/schema/RegionSummaryWithTimeseries';
import { indexOfLastValue, lastValue } from './utils';
import { formatPercent, getPercentChange } from 'common/utils';
import { Metric } from 'common/metricEnum';
import { Region } from 'common/regions';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { Level } from 'common/level';

/**
 * Override any disabled metrics and make them reenabled. Used by internal tools.
 */
let overrideDisabledMetrics = false;
export function reenableDisabledMetrics(enable: boolean): void {
  overrideDisabledMetrics = enable;
}

/**
 * We truncate (or in the case of charts, switch to a dashed line) the last
 * seven days of r(t) data because it is susceptible to continued change as we
 * get future data points.
 */
export const RT_TRUNCATION_DAYS = 7;

// We require at least 15 ICU beds in order to show ICU Capacity usage.
// This still covers enough counties to cover 80% of the US population.
const MIN_ICU_BEDS = 15;

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
  | 'vaccinationsBivalentBoostedFall2022'
  | 'vaccinationsCompleted'
  | 'vaccinationsAdditionalDose'
  | 'vaccinationsInitiated'
  | 'caseDensityByCases'
  | 'caseDensityRange'
  | 'smoothedDailyCases'
  | 'smoothedDailyDeaths'
  | 'weeklyNewCasesPer100k'
  | 'rawDailyCases'
  | 'rawDailyDeaths'
  | 'rawHospitalizations'
  | 'smoothedHospitalizations'
  | 'rawICUHospitalizations'
  | 'smoothedICUHospitalizations'
  | 'weeklyCovidAdmissionsPer100k'
  | 'bedsWithCovidPatientsRatio'
  | 'weeklyDeaths'
  | 'weeklyCases';

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

export interface ICUCapacityInfo {
  metricSeries: Array<number | null>;
  metricValue: number | null;

  totalBeds: number;
  covidPatients: number | null;
  nonCovidPatients: number | null;
  totalPatients: number;
}

export interface VaccinationsInfo {
  ratioAdditionalDoseSeries: Array<number | null>;
  ratioCompletedSeries: Array<number | null>;
  ratioInitiatedSeries: Array<number | null>;
  ratioBivalentBoosterFall2022Series: Array<number | null>;

  peopleInitiated: number;
  ratioInitiated: number;

  peopleVaccinated: number;
  ratioVaccinated: number;

  peopleAdditionalDose: number | null;
  ratioAdditionalDose: number | null;

  peopleBivalentBoostedFall2022: number | null;
  ratioBivalentBoostedFall2022: number | null;

  dosesDistributed: number | null;
  ratioDosesAdministered: number | null;
}

export interface HospitalizationInfo {
  hospitalizationsDensity: number | null;
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
  readonly hsaPopulation: number | null;
  readonly fips: string;
  readonly hsa: string | null;
  readonly hsaName: string | null;
  readonly region: Region;

  readonly icuCapacityInfo: ICUCapacityInfo | null;
  readonly vaccinationsInfo: VaccinationsInfo | null;
  readonly hospitalizationInfo: HospitalizationInfo | null;

  readonly currentCumulativeDeaths: number | null;
  readonly currentCumulativeCases: number | null;
  private readonly currentCaseDensity: number | null;
  readonly currentDailyDeaths: number | null;
  readonly currentHsaIcuInfo: HospitalResourceUtilization;
  readonly currentHsaHospitalInfo: HospitalResourceUtilizationWithAdmissions;
  /** Gets the latest weekly covid admissions data for this location. Note that for
   * counties you likely want to use the HSA data (e.g. via currentHsaHospitalInfo) instead of this. */
  readonly currentWeeklyCovidAdmissions: number | null;
  readonly canCommunityLevel: Level;

  private readonly cumulativeActualDeaths: Array<number | null>;

  private readonly dates: Date[];
  private readonly isCounty: boolean;

  // NOTE: These are used dynamically by getColumn()
  private readonly smoothedDailyCases: Array<number | null>;
  private readonly rtRange: Array<RtRange | null>;
  // ICU Utilization series as values between 0-1 (or > 1 if over capacity).
  private readonly icuUtilization: Array<number | null>;
  // Test Positive series as values between 0-1.
  private readonly testPositiveRate: Array<number | null>;
  private readonly vaccinationsBivalentBoostedFall2022: Array<number | null>;
  private readonly vaccinationsInitiated: Array<number | null>;
  private readonly vaccinationsCompleted: Array<number | null>;
  private readonly vaccinationsAdditionalDose: Array<number | null>;
  private readonly caseDensityByCases: Array<number | null>;
  private readonly caseDensityRange: Array<CaseDensityRange | null>;
  private readonly weeklyNewCasesPer100k: Array<number | null>;
  private readonly smoothedDailyDeaths: Array<number | null>;
  private readonly weeklyDeaths: Array<number | null>;
  private readonly weeklyCases: Array<number | null>;

  private readonly rawDailyCases: Array<number | null>;
  private readonly rawDailyDeaths: Array<number | null>;
  private readonly rawHospitalizations: Array<number | null>;
  private readonly smoothedHospitalizations: Array<number | null>;
  private readonly rawICUHospitalizations: Array<number | null>;
  private readonly smoothedICUHospitalizations: Array<number | null>;
  private readonly weeklyCovidAdmissionsPer100k: Array<number | null>;
  private readonly bedsWithCovidPatientsRatio: Array<number | null>;
  private readonly metrics: Metrics | null;
  readonly annotations: Annotations;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    parameters: ProjectionParameters,
    region: Region,
  ) {
    const {
      actualTimeseries,
      metricsTimeseries,
      dates,
    } = this.getAlignedTimeseriesAndDates(summaryWithTimeseries);
    const metrics = summaryWithTimeseries.metrics;

    this.metrics = metrics || null;
    this.dates = dates;

    this.isCounty = parameters.isCounty;
    this.totalPopulation = summaryWithTimeseries.population;
    this.hsaPopulation = summaryWithTimeseries.hsaPopulation;
    this.fips = summaryWithTimeseries.fips;
    this.hsa = summaryWithTimeseries.hsa;
    this.hsaName = summaryWithTimeseries.hsaName;
    this.region = region;

    // Set up our series data exposed via getDataset().
    this.caseDensityByCases = metricsTimeseries.map(
      row => row && row.caseDensity,
    );

    this.rawDailyCases = actualTimeseries.map(row => row && row.newCases);
    this.smoothedDailyCases = this.denormalizeByPopulation(
      this.caseDensityByCases,
    );

    this.rawDailyDeaths = actualTimeseries.map(row => row && row.newDeaths);
    this.smoothedDailyDeaths = this.smoothWithRollingAverage(
      this.rawDailyDeaths,
    );
    this.weeklyDeaths = this.smoothedDailyDeaths.map(row => row && row * 7);
    this.weeklyCases = this.smoothedDailyCases.map(row => row && row * 7);

    // Disaggregate county hospitalization data from HSAs to counties in order to display
    // county estimates in charts.
    this.rawHospitalizations = actualTimeseries.map(row =>
      this.isCounty
        ? this.disaggregateHsaValue(
            row?.hsaHospitalBeds?.currentUsageCovid ?? null,
          )
        : row?.hospitalBeds?.currentUsageCovid ?? null,
    );

    this.rawICUHospitalizations = actualTimeseries.map(row =>
      this.isCounty
        ? this.disaggregateHsaValue(row?.hsaIcuBeds?.currentUsageCovid ?? null)
        : row?.icuBeds?.currentUsageCovid ?? null,
    );

    this.smoothedHospitalizations = this.smoothWithRollingAverage(
      this.rawHospitalizations,
    );

    this.smoothedICUHospitalizations = this.smoothWithRollingAverage(
      this.rawICUHospitalizations,
    );

    this.cumulativeActualDeaths = this.smoothCumulatives(
      actualTimeseries.map(row => row && row.deaths),
    );

    this.rtRange = this.calcRtRange(metricsTimeseries);
    this.testPositiveRate = metricsTimeseries.map(
      row => row && row.testPositivityRatio,
    );

    this.hospitalizationInfo = this.getHospitalizationInfo();
    this.icuCapacityInfo = this.getIcuCapacityInfo(
      metrics,
      metricsTimeseries,
      actualTimeseries,
    );

    this.icuUtilization =
      this.icuCapacityInfo?.metricSeries || this.dates.map(date => null);

    this.vaccinationsInfo = this.getVaccinationsInfo(
      summaryWithTimeseries.actuals,
      metrics,
      metricsTimeseries,
    );
    this.vaccinationsBivalentBoostedFall2022 =
      this.vaccinationsInfo?.ratioBivalentBoosterFall2022Series ||
      this.dates.map(date => null);
    this.vaccinationsCompleted =
      this.vaccinationsInfo?.ratioCompletedSeries ||
      this.dates.map(date => null);
    this.vaccinationsAdditionalDose =
      this.vaccinationsInfo?.ratioAdditionalDoseSeries ||
      this.dates.map(date => null);
    this.vaccinationsInitiated =
      this.vaccinationsInfo?.ratioInitiatedSeries ||
      this.dates.map(date => null);

    this.caseDensityRange = this.calcCaseDensityRange();

    this.weeklyNewCasesPer100k = metricsTimeseries.map(
      row => row?.weeklyNewCasesPer100k ?? null,
    );

    this.weeklyCovidAdmissionsPer100k = metricsTimeseries.map(
      row => row?.weeklyCovidAdmissionsPer100k ?? null,
    );

    this.bedsWithCovidPatientsRatio = metricsTimeseries.map(
      row => row?.bedsWithCovidPatientsRatio ?? null,
    );

    this.canCommunityLevel =
      summaryWithTimeseries.communityLevels?.canCommunityLevel ?? Level.UNKNOWN;

    this.currentCaseDensity = metrics?.caseDensity ?? null;
    this.currentDailyDeaths = lastValue(this.smoothedDailyDeaths);

    this.currentCumulativeDeaths = summaryWithTimeseries.actuals.deaths;
    this.currentCumulativeCases = summaryWithTimeseries.actuals.cases;

    this.currentHsaIcuInfo = summaryWithTimeseries.actuals.hsaIcuBeds;
    this.currentHsaHospitalInfo = summaryWithTimeseries.actuals.hsaHospitalBeds;
    this.currentWeeklyCovidAdmissions =
      summaryWithTimeseries.actuals.hospitalBeds.weeklyCovidAdmissions;

    this.annotations = summaryWithTimeseries.annotations;
  }

  // TODO(michael): We should really pre-compute currentDailyAverageCases and
  // make sure we're pulling all of the data from the same day, to make sure it
  // matches the graph.
  get currentDailyAverageCases() {
    return lastValue(this.smoothedDailyCases);
  }

  /** Returns the last date we have (case) data for. */
  get finalDate(): Date {
    const lastIndex =
      indexOfLastValue(this.smoothedDailyCases) ?? this.dates.length - 1;
    return this.dates[lastIndex];
  }

  get testPositiveRateSource(): string | null {
    return this.metrics?.testPositivityRatioDetails?.source || null;
  }

  getMetricValue(metric: Metric): number | null {
    if (this.isMetricDisabled(metric)) {
      return null;
    }

    switch (metric) {
      case Metric.CASE_GROWTH_RATE:
        return this.metrics?.infectionRate ?? null;
      case Metric.HOSPITAL_USAGE:
        return this.icuCapacityInfo ? this.icuCapacityInfo.metricValue : null;
      case Metric.POSITIVE_TESTS:
        return this.metrics?.testPositivityRatio ?? null;
      case Metric.VACCINATIONS:
        return this.vaccinationsInfo
          ? this.vaccinationsInfo.ratioBivalentBoostedFall2022
          : null;
      case Metric.CASE_DENSITY:
        return this.currentCaseDensity;
      case Metric.ADMISSIONS_PER_100K:
        return this.metrics?.weeklyCovidAdmissionsPer100k ?? null;
      case Metric.WEEKLY_CASES_PER_100K:
        return this.metrics?.weeklyNewCasesPer100k ?? null;
      case Metric.RATIO_BEDS_WITH_COVID:
        return this.metrics?.bedsWithCovidPatientsRatio ?? null;
      default:
        fail('Unknown metric: ' + metric);
    }
  }

  isMetricDisabled(metric: Metric): boolean {
    return (
      !overrideDisabledMetrics && this.isMetricDisabledIgnoreOverride(metric)
    );
  }

  isMetricDisabledIgnoreOverride(metric: Metric): boolean {
    const override = getRegionMetricOverride(this.region, metric);
    if (override) {
      if (override.blocked && !override.start_date && !override.end_date) {
        return true;
      }
    }
    return false;
  }

  get twoWeekPercentChangeInCases() {
    return this.getTwoWeekPercentChange(this.smoothedDailyCases);
  }

  get twoWeekPercentChangeInDeaths() {
    return this.getTwoWeekPercentChange(this.smoothedDailyDeaths);
  }

  get twoWeekPercentChangeInHospitalizations() {
    return this.getTwoWeekPercentChange(this.smoothedHospitalizations);
  }

  private getTwoWeekPercentChange(series: any[]): number | null {
    const lastIndex = indexOfLastValue(series);
    assert(lastIndex != null, 'series is empty');
    const lastTwoWeeks = series.slice(lastIndex - 14, lastIndex + 1);
    const firstVal = lastTwoWeeks[0];
    const lastVal = last(lastTwoWeeks);
    if (!firstVal || !lastVal) {
      return null;
    }
    return getPercentChange(firstVal, lastVal);
  }

  private getHospitalizationInfo(): HospitalizationInfo | null {
    const latestDatapoint = lastValue(this.smoothedHospitalizations);
    if (!latestDatapoint) {
      return null;
    }

    const hospitalizationsDensity =
      latestDatapoint / (this.totalPopulation / 100_000);

    return {
      hospitalizationsDensity,
    };
  }

  private getIcuCapacityInfo(
    metrics: Metrics,
    metricsTimeseries: Array<MetricsTimeseriesRow | null>,
    actualsTimeseries: Array<ActualsTimeseriesRow | null>,
  ): ICUCapacityInfo | null {
    if (this.isMetricDisabled(Metric.HOSPITAL_USAGE)) {
      return null;
    }

    // The ICU Capacity metric on the backend doesn't use HSA-level data for counties.
    // We calculate it here so that the ICU Capacity metric matches the
    // ICU actuals in this method. All counties will have HSA-level data, and all other
    // location types will have their standard/corresponding level data.
    const countyHsaTimeseriesIcuCapacityRatio = actualsTimeseries.map(row =>
      this.calcIcuCapacityUsage(row && row.hsaIcuBeds),
    );

    const metricSeries = this.isCounty
      ? countyHsaTimeseriesIcuCapacityRatio
      : metricsTimeseries.map(row => row?.icuCapacityRatio ?? null);

    // TODO(https://trello.com/c/bnwRazOo/): Something is broken where the API
    // top-level actuals don't match the current metric value. So we extract
    // them from the timeseries for now.
    const icuIndex = indexOfLastValue(metricSeries);

    if (icuIndex != null) {
      let metricValue = this.isCounty
        ? countyHsaTimeseriesIcuCapacityRatio[icuIndex]
        : metrics.icuCapacityRatio;

      assert(
        metricsTimeseries[icuIndex]?.date === actualsTimeseries[icuIndex]?.date,
        "Dates in actualTimeseries and metricTimeseries aren't aligned.",
      );

      // If Projection is for a county then use HSA-level ICU data.
      const icuActuals = this.isCounty
        ? actualsTimeseries[icuIndex]!.hsaIcuBeds
        : actualsTimeseries[icuIndex]!.icuBeds;

      const totalBeds = icuActuals.capacity;
      const covidPatients = icuActuals.currentUsageCovid;
      const totalPatients = icuActuals.currentUsageTotal;

      const enoughBeds = totalBeds !== null && totalBeds >= MIN_ICU_BEDS;
      if (!enoughBeds) {
        metricValue = null;
      }

      // Make sure we don't somehow grab the wrong data, given we're pulling it from the metrics / actuals timeseries.
      assert(
        metricValue === null || metricValue === metricSeries[icuIndex],
        "Timeseries icuCapacityRatio doesn't match current metric value.",
      );
      assert(
        totalBeds !== null && totalPatients !== null,
        'These must be non-null for the metric to be non-null',
      );
      const nonCovidPatients =
        covidPatients === null ? null : totalPatients - covidPatients;
      return {
        metricSeries,
        metricValue,
        totalBeds,
        covidPatients,
        nonCovidPatients,
        totalPatients,
      };
    }
    return null;
  }

  private calcIcuCapacityUsage(data: HospitalResourceUtilization | null) {
    const icuCapacity = data?.capacity ?? null;
    const icuUsage = data?.currentUsageTotal ?? null;

    if (icuCapacity === null || icuUsage === null) {
      return null;
    }
    return icuUsage / icuCapacity;
  }

  private getVaccinationsInfo(
    actuals: Actuals,
    metrics: Metrics,
    metricsTimeseries: Array<MetricsTimeseriesRow | null>,
  ): VaccinationsInfo | null {
    const ratioInitiated = metrics.vaccinationsInitiatedRatio;
    const ratioVaccinated = metrics.vaccinationsCompletedRatio;
    const ratioAdditionalDose = metrics.vaccinationsAdditionalDoseRatio;
    const ratioBivalentBoostedFall2022 =
      metrics.vaccinationsFall2022BivalentBoosterRatio;

    if (
      ratioInitiated === null ||
      ratioInitiated === undefined ||
      ratioVaccinated === null ||
      ratioVaccinated === undefined ||
      this.isMetricDisabled(Metric.VACCINATIONS)
    ) {
      return null;
    }

    let peopleAdditionalDose = actuals.vaccinationsAdditionalDose ?? null;
    if (peopleAdditionalDose == null && ratioAdditionalDose != null) {
      peopleAdditionalDose = ratioAdditionalDose * this.totalPopulation;
    }
    const peopleVaccinated =
      actuals.vaccinationsCompleted ?? ratioVaccinated * this.totalPopulation;
    const peopleInitiated =
      actuals.vaccinationsInitiated ?? ratioInitiated * this.totalPopulation;
    let peopleBivalentBoostedFall2022 =
      actuals.vaccinationsFall2022BivalentBooster ?? null;
    if (
      peopleBivalentBoostedFall2022 == null &&
      ratioBivalentBoostedFall2022 != null
    ) {
      peopleBivalentBoostedFall2022 =
        ratioBivalentBoostedFall2022 * this.totalPopulation;
    }

    if (ratioVaccinated > ratioInitiated) {
      console.error(
        `Suspicious vaccine data for ${this.fips}: % Vaccinated ${formatPercent(
          ratioVaccinated,
          2,
        )} > % Initiated ${formatPercent(ratioInitiated, 2)}.`,
      );
    }

    const vaccinationsAdditionalDoseSeries = metricsTimeseries.map(
      row => row?.vaccinationsAdditionalDoseRatio || null,
    );
    const vaccinationsCompletedSeries = metricsTimeseries.map(
      row => row?.vaccinationsCompletedRatio || null,
    );
    const vaccinationsInitiatedSeries = metricsTimeseries.map(
      row => row?.vaccinationsInitiatedRatio || null,
    );

    const ratioBivalentBoosterFall2022Series = metricsTimeseries.map(
      row => row?.vaccinationsFall2022BivalentBoosterRatio || null,
    );

    let dosesDistributed = actuals.vaccinesDistributed ?? null;
    let ratioDosesAdministered = dosesDistributed
      ? (peopleInitiated + peopleVaccinated) / dosesDistributed
      : null;

    if (
      ratioDosesAdministered &&
      (ratioDosesAdministered < 0 || ratioDosesAdministered > 1)
    ) {
      console.error(
        `Suppressing suspicious vaccine doses administered % for ${
          this.fips
        }: ${formatPercent(ratioDosesAdministered, 2)}`,
      );
      dosesDistributed = null;
      ratioDosesAdministered = null;
    }

    return {
      peopleVaccinated,
      peopleInitiated,
      peopleAdditionalDose,
      ratioInitiated,
      ratioVaccinated,
      ratioAdditionalDose: ratioAdditionalDose ?? null,
      ratioCompletedSeries: vaccinationsCompletedSeries,
      ratioInitiatedSeries: vaccinationsInitiatedSeries,
      ratioAdditionalDoseSeries: vaccinationsAdditionalDoseSeries,
      dosesDistributed,
      ratioDosesAdministered,
      peopleBivalentBoostedFall2022,
      ratioBivalentBoostedFall2022: ratioBivalentBoostedFall2022 ?? null,
      ratioBivalentBoosterFall2022Series,
    };
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
   * In order to do this, we grab the earliest and latest dates from the
   * timeseries and for every single day in between them fill each array
   * (the dates, the actuals and the timeseries(predicted)) with the value at
   * that date or null.
   */
  private getAlignedTimeseriesAndDates(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
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
      earliestDate = new Date(first(metricsTimeseriesRaw)!.date);
      latestDate = new Date(last(metricsTimeseriesRaw)!.date);
    } else {
      earliestDate = new Date(first(actualsTimeseriesRaw)!.date);
      latestDate = new Date(last(actualsTimeseriesRaw)!.date);
    }

    earliestDate = new Date('2020-03-01');

    const actualsTimeseries: Array<ActualsTimeseriesRow | null> = [];
    const metricsTimeseries: Array<MetricsTimeseriesRow | null> = [];
    const dates: Date[] = [];

    const actualsTimeseriesDictionary = this.makeDateDictionary(
      actualsTimeseriesRaw,
    );
    const metricsTimeseriesDictionary = this.makeDateDictionary(
      metricsTimeseriesRaw,
    );

    let currDate = new Date(earliestDate.getTime());

    while (currDate <= latestDate) {
      const ts = currDate.toISOString().substring(0, 10);
      const actualsTimeseriesrowForDate = actualsTimeseriesDictionary[
        ts
      ] as ActualsTimeseriesRow;
      const metricsTimeseriesRowForDate = metricsTimeseriesDictionary[
        ts
      ] as MetricsTimeseriesRow;
      actualsTimeseries.push(actualsTimeseriesrowForDate || null);
      metricsTimeseries.push(metricsTimeseriesRowForDate || null);
      // Clone the date since we're about to mutate it below.
      dates.push(new Date(currDate.getTime()));

      // Increment the date by one.
      // We specifically use setUTCDate and getUTCDate instead of setDate and getDate,
      // as the latter two do not take daylight savings into account.
      // This results in each day being incremented by 24 hours (although two days of the year should be 23 and 25),
      // leading to days being shifted and displayed incorrectly.
      currDate.setUTCDate(currDate.getUTCDate() + 1);
    }

    return {
      actualTimeseries: actualsTimeseries,
      metricsTimeseries: metricsTimeseries,
      dates: dates,
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
  // https://github.com/act-now-coalition/covid-data-model/issues/315 there may
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
    let nonZeroIndex = findIndex(data, v => v !== null);
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
      lastValidIndex = findLastIndex(
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

  private denormalizeByPopulation(
    data: Array<number | null>,
  ): Array<number | null> {
    const populationFactor = this.totalPopulation / 100000;
    return data.map(d => (d == null ? null : d * populationFactor));
  }

  disaggregateHsaValue(hsaValue: number | null) {
    if (hsaValue === null || this.hsaPopulation === null) {
      return null;
    }
    return hsaValue * (this.totalPopulation / this.hsaPopulation);
  }
}
