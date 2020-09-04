import React from 'react';
import * as Styles from './Explore.style';
import { weeksAgo } from './utils';

const DateMarker: React.FC<{ left: number; date: Date }> = ({ left, date }) => {
  const today = new Date();
  return today < date ? null : (
    <Styles.DateMarker style={{ left }}>
      {weeksAgo(date, today)}
    </Styles.DateMarker>
  );
};

export default DateMarker;
