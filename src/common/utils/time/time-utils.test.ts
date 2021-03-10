import { formatDateTime } from 'common/utils/time/time-utils';

// Date object constructor takes a zero-indexed month number.

const testDate = new Date(2020, 2, 1);

describe('time formatting', () => {
  test('Date in ISO format', () => {
    expect(formatDateTime(testDate, 'YYYY-MM-DD')).toBe('2020-03-01');
  });
  test('Dash seperated date', () => {
    expect(formatDateTime(testDate, 'L')).toBe('03/01/2020');
  });
  test('Date in full month, day, year', () => {
    expect(formatDateTime(testDate, 'LL')).toBe('March 1, 2020');
  });
  test('Date in shorthand month, day, year', () => {
    expect(formatDateTime(testDate, 'MMM DD, YYYY')).toBe('Mar 01, 2020');
  });
  test('Date in shorthand month, day with ordinal, year', () => {
    expect(formatDateTime(testDate, 'MMM Do, YYYY')).toBe('Mar 1st, 2020');
  });
  test('Date in full month and unpadded day', () => {
    expect(formatDateTime(testDate, 'MMMM D')).toBe('March 1');
  });
});

describe('time in past and future', () => {
  test('Past date', () => {
    expect(formatDateTime(new Date(2015, 1, 1), 'YYYY-MM-DD')).toBe(
      '2015-02-01',
    );
  });
  test('Future date', () => {
    expect(formatDateTime(new Date(2025, 1, 1), 'MMMM Do, YYYY')).toBe(
      'February 1st, 2025',
    );
  });
});
