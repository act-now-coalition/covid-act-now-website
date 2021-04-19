import React from 'react';
import { scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { Bar } from '@vx/shape';
import { COLOR_MAP } from 'common/colors';

export interface Point {
  x: number;
  y: number;
}

const SingleSparkLine: React.FC<{
  data: Point[];
  chartWidth: number;
  chartHeight: number;
  capY: number;
}> = ({ data, chartWidth, chartHeight, capY }) => {
  const yScale = scaleLinear({
    domain: [0, capY],
    range: [chartHeight, 0],
  });

  const xScale = scaleLinear({
    domain: [0, 29],
    range: [0, chartWidth],
  });

  const getXCoord = (p: any) => xScale(p.x);

  const getYCoord = (p: any) => yScale(Math.min(p.y, capY));

  return (
    <svg
      width={chartWidth}
      height={chartHeight}
      style={{ border: '1px solid blue' }}
    >
      <g stroke="black" strokeWidth={1.5}>
        {data.map((p: Point) => {
          return (
            <LinePath
              data={data}
              x={getXCoord}
              y={getYCoord}
              curve={curveNatural}
            />
          );
        })}
      </g>
      <g fill="red">
        {data.map((p: Point) => {
          return (
            <Bar x={getXCoord(p.x)} y={-chartHeight} width={2} height={p.y} />
          );
        })}
      </g>
    </svg>
  );
};

export default SingleSparkLine;
