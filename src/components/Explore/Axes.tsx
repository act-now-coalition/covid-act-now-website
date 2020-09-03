import React from 'react';
import moment from 'moment';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import * as ChartStyle from 'components/Charts/Charts.style';
import { getTimeAxisTicks } from './utils';

const Axes: React.FC<{
  height: number;
  dateScale: ScaleTime<number, number>;
  dateFrom: Date;
  dateTo: Date;
  yScale: ScaleLinear<number, number>;
  strokeColor: string;
  isMobile: boolean;
}> = ({
  height,
  dateScale,
  dateFrom,
  dateTo,
  yScale,
  strokeColor,
  isMobile,
}) => {
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);
  // We remove the last tick to make room for the Today marker
  const xTicks = timeTicks.slice(0, timeTicks.length - 1);
  const timeTickFormat = isMobile ? 'MMM' : 'MMMM D';
  const xTickFormat = (date: Date) => moment(date).format(timeTickFormat);
  return (
    <ChartStyle.Axis exploreStroke={strokeColor}>
      <AxisLeft scale={yScale} />
      <AxisBottom
        top={height}
        scale={dateScale}
        tickValues={xTicks}
        tickFormat={xTickFormat}
      />
    </ChartStyle.Axis>
  );
};

export default Axes;
