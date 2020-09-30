/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

/**
 * Ratio of people who test positive calculated using a 7-day rolling average.
 */
export type Testpositivityratio = number | null;
/**
 * The number of cases per 100k population calculated using a 7-day rolling average.
 */
export type Casedensity = number | null;
/**
 * Ratio of currently hired tracers to estimated tracers needed based on 7-day daily case average.
 */
export type Contacttracercapacityratio = number | null;
/**
 * R_t, or the estimated number of infections arising from a typical case.
 */
export type Infectionrate = number | null;
/**
 * 90th percentile confidence interval upper endpoint of the infection rate.
 */
export type Infectionrateci90 = number | null;
export type Icuheadroomratio = number | null;
/**
 * Current number of covid patients in icu.
 */
export type Currenticucovid = number;
/**
 * Method used to determine number of current ICU patients with covid.
 */
export type CovidPatientsMethod = 'actual' | 'estimated';
/**
 * Current number of covid patients in icu.
 */
export type Currenticunoncovid = number;
/**
 * Method used to determine number of current ICU patients without covid.
 */
export type NonCovidPatientsMethod =
  | 'actual'
  | 'estimated_from_typical_utilization'
  | 'estimated_from_total_icu_actual';

/**
 * Calculated metrics data based on known actuals.
 */
export interface Metrics {
  testPositivityRatio: Testpositivityratio;
  caseDensity: Casedensity;
  contactTracerCapacityRatio: Contacttracercapacityratio;
  infectionRate: Infectionrate;
  infectionRateCI90: Infectionrateci90;
  icuHeadroomRatio: Icuheadroomratio;
  icuHeadroomDetails: ICUHeadroomMetricDetails | null;
}
/**
 * Details about how the ICU Headroom Metric was calculated.
 */
export interface ICUHeadroomMetricDetails {
  currentIcuCovid: Currenticucovid;
  currentIcuCovidMethod: CovidPatientsMethod;
  currentIcuNonCovid: Currenticunoncovid;
  currentIcuNonCovidMethod: NonCovidPatientsMethod;
}
