import { DateTime } from 'luxon';

export enum timeFormats {
  YYYY_MM_DD = 'yyyy-MM-dd', // 2020-03-01
  MM_DD_YYYY = 'MM/dd/yyyy', // 03/01/2020
  MMM_DD_YYYY = 'MMM dd, yyyy', // Mar 01, 2020
  MMMM_D_YYYY = 'MMMM d, yyyy', // March 1, 2020
  MMMM_D = 'MMMM d', // March 1
}

// Parse date string to JS date object.
export function parseDateString(dateString: string): Date {
  return DateTime.fromISO(dateString).toJSDate();
}

// Format the date object according to the specified string token.
// More info about tokens: https://momentjs.com/docs/#/displaying/
export function formatDateTime(date: Date, formatString: timeFormats): string {
  return DateTime.fromJSDate(date).toFormat(formatString);
}
