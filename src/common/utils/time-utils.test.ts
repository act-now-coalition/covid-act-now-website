import {
  TimeFormat,
  formatDateTime,
  parseDateString,
  dateToUTC,
} from 'common/utils/time-utils';

// Date object constructor takes a zero-indexed month number.

const testDate = new Date(2020, 2, 1);

describe('time formatting', () => {
  test('Date in ISO format', () => {
    expect(formatDateTime(testDate, TimeFormat.YYYY_MM_DD)).toBe('2020-03-01');
  });
  test('Dash seperated date', () => {
    expect(formatDateTime(testDate, TimeFormat.MM_DD_YYYY)).toBe('03/01/2020');
  });
  test('Date in full month, day, year', () => {
    expect(formatDateTime(testDate, TimeFormat.MMMM_D_YYYY)).toBe(
      'March 1, 2020',
    );
  });
  test('Date in shorthand month, day, year', () => {
    expect(formatDateTime(testDate, TimeFormat.MMM_DD_YYYY)).toBe(
      'Mar 01, 2020',
    );
  });
  test('Date in full month and unpadded day', () => {
    expect(formatDateTime(testDate, TimeFormat.MMMM_D)).toBe('March 1');
  });
  test('Past date', () => {
    expect(formatDateTime(new Date(2015, 1, 1), TimeFormat.YYYY_MM_DD)).toBe(
      '2015-02-01',
    );
  });
  test('Future date', () => {
    expect(formatDateTime(new Date(2025, 1, 1), TimeFormat.YYYY_MM_DD)).toBe(
      '2025-02-01',
    );
  });
});

describe('date string parsing', () => {
  test('ISO format to date object', () => {
    expect(parseDateString('2020-03-01T00:00:00.000')).toEqual(testDate);
  });
  test('Date string to date object', () => {
    expect(parseDateString('2020-03-01')).toEqual(testDate);
  });
});

// Pacific timezone is set as default timezone (for consistent testing) in package.json.
describe('convert to UTC', () => {
  // Ambiguous date is assumed to be in UTC.
  test('Date object to UTC', () => {
    expect(dateToUTC(testDate).toISOString()).toBe('2020-03-01T08:00:00.000Z');
  });
});
