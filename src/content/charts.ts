// TITLES
// TITLES --> CASE GROWTH RATE
export const CASE_GROWTH_RATE_TITLE = 'Infection growth rate';

// TITLES --> HOSPITAL USAGE
export const HOSPITAL_USAGE_TITLE = 'ICU headroom used';

// TITLES --> POSITIVE TESTS
export const POSITIVE_TESTS_TITLE = 'Positive test rate';

// ZONE NAMES
export const ZONE_LOW_NAME = 'Reduced';
export const ZONE_MEDIUM_NAME = 'Moderate';
export const ZONE_HIGH_NAME = 'Elevated';
export const ZONE_UNKNOWN = 'Unknown';

// LEGENDS
// LEGENDS --> SUMMARY
export const SUMMARY_LEGEND_LOW = 'Reduced risk based on reopening metrics.';
export const SUMMARY_LEGEND_MEDIUM =
  'Moderate risk based on reopening metrics.';
export const SUMMARY_LEGEND_HIGH = 'Elevated risk based on reopening metrics.';
export const SUMMARY_LEGEND_UNKNWON =
  'We don’t have enough data to assess reopening risk.';

// LEGENDS --> CASE GROWTH RATE
export const CASE_GROWTH_LEGEND_LOW = 'Active cases are decreasing';
export const CASE_GROWTH_LEGEND_MEDIUM = 'Active cases are slowly increasing';
export const CASE_GROWTH_LEGEND_HIGH = 'Active cases are increasing';
export const CASE_GROWTH_LEGEND_UNKNOWN = 'Insufficient data to assess';

// LEGENDS --> HOSPITAL USAGE
export const HOSPTIAL_USAGE_LEGEND_LOW =
  'Can likely handle a new wave of COVID';
export const HOSPTIAL_USAGE_LEGEND_MEDIUM = 'At risk to a new wave of COVID';
export const HOSPTIAL_USAGE_LEGEND_HIGH =
  'Unable to handle a new wave of COVID';
export const HOSPTIAL_USAGE_LEGEND_UNKNOWN = 'Insufficient data to assess';

// LEGENDS -->  POSITIVE TESTS
export const POSITIVE_TESTS_LEGEND_LOW = 'Indicates testing is widespread';
export const POSITIVE_TESTS_LEGEND_MEDIUM =
  'Indicates testing is not widespread';
export const POSITIVE_TESTS_LEGEND_HIGH = 'Indicates testing is limited';
export const POSITIVE_TESTS_LEGEND_UNKNOWN = 'Insufficient data to assess';

// LIMITS
// LIMITS --> CASE GROWTH RATE
export const CASE_GROWTH_LIMIT_LOW = 1;
export const CASE_GROWTH_LIMIT_MEDIUM = 1.2;
export const CASE_GROWTH_LIMIT_HIGH = Infinity;

// LIMITS --> HOSPITAL USAGE
export const HOSPITAL_USAGE_LIMIT_LOW = 0.7;
export const HOSPITAL_USAGE_LIMIT_MEDIUM = 0.95;
export const HOSPITAL_USAGE_LIMIT_HIGH = Infinity;

// LIMITS -->  POSITIVE TESTS
export const POSITIVE_TESTS_LIMIT_LOW = 0.03;
export const POSITIVE_TESTS_LIMIT_MEDIUM = 0.1;
export const POSITIVE_TESTS_LIMIT_HIGH = Infinity;
