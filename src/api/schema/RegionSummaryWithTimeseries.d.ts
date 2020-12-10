/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

/**
 * Fips Code.  For state level data, 2 characters, for county level data, 5 characters.
 */
export type Fips = string;
/**
 * 2-letter ISO-3166 Country code.
 */
export type Country = string;
/**
 * 2-letter ANSI state code.
 */
export type State = string;
/**
 * County name
 */
export type County = string | null;
/**
 * An enumeration.
 */
export type AggregationLevel = 'country' | 'state' | 'county';
/**
 * Latitude of point within the state or county
 */
export type Lat = number | null;
/**
 * Location ID as defined here: https://github.com/covidatlas/li/blob/master/docs/reports-v1.md#general-notes
 */
export type Locationid = string;
/**
 * Longitude of point within the state or county
 */
export type Long = number | null;
/**
 * Total Population in geographic region.
 */
export type Population = number;
/**
 * Ratio of people who test positive calculated using a 7-day rolling average.
 */
export type Testpositivityratio = number | null;
/**
 * Method used to determine test positivity ratio.
 */
export type TestPositivityRatioMethod =
  | 'CDCTesting'
  | 'CMSTesting'
  | 'HHSTesting'
  | 'Valorum'
  | 'covid_tracking'
  | 'other';
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
 * Risk levels for region.
 */
export type Risklevels = RiskLevels;
/**
 * COVID Risk Level.
 *
 * ## Risk Level Definitions
 *  *Low* - On track to contain COVID
 *  *Medium* - Slow disease growth
 *  *High* - At risk of outbreak
 *  *Critical* - Active or imminent outbreak
 *  *Unknown* - Risk unknown
 */
export type RiskLevel = 0 | 1 | 2 | 3 | 4;
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
 *
 * New confirmed or suspected cases.
 *
 * New cases are a processed timeseries of cases - summing new cases may not equal
 * the cumulative case count.
 *
 * Notable exceptions:
 *  1. If a region does not report cases for a period of time, the first day
 *     cases start reporting again will not be included. This day likely includes
 *     multiple days worth of cases and can be misleading to the overall series.
 *  2. Any days with negative new cases are removed.
 *
 */
export type Newcases = number | null;
/**
 * Date of latest data
 */
export type Lastupdateddate = string;
/**
 * Ratio of people who test positive calculated using a 7-day rolling average.
 */
export type Testpositivityratio1 = number | null;
/**
 * The number of cases per 100k population calculated using a 7-day rolling average.
 */
export type Casedensity1 = number | null;
/**
 * Ratio of currently hired tracers to estimated tracers needed based on 7-day daily case average.
 */
export type Contacttracercapacityratio1 = number | null;
/**
 * R_t, or the estimated number of infections arising from a typical case.
 */
export type Infectionrate1 = number | null;
/**
 * 90th percentile confidence interval upper endpoint of the infection rate.
 */
export type Infectionrateci901 = number | null;
export type Icuheadroomratio1 = number | null;
/**
 * Date of timeseries data point
 */
export type Date = string;
export type Metricstimeseries = MetricsTimeseriesRow[];
/**
 * Cumulative number of confirmed or suspected cases
 */
export type Cases1 = number | null;
/**
 * Cumulative number of deaths that are suspected or confirmed to have been caused by COVID-19
 */
export type Deaths1 = number | null;
/**
 * Cumulative positive test results to date
 */
export type Positivetests1 = number | null;
/**
 * Cumulative negative test results to date
 */
export type Negativetests1 = number | null;
/**
 * Number of Contact Tracers
 */
export type Contacttracers1 = number | null;
/**
 * Information about hospital bed utilization
 */
export type Hospitalbeds1 = HospitalResourceUtilization;
/**
 * Information about ICU bed utilization
 */
export type Icubeds1 = HospitalResourceUtilization;
/**
 *
 * New confirmed or suspected cases.
 *
 * New cases are a processed timeseries of cases - summing new cases may not equal
 * the cumulative case count.
 *
 * Notable exceptions:
 *  1. If a region does not report cases for a period of time, the first day
 *     cases start reporting again will not be included. This day likely includes
 *     multiple days worth of cases and can be misleading to the overall series.
 *  2. Any days with negative new cases are removed.
 *
 */
export type Newcases1 = number | null;
/**
 * Date of timeseries data point
 */
export type Date1 = string;
export type Actualstimeseries = ActualsTimeseriesRow[];

/**
 * Summary data for a region with prediction timeseries data and actual timeseries data.
 */
export interface RegionSummaryWithTimeseries {
  fips: Fips;
  country: Country;
  state: State;
  county: County;
  level: AggregationLevel;
  lat: Lat;
  locationId: Locationid;
  long: Long;
  population: Population;
  metrics: Metrics;
  riskLevels: Risklevels;
  actuals: Actuals;
  lastUpdatedDate: Lastupdateddate;
  metricsTimeseries?: Metricstimeseries;
  actualsTimeseries: Actualstimeseries;
}
/**
 * Calculated metrics data based on known actuals.
 */
export interface Metrics {
  testPositivityRatio: Testpositivityratio;
  testPositivityRatioDetails?: TestPositivityRatioDetails;
  caseDensity: Casedensity;
  contactTracerCapacityRatio: Contacttracercapacityratio;
  infectionRate: Infectionrate;
  infectionRateCI90: Infectionrateci90;
  icuHeadroomRatio: Icuheadroomratio;
  icuHeadroomDetails?: ICUHeadroomMetricDetails;
}
/**
 * Details about how the test positivity ratio was calculated.
 */
export interface TestPositivityRatioDetails {
  source: TestPositivityRatioMethod;
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
/**
 * COVID risk levels for a region.
 */
export interface RiskLevels {
  overall: RiskLevel;
  testPositivityRatio: RiskLevel;
  caseDensity: RiskLevel;
  contactTracerCapacityRatio: RiskLevel;
  infectionRate: RiskLevel;
  icuHeadroomRatio: RiskLevel;
}
/**
 * Known actuals data.
 */
export interface Actuals {
  cases: Cases;
  deaths: Deaths;
  positiveTests: Positivetests;
  negativeTests: Negativetests;
  contactTracers: Contacttracers;
  hospitalBeds: Hospitalbeds;
  icuBeds: Icubeds;
  newCases: Newcases;
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
/**
 * Metrics data for a specific day.
 */
export interface MetricsTimeseriesRow {
  testPositivityRatio: Testpositivityratio1;
  testPositivityRatioDetails?: TestPositivityRatioDetails;
  caseDensity: Casedensity1;
  contactTracerCapacityRatio: Contacttracercapacityratio1;
  infectionRate: Infectionrate1;
  infectionRateCI90: Infectionrateci901;
  icuHeadroomRatio: Icuheadroomratio1;
  icuHeadroomDetails?: ICUHeadroomMetricDetails;
  date: Date;
}
/**
 * Actual data for a specific day.
 */
export interface ActualsTimeseriesRow {
  cases: Cases1;
  deaths: Deaths1;
  positiveTests: Positivetests1;
  negativeTests: Negativetests1;
  contactTracers: Contacttracers1;
  hospitalBeds: Hospitalbeds1;
  icuBeds: Icubeds1;
  newCases: Newcases1;
  date: Date1;
}
