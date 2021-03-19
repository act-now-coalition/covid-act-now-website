import { DateTime, DurationObject } from 'luxon';

export enum TimeFormat {
  YYYY_MM_DD = 'yyyy-MM-dd', // 2020-03-01
  MM_DD_YYYY = 'MM/dd/yyyy', // 03/01/2020
  MMM_DD_YYYY = 'MMM dd, yyyy', // Mar 01, 2020
  MMM_D_YYYY = 'MMM d, yyyy', // Mar 1, 2020
  MMMM_D_YYYY = 'MMMM d, yyyy', // March 1, 2020
  MMM_YY = 'MMM yy', // Mar 20
  MMMM_D = 'MMMM d', // March 1
  MMM = 'MMM', // Mar
}

export enum TimeUnit {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
}

// Parse date string to JS date object.
export function parseDateString(dateString: string): Date {
  return DateTime.fromISO(dateString).toJSDate();
}

// Parse unix timestamp (in milliseconds) to JS date object.
export function parseDateUnix(unixTimestamp: number): Date {
  return DateTime.fromMillis(unixTimestamp).toJSDate();
}

// Format the date object according to the specified string token.
// More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
export function formatDateTime(date: Date, format: TimeFormat): string {
  return DateTime.fromJSDate(date).toFormat(format);
}

export function formatUTCDateTime(date: Date, format: TimeFormat): string {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(format);
}

// Convert date object to UTC.
export function dateToUTC(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toJSDate();
}

// Add a specified amount of time (in units) to date object.
export function addTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .plus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

// Subtract a specified amount of time (in units) to date object.
export function subtractTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .minus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

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
