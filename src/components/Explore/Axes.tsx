import React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Axis as AxisStyle } from './Explore.style';
import {
  getFinalTicks,
  getXTickFormat,
  getTimeAxisTicks,
} from 'components/Charts/utils';
import { TimeUnit } from '@actnowcoalition/time-utils';

const Axes: React.FC<{
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  isMobile: boolean;
  yNumTicks?: number;
  yTickFormat: (val: number) => string;
  xTickTimeUnit: TimeUnit;
}> = ({
  height,
  dateScale,
  yScale,
  isMobile,
  yNumTicks = 10,
  yTickFormat,
  xTickTimeUnit,
}) => {
  const [dateFrom, dateTo] = dateScale.domain();
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo, xTickTimeUnit);

  const finalTickValues = getFinalTicks(isMobile, timeTicks).filter(
    (date: Date) => date < dateTo,
  );

  return (
    <AxisStyle>
      <AxisLeft
        scale={yScale}
        numTicks={yNumTicks}
        tickFormat={(val: number | { valueOf(): number }) =>
          yTickFormat(typeof val === 'number' ? val : val.valueOf())
        }
      />
      <AxisBottom
        top={height}
        scale={dateScale as any}
        tickValues={finalTickValues}
        tickFormat={(date: Date) => getXTickFormat(date, xTickTimeUnit)}
      />
    </AxisStyle>
  );
};

export default Axes;
