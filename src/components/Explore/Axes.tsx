import React from 'react';
import moment from 'moment';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Axis as AxisStyle } from './Explore.style';
import { getTimeAxisTicks } from './utils';

const xTickFormat = (date: Date, isMobile: boolean) =>
  moment(date).format(isMobile ? 'MMM' : 'MMM D');

const Axes: React.FC<{
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  isMobile: boolean;
  yNumTicks?: number;
}> = ({ height, dateScale, yScale, isMobile, yNumTicks = 10 }) => {
  const [dateFrom, dateTo] = dateScale.domain();
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);
  // We remove the last tick to make room for the Today marker
  const xTicks = timeTicks.slice(0, timeTicks.length - 1);
  return (
    <AxisStyle>
      <AxisLeft scale={yScale} numTicks={yNumTicks} />
      <AxisBottom
        top={height}
        scale={dateScale}
        tickValues={xTicks}
        tickFormat={date => xTickFormat(date, isMobile)}
      />
    </AxisStyle>
  );
};

export default Axes;
