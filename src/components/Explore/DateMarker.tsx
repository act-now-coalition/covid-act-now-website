import React from 'react';
import * as Styles from './Explore.style';
import { weeksAgo } from './utils';

const DateMarker: React.FC<{ left: number; date: Date }> = ({ left, date }) => {
  const isFutureDate = new Date() < date;
  return isFutureDate ? null : (
    <Styles.DateMarker style={{ left }}>
      {weeksAgo(date, new Date())}
    </Styles.DateMarker>
  );
};

export default DateMarker;
