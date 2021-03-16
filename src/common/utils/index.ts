import moment from 'moment';
import _ from 'lodash';
import { timeFormats, formatDateTime } from 'common/utils/time-utils';

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
 * Returns a date formatted for meta tag descriptions, ie: Oct 26, 2020
 */

export function formatMetatagDate(): string {
  return formatDateTime(new Date(), timeFormats.MMM_DD_YYYY);
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

// Returns unformatted percent in decimal form
export function getPercentChange(numA: number, numB: number): number | null {
  const validParams = _.isFinite(numA) && _.isFinite(numB) && numA !== 0;
  if (!validParams) {
    return null;
  } else {
    const difference = numB - numA;
    const percentChange = difference / numA;
    return percentChange;
  }
}

/**
 * Returns singular or plural form of word depending on value.
 *
 *   pluralize(1, 'sock', 'socks')      // 'sock'
 *   pluralize(2, 'sock', 'socks')      // 'socks'
 */
export const pluralize = (num: number, singular: string, plural: string) =>
  num === 1 ? singular : plural;
