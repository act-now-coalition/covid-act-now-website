/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Run 'yarn update-api-types' to regenerate.
 */

export type Countryname = string;
/**
 * Fips Code.  For state level data, 2 characters, for county level data, 5 characters.
 */
export type Fips = string;
/**
 * Latitude of point within the state or county
 */
export type Lat = number;
/**
 * Longitude of point within the state or county
 */
export type Long = number;
/**
 * The state name
 */
export type Statename = string;
/**
 * The county name
 */
export type Countyname = string;
/**
 * Date of latest data
 */
export type Lastupdateddate = string;
/**
 * Projection about total hospital bed utilization
 */
export type Totalhospitalbeds = ResourceUsageProjection;
/**
 * Shortfall of resource needed at the peak utilization
 */
export type Peakshortfall = number;
/**
 * Date of peak resource utilization
 */
export type Peakdate = string;
/**
 * Date when resource shortage begins
 */
export type Shortagestartdate = string;
/**
 * Projection about ICU hospital bed utilization
 */
export type Icubeds = ResourceUsageProjection;
/**
 * Inferred Rt
 */
export type Rt = number;
/**
 * Rt 90th percentile confidence interval upper endpoint.
 */
export type Rtci90 = number;
/**
 * Total population in geographic region [*deprecated*: refer to summary for this]
 */
export type Population = number;
/**
 * Name of high-level intervention in-place
 */
export type Intervention = string;
/**
 * Number of confirmed cases so far
 */
export type Cumulativeconfirmedcases = number;
/**
 * Number of positive test results to date
 */
export type Cumulativepositivetests = number;
/**
 * Number of negative test results to date
 */
export type Cumulativenegativetests = number;
/**
 * Number of deaths so far
 */
export type Cumulativedeaths = number;
/**
 * *deprecated*: Capacity for resource. In the case of ICUs, this refers to total capacity. For hospitalization this refers to free capacity for COVID patients. This value is calculated by (1 - typicalUsageRate) * totalCapacity * 2.07
 */
export type Capacity = number;
/**
 * Total capacity for resource.
 */
export type Totalcapacity = number;
/**
 * Currently used capacity for resource by COVID
 */
export type Currentusagecovid = number;
/**
 * Currently used capacity for resource by all patients (COVID + Non-COVID)
 */
export type Currentusagetotal = number;
/**
 * Typical used capacity rate for resource. This excludes any COVID usage.
 */
export type Typicalusagerate = number;
/**
 * # of Contact Tracers
 */
export type Contacttracers = number;
/**
 * Region level metrics
 */
export type Metrics1 = Metrics;
/**
 * Ratio of people who test positive calculated using a 7-day rolling average.
 */
export type Testpositivityratio = number;
/**
 * The number of cases per 100k population calculated using a 7-day rolling average.
 */
export type Casedensity = number;
/**
 * Ratio of currently hired tracers to estimated tracers needed based on 7-day daily case average.
 */
export type Contacttracercapacityratio = number;
/**
 * R_t, or the estimated number of infections arising from a typical case.
 */
export type Infectionrate = number;
/**
 * 90th percentile confidence interval upper endpoint of the infection rate.
 */
export type Infectionrateci90 = number;
export type Icuheadroomratio = number;
/**
 * Current number of covid patients in icu.
 */
export type Currenticucovid = number;
/**
 * Method used to determine number of current ICU patients with covid.
 */
export type Currenticucovidmethod = 'actual' | 'estimated';
/**
 * Current number of covid patients in icu.
 */
export type Currenticunoncovid = number;
/**
 * Method used to determine number of current ICU patients without covid.
 */
export type Currenticunoncovidmethod =
  | 'actual'
  | 'estimated_from_typical_utilization'
  | 'estimated_from_total_icu_actual';
/**
 * Total Population in geographic region.
 */
export type Population1 = number;
export type Date = string;
/**
 * Number of hospital beds projected to be in-use or that were actually in use (if in the past)
 */
export type Hospitalbedsrequired = number;
/**
 * Number of hospital beds projected to be in-use or actually in use (if in the past)
 */
export type Hospitalbedcapacity = number;
/**
 * Number of ICU beds projected to be in-use or that were actually in use (if in the past)
 */
export type Icubedsinuse = number;
/**
 * Number of ICU beds projected to be in-use or actually in use (if in the past)
 */
export type Icubedcapacity = number;
/**
 * Number of ventilators projected to be in-use.
 */
export type Ventilatorsinuse = number;
/**
 * Total ventilator capacity.
 */
export type Ventilatorcapacity = number;
/**
 * Historical or Inferred Rt
 */
export type Rtindicator = number;
/**
 * Rt standard deviation
 */
export type Rtindicatorci90 = number;
/**
 * Number of cumulative deaths
 */
export type Cumulativedeaths1 = number;
/**
 * Number of cumulative infections
 */
export type Cumulativeinfected = number;
/**
 * Number of current infections
 */
export type Currentinfected = number;
/**
 * Number of people currently susceptible
 */
export type Currentsusceptible = number;
/**
 * Number of people currently exposed
 */
export type Currentexposed = number;
export type Timeseries = PredictionTimeseriesRow[];
/**
 * Total population in geographic region [*deprecated*: refer to summary for this]
 */
export type Population2 = number;
/**
 * Name of high-level intervention in-place
 */
export type Intervention1 = string;
/**
 * Number of confirmed cases so far
 */
export type Cumulativeconfirmedcases1 = number;
/**
 * Number of positive test results to date
 */
export type Cumulativepositivetests1 = number;
/**
 * Number of negative test results to date
 */
export type Cumulativenegativetests1 = number;
/**
 * Number of deaths so far
 */
export type Cumulativedeaths2 = number;
/**
 * # of Contact Tracers
 */
export type Contacttracers1 = number;
export type Date1 = string;
export type Actualstimeseries = ActualsTimeseriesRow[];
/**
 * Ratio of people who test positive calculated using a 7-day rolling average.
 */
export type Testpositivityratio1 = number;
/**
 * The number of cases per 100k population calculated using a 7-day rolling average.
 */
export type Casedensity1 = number;
/**
 * Ratio of currently hired tracers to estimated tracers needed based on 7-day daily case average.
 */
export type Contacttracercapacityratio1 = number;
/**
 * R_t, or the estimated number of infections arising from a typical case.
 */
export type Infectionrate1 = number;
/**
 * 90th percentile confidence interval upper endpoint of the infection rate.
 */
export type Infectionrateci901 = number;
export type Icuheadroomratio1 = number;
export type Date2 = string;
export type Metricstimeseries = MetricsTimeseriesRow[];

/**
 * Summary data for a region with prediction timeseries data and actual timeseries data.
 */
export interface RegionSummaryWithTimeseries {
  countryName?: Countryname;
  fips: Fips;
  lat: Lat;
  long: Long;
  stateName: Statename;
  countyName?: Countyname;
  lastUpdatedDate: Lastupdateddate;
  projections: Projections;
  actuals: Actuals;
  metrics?: Metrics1;
  population: Population1;
  timeseries: Timeseries;
  actualsTimeseries: Actualstimeseries;
  metricsTimeseries: Metricstimeseries;
}
/**
 * Summary of projection data.
 */
export interface Projections {
  totalHospitalBeds: Totalhospitalbeds;
  ICUBeds: Icubeds;
  Rt: Rt;
  RtCI90: Rtci90;
}
/**
 * Resource usage projection data.
 */
export interface ResourceUsageProjection {
  peakShortfall: Peakshortfall;
  peakDate: Peakdate;
  shortageStartDate: Shortagestartdate;
}
/**
 * Known actuals data.
 */
export interface Actuals {
  population: Population;
  intervention: Intervention;
  cumulativeConfirmedCases: Cumulativeconfirmedcases;
  cumulativePositiveTests: Cumulativepositivetests;
  cumulativeNegativeTests: Cumulativenegativetests;
  cumulativeDeaths: Cumulativedeaths;
  hospitalBeds: ResourceUtilization;
  ICUBeds: ResourceUtilization;
  contactTracers?: Contacttracers;
}
/**
 * Utilization of hospital resources.
 */
export interface ResourceUtilization {
  capacity: Capacity;
  totalCapacity: Totalcapacity;
  currentUsageCovid: Currentusagecovid;
  currentUsageTotal: Currentusagetotal;
  typicalUsageRate: Typicalusagerate;
}
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
  icuHeadroomDetails?: ICUHeadroomMetricDetails;
}
/**
 * Details about how the ICU Headroom Metric was calculated.
 */
export interface ICUHeadroomMetricDetails {
  currentIcuCovid: Currenticucovid;
  currentIcuCovidMethod: Currenticucovidmethod;
  currentIcuNonCovid: Currenticunoncovid;
  currentIcuNonCovidMethod: Currenticunoncovidmethod;
}
/**
 * Prediction data for a single day.
 */
export interface PredictionTimeseriesRow {
  date: Date;
  hospitalBedsRequired: Hospitalbedsrequired;
  hospitalBedCapacity: Hospitalbedcapacity;
  ICUBedsInUse: Icubedsinuse;
  ICUBedCapacity: Icubedcapacity;
  ventilatorsInUse: Ventilatorsinuse;
  ventilatorCapacity: Ventilatorcapacity;
  RtIndicator: Rtindicator;
  RtIndicatorCI90: Rtindicatorci90;
  cumulativeDeaths: Cumulativedeaths1;
  cumulativeInfected: Cumulativeinfected;
  currentInfected: Currentinfected;
  currentSusceptible: Currentsusceptible;
  currentExposed: Currentexposed;
}
/**
 * Actual data for a specific day.
 */
export interface ActualsTimeseriesRow {
  population: Population2;
  intervention: Intervention1;
  cumulativeConfirmedCases: Cumulativeconfirmedcases1;
  cumulativePositiveTests: Cumulativepositivetests1;
  cumulativeNegativeTests: Cumulativenegativetests1;
  cumulativeDeaths: Cumulativedeaths2;
  hospitalBeds: ResourceUtilization;
  ICUBeds: ResourceUtilization;
  contactTracers?: Contacttracers1;
  date: Date1;
}
/**
 * Metrics data for a single day.
 */
export interface MetricsTimeseriesRow {
  testPositivityRatio: Testpositivityratio1;
  caseDensity: Casedensity1;
  contactTracerCapacityRatio: Contacttracercapacityratio1;
  infectionRate: Infectionrate1;
  infectionRateCI90: Infectionrateci901;
  icuHeadroomRatio: Icuheadroomratio1;
  icuHeadroomDetails?: ICUHeadroomMetricDetails;
  date: Date2;
}
