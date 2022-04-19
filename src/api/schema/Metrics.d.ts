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
 * Method used to determine test positivity ratio.
 */
export type TestPositivityRatioMethod =
  | 'CMSTesting'
  | 'CDCTesting'
  | 'HHSTesting'
  | 'Valorum'
  | 'covid_tracking'
  | 'other';
/**
 * The number of cases per 100k population calculated using a 7-day rolling average.
 */
export type Casedensity = number | null;
/**
 * The number of new cases per 100k population over the last week.
 */
export type Weeklynewcasesper100K = number | null;
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
/**
 * Ratio of staffed intensive care unit (ICU) beds that are currently in use.
 */
export type Icucapacityratio = number | null;
/**
 * Ratio of staffed hospital beds that are currently in use by COVID patients. For counties, this is calculated using HSA-level data for the corresponding area.
 */
export type Bedswithcovidpatientsratio = number | null;
/**
 * Number of COVID patients per 100k population admitted in the past week. For counties, this is calculated using HSA-level data for the corresponding area.
 */
export type Weeklycovidadmissionsper100K = number | null;
/**
 * Ratio of population that has initiated vaccination.
 */
export type Vaccinationsinitiatedratio = number | null;
/**
 * Ratio of population that has completed vaccination.
 */
export type Vaccinationscompletedratio = number | null;
/**
 * Ratio of population that are fully vaccinated and have received a booster (or additional) dose.
 */
export type Vaccinationsadditionaldoseratio = number | null;

/**
 * Calculated metrics data based on known actuals.
 */
export interface Metrics {
  testPositivityRatio: Testpositivityratio;
  testPositivityRatioDetails?: TestPositivityRatioDetails | null;
  caseDensity: Casedensity;
  weeklyNewCasesPer100k: Weeklynewcasesper100K;
  contactTracerCapacityRatio: Contacttracercapacityratio;
  infectionRate: Infectionrate;
  infectionRateCI90: Infectionrateci90;
  icuCapacityRatio: Icucapacityratio;
  bedsWithCovidPatientsRatio: Bedswithcovidpatientsratio;
  weeklyCovidAdmissionsPer100k: Weeklycovidadmissionsper100K;
  vaccinationsInitiatedRatio?: Vaccinationsinitiatedratio;
  vaccinationsCompletedRatio?: Vaccinationscompletedratio;
  vaccinationsAdditionalDoseRatio?: Vaccinationsadditionaldoseratio;
}
/**
 * Details about how the test positivity ratio was calculated.
 */
export interface TestPositivityRatioDetails {
  /**
   * Source data for test positivity ratio.
   */
  source: TestPositivityRatioMethod;
}
