import {
  ActualsTimeseriesRow,
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
 * TODO(michael): Rename all internal references to "headroom", remove extra metadata, etc.
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

const parseNonCovidPatientsMethod = (
  method: string,
): NonCovidPatientsMethod => {
  switch (method) {
    case 'actual':
      return NonCovidPatientsMethod.ACTUAL;
    case 'estimated_from_typical_utilization':
      return NonCovidPatientsMethod.ESTIMATED_FROM_TYPICAL_UTILIZATION;
    case 'estimated_from_total_icu_actual':
      return NonCovidPatientsMethod.ESTIMATED_FROM_TOTAL_ICU_ACTUAL;
    default:
      return NonCovidPatientsMethod.ACTUAL;
  }
};
/** Calculates all of the information pertaining to the ICU Headroom metric. */
export function calcICUHeadroom(
  fips: string,
  actualTimeseries: Array<ActualsTimeseriesRow | null>,
  metricsTimeseries: Array<MetricsTimeseriesRow | null>,
  metrics: Metrics,
  actuals: Actuals,
): ICUHeadroomInfo | null {
  // TODO(https://trello.com/c/B6Z1kW8o/): Fix Tennessee Hospitalization data.
  if (fips.length > 2 && fips.slice(0, 2) === '47') {
    return null;
  }

  const icuHeadroomDetails = metrics.icuHeadroomDetails;
  if (
    !icuHeadroomDetails ||
    metrics.icuHeadroomRatio === null ||
    metrics.icuCapacityRatio === null
  ) {
    return null;
  }
  // Use capacity from the timeseries if it's within the last 7 days, else use the
  // non-timeseries value.
  // TODO(chris): https://trello.com/c/CUcjDdtt/435-add-total-icu-beds-to-icu-headroom-metadata-instead-of-calculating-on-website
  const finalTotalBeds =
    lastValue(
      actualTimeseries
        .map(r => (r?.icuBeds ? r.icuBeds.capacity : null))
        .slice(-7),
    ) || actuals.icuBeds.capacity;

  if (finalTotalBeds === null) {
    return null;
  }

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

  return {
    metricSeries: metricsTimeseries.map(row => row && row.icuCapacityRatio),
    metricValue: metrics.icuCapacityRatio,
    overrideInPlace,
    totalBeds: finalTotalBeds,
    covidPatients: icuHeadroomDetails.currentIcuCovid,
    covidPatientsIsActual:
      icuHeadroomDetails.currentIcuCovidMethod === 'actual',
    nonCovidPatients: icuHeadroomDetails.currentIcuNonCovid,
    nonCovidPatientsMethod: parseNonCovidPatientsMethod(
      icuHeadroomDetails.currentIcuNonCovidMethod,
    ),
  };
}
