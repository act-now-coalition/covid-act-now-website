import React from 'react';
import * as Styles from './Explore.style';
import { weeksAgo } from './utils';
import { Series } from './interfaces';
import { findPointByDate } from 'components/Explore/utils';
import { getColumnDate } from 'components/Charts/utils';

/**
 * DateMarker uses findPointByDate function in the same manner as SingleLocationToolTip.
 * This ensures that the delta between today and the date shown on hover ("x days ago")
 * corresponds to the date shown in the tooltip (e.g. "Apr 1, 2021").
 */
const DateMarker: React.FC<{
  left: number;
  seriesList: Series[];
  date: Date;
}> = ({ left, seriesList, date }) => {
  const series = seriesList[0];
  const point = findPointByDate(series.data, date);
  const dateToCompareTo = point ? getColumnDate(point) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today < dateToCompareTo ? null : (
    <Styles.DateMarker style={{ left }}>
      {weeksAgo(dateToCompareTo, today)}
    </Styles.DateMarker>
  );
};

export default DateMarker;
