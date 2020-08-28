import { nonNull } from 'common/utils';
import {
  ActualsTimeseriesRow,
  PredictionTimeseriesRow,
  Actuals,
  MetricsTimeseriesRow,
  Metrics,
} from 'api/schema/RegionSummaryWithTimeseries';

import { lastValue } from './utils';

// We sometimes need to override the ICU metric for locations due to bad data, etc.
const ICU_HEADROOM_OVERRIDES: Array<string> = [];

/**
 * Encapsulates all of the data related to ICU Headroom (used to generate our
 * copy above the chart).
 */
export interface ICUHeadroomInfo {
  metricSeries: Array<number | null>;
  metricValue: number;

  totalBeds: number;

  covidPatients: number;
  covidPatientsIsActual: boolean;

  nonCovidPatients: number;
  nonCovidPatientsMethod: NonCovidPatientsMethod;

  overrideInPlace: boolean; // ICU Headroom has been overridden due to news reports, etc.
}

/**
 * Indicates the method by which we calculated non-covid ICU patients (so we can
 * customize the copy)
 */
export enum NonCovidPatientsMethod {
  ACTUAL,
  ESTIMATED_FROM_TYPICAL_UTILIZATION,
  ESTIMATED_FROM_TOTAL_ICU_ACTUAL,
}

/** Calculates all of the information pertaining to the ICU Headroom metric. */
export function calcICUHeadroom(
  fips: string,
  actualTimeseries: Array<ActualsTimeseriesRow | null>,
  metricsTimeseries: Array<MetricsTimeseriesRow | null>,
  metrics: Metrics,
  actuals: Actuals,
): ICUHeadroomInfo | null {
  const overrideInPlace = ICU_HEADROOM_OVERRIDES.indexOf(fips) > -1;
  if (overrideInPlace) {
    return {
      metricSeries: actualTimeseries.map(row => 0.9),
      metricValue: 0.9,
      overrideInPlace,
      // rest of this is garbage.
      totalBeds: 0,
      covidPatients: 0,
      covidPatientsIsActual: false,
      nonCovidPatients: 0,
      nonCovidPatientsMethod: NonCovidPatientsMethod.ACTUAL,
    };
  }

  const finalTotalBeds =
    lastValue(actualTimeseries.map(r => r?.ICUBeds.capacity)) ||
    actuals.ICUBeds.totalCapacity;

  return {
    metricSeries: metricsTimeseries.map(row => row?.icuHeadroomRatio || null),
    metricValue: metrics.icuHeadroomRatio,
    overrideInPlace,
    totalBeds: finalTotalBeds,
    covidPatients: 10,
    covidPatientsIsActual:
      metrics.icuHeadroomDetails?.currentIcuCovidMethod == 'actual',
    nonCovidPatients: 12,
    nonCovidPatientsMethod: 1,
  };
}
