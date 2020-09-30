/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

/**
 * Cumulative number of confirmed or suspected cases
 */
export type Cases = number | null;
/**
 * Cumulative number of deaths that are suspected or confirmed to have been caused by COVID-19
 */
export type Deaths = number | null;
/**
 * Cumulative positive test results to date
 */
export type Positivetests = number | null;
/**
 * Cumulative negative test results to date
 */
export type Negativetests = number | null;
/**
 * Number of Contact Tracers
 */
export type Contacttracers = number | null;
/**
 * Information about hospital bed utilization
 */
export type Hospitalbeds = HospitalResourceUtilization;
/**
 * Total capacity for resource.
 */
export type Capacity = number | null;
/**
 * Currently used capacity for resource by all patients (COVID + Non-COVID)
 */
export type Currentusagetotal = number | null;
/**
 * Currently used capacity for resource by COVID
 */
export type Currentusagecovid = number | null;
/**
 * Typical used capacity rate for resource. This excludes any COVID usage.
 */
export type Typicalusagerate = number | null;
/**
 * Information about ICU bed utilization
 */
export type Icubeds = HospitalResourceUtilization;
/**
 * Date of timeseries data point
 */
export type Date = string;

/**
 * Actual data for a specific day.
 */
export interface ActualsTimeseriesRow {
  cases: Cases;
  deaths: Deaths;
  positiveTests: Positivetests;
  negativeTests: Negativetests;
  contactTracers: Contacttracers;
  hospitalBeds: Hospitalbeds;
  icuBeds: Icubeds;
  date: Date;
}
/**
 * Base model for API output.
 */
export interface HospitalResourceUtilization {
  capacity: Capacity;
  currentUsageTotal: Currentusagetotal;
  currentUsageCovid: Currentusagecovid;
  typicalUsageRate: Typicalusagerate;
}
