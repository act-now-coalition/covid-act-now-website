import React from 'react';
import { scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { COLOR_MAP } from 'common/colors';
import { Point } from './utils';
import { max as d3Max } from 'd3-array';

const SingleSparkLine: React.FC<{
  data: Point[];
  width: number;
  height: number;
  padding?: number;
}> = ({ data, width, height, padding = 10 }) => {
  const yScale = scaleLinear({
    domain: [0, d3Max(data, (d: any) => d.y)],
    range: [height, padding],
  });

  const xScale = scaleLinear({
    domain: [0, 29],
    range: [0, width],
  });

  const getXCoord = (p: Point) => xScale(p.x);
  const getYCoord = (p: Point) => yScale(p.y);

  const barWidth = 2;

  return (
    <svg width={width} height={height}>
      <g>
        {data.map((p: Point) => {
          return (
            <rect
              key={`rect-${p.y}`}
              fill={COLOR_MAP.GREY_1}
              x={xScale(p.x) - barWidth / 2}
              y={yScale(p.y)}
              width={barWidth}
              height={height - getYCoord(p)}
            />
          );
        })}
      </g>
      <g>
        {data.map((p: Point) => {
          return (
            <LinePath
              stroke="black"
              strokeWidth={1.5}
              key={`rect-${p.y}`}
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
