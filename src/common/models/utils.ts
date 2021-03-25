import { filter, find, findLastIndex } from 'lodash';

// TODO(michael): We should perhaps create a Timeseries class that wraps an
// Array<Date> and Array<number | null> and hang these utility functions off of
// that.

export function indexOfLastValue<T>(data: Array<T | null>): number | null {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] !== null && data[i] !== undefined) {
      return i;
    }
  }
  return null;
}

export function lastValue<T>(data: Array<T | null>): T | null {
  const i = indexOfLastValue(data);
  return i === null ? null : data[i]!;
}

/**
 * Replaces all values after the specified date with nulls.
 */
export function omitDataAfterDate<T>(
  data: Array<T | null> | Array<T>,
  dates: Array<Date>,
  cutoffDate: Date,
): Array<T | null> {
  return dates.map((date, idx) => {
    const value = data[idx];
    return date <= cutoffDate ? value : null;
  });
}

/**
 * Returns true if the series has at least 7 non-null values in the last 14
 * days and has ever had a non-zero value.
 */
export function hasRecentData(
  data: Array<number | null>,
  dates: Array<Date>,
): boolean {
  const currentDateIndex = findLastIndex(dates, date => date <= new Date());
  const twoWeeksAgoIndex = Math.max(0, currentDateIndex - 13);
  const lastTwoWeeksData = data.slice(twoWeeksAgoIndex, currentDateIndex + 1);
  const dataPointsInLastTwoWeeks = filter(
    lastTwoWeeksData,
    value => value != null,
  ).length;
  const hasNonZeroDataPoint =
    find(data, value => value != null && value > 0) != null;

  return dataPointsInLastTwoWeeks >= 7 && hasNonZeroDataPoint;
}
