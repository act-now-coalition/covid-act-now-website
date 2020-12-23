import moment from 'moment';
import _ from 'lodash';
import US_STATE_DATASET from '../../components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    fail(msg);
  }
}

export function fail(msg?: string): never {
  throw new Error('INTERNAL ASSERTION FAILED: ' + msg);
}

export function nonNull<T>(value: T | null | undefined): T {
  assert(value != null, 'value was null.');
  return value;
}

export function getFormattedCountyName(stateId: string, countyUrlName: string) {
  const { county: countyName, state_code: stateCode } = _.find(
    // @ts-ignore: US_STATE_DATASET is .js, but this is valid
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['county_url_name', countyUrlName],
  );

  return `${countyName}, ${stateCode}`;
}

/**
 * Returns a date formatted as a string, assuming the Date is in the UTC
 * timezone (this is probably the case if it came from our API). The default
 * format is locale-specific, for US: April 29, 2020.
 *
 * See https://momentjs.com/docs/#/displaying/format/ for more details.
 */
export function formatUtcDate(date: Date, format: string = 'LL'): string {
  return moment.utc(date).format(format);
}

/**
 * Returns a local timezone date formatted as a string. The default format is
 * locale-specific, for US: April 29, 2020.
 *
 * See https://momentjs.com/docs/#/displaying/format/ for more details.
 */
export function formatLocalDate(date: Date, format: string = 'LL'): string {
  return moment(date).format(format);
}

/**
 * Returns a date formatted for meta tag descriptions, ie: Oct 26, 2020
 */

export function formatMetatagDate(): string {
  return moment().format('MMM DD, YYYY');
}

/**
 * Returns a date formatted for timestamps in Learn (glossary + FAQ), ie: 10/26/2020
 */

export function formatNumericalDate(date: string): string {
  return moment(date).format('L');
}

/**
 * Returns a language-sensitive representation of an integer. For US, it
 * adds commas for thousands, millions, etc.
 */
export function formatInteger(num: number): string {
  return Math.round(num).toLocaleString();
}

/**
 * Format a number using fixed point notation.
 *
 *   formatDecimal(1.2345)    // 1.23
 *   formatDecimal(1.2345, 3) // 1.234
 */
export const formatDecimal = (num: number, places = 2): string => {
  if (num === null) {
    return '-';
  }

  return num.toLocaleString(undefined, {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });
};
/**
 * Returns a percentage representation of a number.
 *
 *   formatPercent(0.85)      // 86%
 *   formatPercent(0.8567, 2) // 85.67%
 */
export const formatPercent = (num: number, places = 0): string =>
  `${formatDecimal(100 * Math.min(1, num), places)}%`;

/**
 * Returns a formatted number, rounding to keep the specified number
 * of significant digits. Example:
 *
 *   formatEstimate(123456, 2)     // 120,000
 *   formatEstimate(123456, 3)     // 123,000
 */
export function formatEstimate(value: number, significantDigits = 2): string {
  if (value <= 0) {
    return formatInteger(value);
  }
  return formatInteger(Number(value.toPrecision(significantDigits)));
}

// Taken from https://ui.dev/validate-email-address-javascript/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(emailAddress: string) {
  return (
    emailAddress && emailAddress.length > 1 && EMAIL_REGEX.test(emailAddress)
  );
}

export function getPercentChange(numA: number, numB: number): number | null {
  const validParams = _.isNumber(numA) && _.isNumber(numB) && numB !== 0;
  if (!validParams) {
    return null;
  } else {
    const difference = numA - numB;
    const percentChange = difference / numB;
    return percentChange;
  }
}
