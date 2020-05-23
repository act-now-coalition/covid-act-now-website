import React from 'react';
import moment from 'moment';
import * as Style from './Charts.style';

const formatDate = (date: Date): string =>
  moment(date).format('dddd, MMM D, YYYY');

const Tooltip = ({
  date,
  text,
  left,
  top,
}: {
  date: Date;
  text: string;
  left: number;
  top: number;
}) => (
  <Style.Tooltip style={{ top, left }}>
    <Style.TooltipTitle>{formatDate(date)}</Style.TooltipTitle>
    {text}
  </Style.Tooltip>
);

export default Tooltip;
