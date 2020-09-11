import React from 'react';
import { GridRows, GridColumns } from '@vx/grid';
import * as ChartStyle from 'components/Charts/Charts.style';
import { ScaleTime, ScaleLinear } from 'd3-scale';

const GridLines: React.FC<{
  width: number;
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  strokeColor: string;
}> = ({ width, height, dateScale, yScale, strokeColor }) => (
  <ChartStyle.LineGrid exploreStroke={strokeColor}>
    <GridColumns<Date> scale={dateScale} height={height} />
    <GridRows<number> scale={yScale} width={width} />
  </ChartStyle.LineGrid>
);

export default GridLines;
