import { DateTime, DurationObject } from 'luxon';
import { assert } from 'common/utils';

export enum DateFormat {
  YYYY_MM_DD = 'yyyy-MM-dd', // 2020-03-01
  MM_DD_YYYY = 'MM/dd/yyyy', // 03/01/2020
  MMM_DD_YYYY = 'MMM dd, yyyy', // Mar 01, 2020
  MMM_D_YYYY = 'MMM d, yyyy', // Mar 1, 2020
  MMMM_D_YYYY = 'MMMM d, yyyy', // March 1, 2020
  MMM_YY = 'MMM yy', // Mar 20
  MMMM_D = 'MMMM d', // March 1
  MMM = 'MMM', // Mar
}

// Luxon accepts both singular and plural properties of DurationObjects (e.g. hour and hours are valid).
// This enum maps to singular to make it usable by other Luxon functions that accept singular strings (e.g. 'hour').
export enum TimeUnit {
  HOURS = 'hour',
  DAYS = 'day',
  WEEKS = 'week',
  MONTHS = 'month',
}

/**
 * Parse date string to JS date object.
 * Date string can be in any ISO 8601 format: https://moment.github.io/luxon/docs/manual/parsing.html
 * Example: parseDateString('2020-03-01') // Return JS date object for March 1st 2020.
 */
export function parseDateString(dateString: string): Date {
  const parsedDate = DateTime.fromISO(dateString);
  assert(parsedDate.isValid, `Invalid input date string: ${dateString}`);
  return parsedDate.toJSDate();
}

/**
 * Parse unix timestamp (in milliseconds) to JS date object.
 * Example: parseDateUnix(1616612130826) // Return JS date object for March 24th 2021 18:55:30 UTC.
 */
export function parseDateUnix(unixTimestamp: number): Date {
  return DateTime.fromMillis(unixTimestamp).toJSDate();
}

/**
 * Format the date object according to the specified string token.
 * Current string tokens are specified in DateFormat enum.
 * More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
 * Example: formatDateTime(new Date(2020, 2, 1), DateFormat.YYYY_MM_DD) // '2020-03-01'
 */
export function formatDateTime(date: Date, format: DateFormat): string {
  return DateTime.fromJSDate(date).toFormat(format);
}

/**
 * Format the date object to UTC and according to the specified string token.
 * Current string tokens are specified in DateFormat enum.
 * More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
 * Example: formatUTCDateTime(new Date(2020, 1, 1, 20), DateFormat.YYYY_MM_DD) // '2020-02-02'
 *  Feb 1st 2020 at 8 pm. Pacific when converted to UTC will become Feb 2nd.
 */
export function formatUTCDateTime(date: Date, format: DateFormat): string {
  return DateTime.fromJSDate(date).toUTC().toFormat(format);
}

/**
 * Add a specified amount of time (in units) to date object.
 * Example: addTime(new Date(2020, 2, 1), 5, TimeUnit.DAYS) // Return JS date object for March 6th 2020.
 */
export function addTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .plus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

/**
 * Subtract a specified amount of time (in units) to date object.
 * Example: subtractTime(new Date(2020, 2, 10), 5, TimeUnit.DAYS) // Return JS date object for March 5th 2020.
 */
export function subtractTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .minus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

// Some Luxon functions accept a DurationObject instead of a string as parameter.
function getTimeUnitOption(amount: number, unit: TimeUnit): DurationObject {
  switch (unit) {
    case TimeUnit.HOURS:
      return { hours: amount };
    case TimeUnit.DAYS:
      return { days: amount };
    case TimeUnit.WEEKS:
      return { weeks: amount };
    case TimeUnit.MONTHS:
      return { months: amount };
  }
}

/**
 * Get the starting point of a timeframe based on specified time unit.
 * Example: getStartOf(new Date(2020, 2, 1, 8, 30), TimeUnit.HOURS) // Return JS date object for March 1st 2020 at 8:00 am.
 */
export function getStartOf(date: Date, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date).startOf(unit).toJSDate();
}

/**
 * Calculate the difference between 2 dates in the given time unit.
 * Example: getTimeDiff(dateTomorrow, dateToday, TimeUnit.DAYS)); // 1
 */
export function getTimeDiff(date1: Date, date2: Date, unit: TimeUnit) {
  return DateTime.fromJSDate(date1)
    .diff(DateTime.fromJSDate(date2), unit)
    .get(unit);
}
