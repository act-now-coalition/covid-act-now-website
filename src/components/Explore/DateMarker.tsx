import React from 'react';
import * as Styles from './Explore.style';
import { weeksAgo } from './utils';
import { Series } from './interfaces';
import { findPointByDate } from 'components/Explore/utils';
import { getColumnDate } from 'components/Charts/utils';

const DateMarker: React.FC<{
  left: number;
  seriesList: Series[];
  date: Date;
}> = ({ left, seriesList, date }) => {
  const [, seriesSmooth] = seriesList;
  const pointSmooth = findPointByDate(seriesSmooth.data, date);
  const dateToCompareTo = pointSmooth ? getColumnDate(pointSmooth) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today < dateToCompareTo ? null : (
    <Styles.DateMarker style={{ left }}>
      {weeksAgo(dateToCompareTo, today)}
    </Styles.DateMarker>
  );
};

export default DateMarker;
