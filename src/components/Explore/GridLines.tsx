import React from 'react';
import { ScaleLinear } from 'd3-scale';
import { GridRows } from '@vx/grid';
import { Grid as GridStyle } from './Explore.style';

const GridLines: React.FC<{
  width: number;
  yScale: ScaleLinear<number, number>;
  numTicksRows?: number;
}> = ({ width, yScale, numTicksRows = 10 }) => {
  return (
    <GridStyle>
      <GridRows<number> scale={yScale} width={width} numTicks={numTicksRows} />
    </GridStyle>
  );
};

export default GridLines;
