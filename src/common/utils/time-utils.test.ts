import {
  DateFormat,
  TimeUnit,
  formatDateTime,
  formatUTCDateTime,
  parseDateString,
  parseDateUnix,
  addTime,
  subtractTime,
  getStartOf,
  getTimeDiff,
} from 'common/utils/time-utils';

// Date object constructor takes a zero-indexed month number.

describe('time formatting', () => {
  const testDate = new Date(2020, 2, 1);
  test('Date in ISO format', () => {
    expect(formatDateTime(testDate, DateFormat.YYYY_MM_DD)).toBe('2020-03-01');
  });
  test('Dash separated date', () => {
    expect(formatDateTime(testDate, DateFormat.MM_DD_YYYY)).toBe('03/01/2020');
  });
  test('Date in full month, day, year', () => {
    expect(formatDateTime(testDate, DateFormat.MMMM_D_YYYY)).toBe(
      'March 1, 2020',
    );
  });
  test('Date in shorthand month, day, year', () => {
    expect(formatDateTime(testDate, DateFormat.MMM_DD_YYYY)).toBe(
      'Mar 01, 2020',
    );
  });
  test('Date in full month and unpadded day', () => {
    expect(formatDateTime(testDate, DateFormat.MMMM_D)).toBe('March 1');
  });
  test('Past date', () => {
    expect(formatDateTime(new Date(2015, 1, 1), DateFormat.YYYY_MM_DD)).toBe(
      '2015-02-01',
    );
  });
  test('Future date', () => {
    expect(formatDateTime(new Date(2025, 1, 1), DateFormat.YYYY_MM_DD)).toBe(
      '2025-02-01',
    );
  });
});

describe('utc time formatting', () => {
  // Pacific timezone is set as the default in package.json for testing consistency.
  const testDate = new Date(2020, 2, 1, 20); // March 1st 2020 8 pm. Pacific.
  test('Date in ISO format', () => {
    expect(formatUTCDateTime(testDate, DateFormat.YYYY_MM_DD)).toBe(
      '2020-03-02',
    );
  });
  test('Dash separated date', () => {
    expect(formatUTCDateTime(testDate, DateFormat.MM_DD_YYYY)).toBe(
      '03/02/2020',
    );
  });
  test('Date in full month, day, year', () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMMM_D_YYYY)).toBe(
      'March 2, 2020',
    );
  });
  test('Date in shorthand month, day, year', () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMM_DD_YYYY)).toBe(
      'Mar 02, 2020',
    );
  });
  test('Date in full month and unpadded day', () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMMM_D)).toBe('March 2');
  });
});

describe('date string parsing', () => {
  test('ISO format to date object', () => {
    expect(parseDateString('2020-03-01T00:00:00.000')).toEqual(
      new Date(2020, 2, 1),
    );
  });
  test('Date string to date object', () => {
    expect(parseDateString('2020-03-01')).toEqual(new Date(2020, 2, 1));
  });
  test('Invalid date string', () => {
    expect(() => parseDateString('Hello')).toThrow();
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

describe('add time', () => {
  test('Add hours', () => {
    expect(addTime(new Date(2020, 2, 1), 8, TimeUnit.HOURS).toISOString()).toBe(
      '2020-03-01T16:00:00.000Z',
    );
  });
  test('Add days', () => {
    expect(addTime(new Date(2020, 2, 1), 5, TimeUnit.DAYS)).toEqual(
      new Date(2020, 2, 6),
    );
  });
  test('Add weeks', () => {
    expect(addTime(new Date(2020, 2, 1), 2, TimeUnit.WEEKS)).toEqual(
      new Date(2020, 2, 15),
    );
  });
  test('Add months', () => {
    expect(addTime(new Date(2020, 2, 1), 3, TimeUnit.MONTHS)).toEqual(
      new Date(2020, 5, 1),
    );
  });
});

describe('subtract time', () => {
  test('Subtract hours', () => {
    expect(
      subtractTime(new Date(2020, 2, 1), 8, TimeUnit.HOURS).toISOString(),
    ).toBe('2020-03-01T00:00:00.000Z');
  });
  test('Subtract days', () => {
    expect(subtractTime(new Date(2020, 2, 1), 5, TimeUnit.DAYS)).toEqual(
      new Date(2020, 1, 25),
    );
  });
  test('Subtract weeks', () => {
    expect(subtractTime(new Date(2020, 2, 1), 2, TimeUnit.WEEKS)).toEqual(
      new Date(2020, 1, 16),
    );
  });
  test('Subtract months', () => {
    expect(subtractTime(new Date(2020, 2, 1), 3, TimeUnit.MONTHS)).toEqual(
      new Date(2019, 11, 1),
    );
  });
});

describe('get start of time', () => {
  test('Start of hour', () => {
    expect(getStartOf(new Date(2020, 2, 1, 0, 30), TimeUnit.HOURS)).toEqual(
      new Date(2020, 2, 1, 0, 0),
    );
  });
  test('Start of day', () => {
    expect(getStartOf(new Date(2020, 2, 1, 8, 30), TimeUnit.DAYS)).toEqual(
      new Date(2020, 2, 1, 0, 0),
    );
  });
  // Start of week test will need to be adjusted when implementing Luxon migration as
  // moment treats Sunday as start of week and luxon treats Monday as start of week.
  // Currently, no start of week function calls are implemented.
  test('Start of week', () => {
    expect(getStartOf(new Date(2020, 2, 5), TimeUnit.WEEKS)).toEqual(
      new Date(2020, 2, 2),
    );
  });
  test('Start of month', () => {
    expect(getStartOf(new Date(2020, 2, 15), TimeUnit.MONTHS)).toEqual(
      new Date(2020, 2, 1),
    );
  });
});

describe('get time difference', () => {
  test('Negative difference in hours', () => {
    expect(
      getTimeDiff(
        new Date(2020, 2, 1),
        new Date(2020, 2, 1, 8),
        TimeUnit.HOURS,
      ),
    ).toEqual(-8);
  });
  test('Positive difference in hours', () => {
    expect(
      getTimeDiff(
        new Date(2020, 2, 1, 15),
        new Date(2020, 2, 1, 10),
        TimeUnit.HOURS,
      ),
    ).toEqual(5);
  });
  test('Negative difference in days', () => {
    expect(
      getTimeDiff(new Date(2020, 2, 1), new Date(2020, 2, 5), TimeUnit.DAYS),
    ).toEqual(-4);
  });
  test('Positive difference in days', () => {
    expect(
      getTimeDiff(new Date(2020, 2, 10), new Date(2020, 2, 7), TimeUnit.DAYS),
    ).toEqual(3);
  });
  test('Negative difference in weeks', () => {
    expect(
      getTimeDiff(new Date(2020, 2, 1), new Date(2020, 2, 15), TimeUnit.WEEKS),
    ).toEqual(-2);
  });
  test('Positive difference in weeks', () => {
    expect(
      getTimeDiff(new Date(2020, 2, 29), new Date(2020, 2, 15), TimeUnit.WEEKS),
    ).toEqual(2);
  });
  test('Negative difference in months', () => {
    expect(
      getTimeDiff(new Date(2020, 2, 1), new Date(2020, 5, 1), TimeUnit.MONTHS),
    ).toEqual(-3);
  });
  test('Positive difference in months', () => {
    expect(
      getTimeDiff(new Date(2020, 10, 1), new Date(2020, 5, 1), TimeUnit.MONTHS),
    ).toEqual(5);
  });
});
