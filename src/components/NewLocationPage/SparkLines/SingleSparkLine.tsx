import React from 'react';
import { scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { COLOR_MAP } from 'common/colors';
import { Point } from './utils';

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

  const getXCoord = (p: Point) => xScale(p.x);
  const getYCoord = (p: Point) => yScale(p.y);

  const barWidth = 2;

  return (
    <svg
      width={chartWidth}
      height={chartHeight}
      style={{ border: '1px solid blue' }}
    >
      <g>
        {data.map((p: Point) => {
          return (
            <rect
              fill={COLOR_MAP.GREY_1}
              x={xScale(p.x) - barWidth / 2}
              y={yScale(p.y)}
              width={barWidth}
              height={chartHeight - getYCoord(p)}
            />
          );
        })}
      </g>
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
    </svg>
  );
};

export default SingleSparkLine;
