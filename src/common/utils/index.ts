import { assert } from '@actnowcoalition/assert';
import { DateFormat, formatDateTime } from '@actnowcoalition/time-utils';
import { formatInteger } from '@actnowcoalition/number-format';

export function nonNull<T>(value: T | null | undefined): T {
  assert(value != null, 'value was null.');
  return value;
}

/**
 * Returns a date formatted as a string, assuming the Date is in the UTC
 * timezone (this is probably the case if it came from our API). The default
 * format is locale-specific, for US: April 29, 2020.
 */
export function formatUtcDate(
  date: Date,
  format: DateFormat = DateFormat.MMMM_D_YYYY,
): string {
  return formatDateTime(date, format);
}

/**
 * Returns a date formatted for meta tag descriptions, ie: Oct 26, 2020
 */

export function formatMetatagDate(): string {
  return formatDateTime(new Date(), DateFormat.MMM_DD_YYYY);
}

/**
 * Format a number using fixed point notation.
 *
 *   formatDecimal(1.2345)    // 1.23
 *   formatDecimal(1.2345, 3) // 1.234
 */

// TODO: Replace with formatDecimal from @actnowcoalition package.
// Currently whole numbers are formatted differently ("8.0" vs. "8").
export const formatDecimal = (num: number, places = 2): string => {
  if (num === null) {
    return '-';
  }

  // TODO: remove replace() call by including ...{signDisplay: "exceptZero"} in NumberFormatOptions.
  // Currently, this throws an error seemingly related to https://github.com/microsoft/TypeScript/issues/40038
  return num
    .toLocaleString(undefined, {
      minimumFractionDigits: places,
      maximumFractionDigits: places,
    })
    .replace('-0', '0');
};

// TODO: Replace with formatPercent from @actnowcoalition package after formatDecimal is replaced.
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
  const validParams =
    Number.isFinite(numA) && Number.isFinite(numB) && numA !== 0;
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
