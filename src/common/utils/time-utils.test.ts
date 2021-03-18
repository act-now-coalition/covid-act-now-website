import {
  TimeFormat,
  TimeUnit,
  formatDateTime,
  parseDateString,
  parseDateUnix,
  dateToUTC,
  addTime,
  subtractTime,
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

// Unix time are expressed in milliseconds.
describe('unix time parsing', () => {
  test('unix time at midnight', () => {
    expect(parseDateUnix(1583049600000).toISOString()).toBe(
      '2020-03-01T08:00:00.000Z',
    );
  });
  test('unix time with non-zero minutes and seconds', () => {
    expect(parseDateUnix(1583080230000).toISOString()).toBe(
      '2020-03-01T16:30:30.000Z',
    );
  });
});

// Pacific timezone is set as default timezone (for consistent testing) in package.json.
describe('convert to UTC', () => {
  // Ambiguous date is assumed to be in UTC.
  test('Date object to UTC', () => {
    expect(dateToUTC(testDate).toISOString()).toBe('2020-03-01T08:00:00.000Z');
  });
});

describe('add time', () => {
  test('Add hours', () => {
    expect(addTime(testDate, 8, TimeUnit.HOURS).toISOString()).toBe(
      '2020-03-01T16:00:00.000Z',
    );
  });
  test('Add days', () => {
    expect(addTime(testDate, 5, TimeUnit.DAYS)).toEqual(new Date(2020, 2, 6));
  });
  test('Add weeks', () => {
    expect(addTime(testDate, 2, TimeUnit.WEEKS)).toEqual(new Date(2020, 2, 15));
  });
  test('Add months', () => {
    expect(addTime(testDate, 3, TimeUnit.MONTHS)).toEqual(new Date(2020, 5, 1));
  });
});

describe('subtract time', () => {
  test('Subtract hours', () => {
    expect(subtractTime(testDate, 8, TimeUnit.HOURS).toISOString()).toBe(
      '2020-03-01T00:00:00.000Z',
    );
  });
  test('Subtract days', () => {
    expect(subtractTime(testDate, 5, TimeUnit.DAYS)).toEqual(
      new Date(2020, 1, 25),
    );
  });
  test('Subtract weeks', () => {
    expect(subtractTime(testDate, 2, TimeUnit.WEEKS)).toEqual(
      new Date(2020, 1, 16),
    );
  });
  test('Subtract months', () => {
    expect(subtractTime(testDate, 3, TimeUnit.MONTHS)).toEqual(
      new Date(2019, 11, 1),
    );
  });
});
