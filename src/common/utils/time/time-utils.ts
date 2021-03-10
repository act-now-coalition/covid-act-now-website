import moment from 'moment';

// Format the date object according to the specified string token.
// More info about tokens: https://momentjs.com/docs/#/displaying/
export function formatDateTime(date: Date, formatString: string): string {
  return moment(date).format(formatString);
}
