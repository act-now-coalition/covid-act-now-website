import React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Axis as AxisStyle } from './Explore.style';
import {
  getFinalTicks,
  getXTickFormat,
  getTimeAxisTicks,
} from 'components/Charts/utils';

const yTickFormatDefault = (value: number) => value.toString();

const Axes: React.FC<{
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  isMobile: boolean;
  yNumTicks?: number;
  yTickFormat?: (value: number) => string;
}> = ({
  height,
  dateScale,
  yScale,
  isMobile,
  yNumTicks = 10,
  yTickFormat = yTickFormatDefault,
}) => {
  const [dateFrom, dateTo] = dateScale.domain();
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);

  const finalTickValues = getFinalTicks(isMobile, timeTicks);

  return (
    <AxisStyle>
      <AxisLeft scale={yScale} numTicks={yNumTicks} tickFormat={yTickFormat} />
      <AxisBottom
        top={height}
        scale={dateScale}
        tickValues={finalTickValues}
        tickFormat={(date: Date) => getXTickFormat(date)}
      />
    </AxisStyle>
  );
};

export default Axes;
