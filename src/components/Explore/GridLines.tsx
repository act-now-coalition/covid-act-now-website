import React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { GridRows, GridColumns } from '@vx/grid';
import { Grid as GridStyle } from './Explore.style';

const GridLines: React.FC<{
  width: number;
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  numTicksRows?: number;
  xTickValues?: number[];
}> = ({ width, height, dateScale, yScale, numTicksRows = 10, xTickValues }) => {
  const gridColumnProps = xTickValues
    ? {
        tickValues: xTickValues,
      }
    : {};
  return (
    <GridStyle>
      <GridColumns<Date>
        scale={dateScale}
        height={height}
        {...gridColumnProps}
      />
      <GridRows<number> scale={yScale} width={width} numTicks={numTicksRows} />
    </GridStyle>
  );
};

export default GridLines;
