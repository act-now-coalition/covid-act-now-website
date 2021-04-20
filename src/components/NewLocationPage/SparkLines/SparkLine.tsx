import React from 'react';
import { scaleLinear, scaleUtc } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { COLOR_MAP } from 'common/colors';
import { Point } from './utils';
import { getOverallMaxY, daysToChart } from './utils';
import { subtractTime, TimeUnit } from 'common/utils/time-utils';

const SparkLine: React.FC<{
  smoothedData: Point[];
  rawData: Point[];
  width: number;
  height: number;
}> = ({ smoothedData, rawData, width, height }) => {
  const maxY = getOverallMaxY(smoothedData, rawData);

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [height, 0],
  });

  const dateTo = new Date();
  const dateFrom = subtractTime(dateTo, daysToChart, TimeUnit.DAYS);

  const xScale = scaleUtc({
    domain: [dateFrom, dateTo],
    range: [0, width],
  });

  const getXCoord = (p: Point) => xScale(p.x);
  const getYCoord = (p: Point) => yScale(p.y);

  const barWidth = 2;

  return (
    <svg width={width} height={height}>
      <g>
        {rawData.map((p: Point) => {
          return (
            <rect
              key={`rect-${p.x}`}
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
        {smoothedData.map((p: Point) => {
          return (
            <LinePath
              stroke="black"
              strokeWidth={1.5}
              key={`line-${p.x}`}
              data={smoothedData}
              x={getXCoord}
              y={getYCoord}
              curve={curveNatural}
              stroke-linecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default SparkLine;
