import { DateTime } from 'luxon';

export enum TimeFormat {
  YYYY_MM_DD = 'yyyy-MM-dd', // 2020-03-01
  MM_DD_YYYY = 'MM/dd/yyyy', // 03/01/2020
  MMM_DD_YYYY = 'MMM dd, yyyy', // Mar 01, 2020
  MMM_D_YYYY = 'MMM d, yyyy', // Mar 1, 2020
  MMMM_D_YYYY = 'MMMM d, yyyy', // March 1, 2020
  MMMM_D = 'MMMM d', // March 1
}

// Parse date string to JS date object.
export function parseDateString(dateString: string): Date {
  return DateTime.fromISO(dateString).toJSDate();
}

// Format the date object according to the specified string token.
// More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
export function formatDateTime(date: Date, formatString: TimeFormat): string {
  return DateTime.fromJSDate(date).toFormat(formatString);
}

// Convert date object to UTC.
export function dateToUTC(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toJSDate();
}
