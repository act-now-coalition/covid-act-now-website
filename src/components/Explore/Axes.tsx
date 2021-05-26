import React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Axis as AxisStyle } from './Explore.style';
import {
  getFinalTicks,
  getXTickFormat,
  getTimeAxisTicks,
} from 'components/Charts/utils';
import { formatPercent } from 'common/utils';
import { DataMeasure } from './interfaces';

const Axes: React.FC<{
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  isMobile: boolean;
  yNumTicks?: number;
  dataMeasure: DataMeasure;
}> = ({ height, dateScale, yScale, isMobile, yNumTicks = 10, dataMeasure }) => {
  const [dateFrom, dateTo] = dateScale.domain();
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);

  const finalTickValues = getFinalTicks(isMobile, timeTicks).filter(
    date => date < dateTo,
  );

  const yTickFormat = (value: number) =>
    dataMeasure === DataMeasure.PERCENT
      ? formatPercent(value).toString()
      : value.toString();

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
