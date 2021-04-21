import React from 'react';
import { scaleLinear, scaleUtc } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { Column } from 'common/models/Projection';
import { COLOR_MAP } from 'common/colors';
import { subtractTime, TimeUnit } from 'common/utils/time-utils';
import { getOverallMaxY, daysToChart } from './utils';

const SparkLine: React.FC<{
  rawData: Column[];
  smoothedData: Column[];
  width: number;
  height: number;
  title: string;
}> = ({ smoothedData, rawData, width, height, title }) => {
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

  const getXCoord = (p: Column) => xScale(p.x);
  const getYCoord = (p: Column) => yScale(p.y);

  const barWidth = 2;

  return (
    <>
      <span>{title}</span>
      <svg width={width} height={height}>
        <g>
          {rawData.map((p: Column) => {
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
          {smoothedData.map((p: Column) => {
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
    </>
  );
};

export default SparkLine;
