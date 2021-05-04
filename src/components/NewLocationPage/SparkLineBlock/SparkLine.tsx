import React from 'react';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleUtc } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { SingleSparkLineContainer as Container } from './SparkLineBlock.style';
import { Column } from 'common/models/Projection';
import { COLOR_MAP } from 'common/colors';
import { getMaxY, dateItem } from './utils';

const SparkLineInner: React.FC<{
  rawData: Column[];
  smoothedData: Column[];
  dateFrom: dateItem;
  dateTo: dateItem;
  width: number;
  height: number;
}> = ({ smoothedData, rawData, dateFrom, dateTo, width, height }) => {
  const maxY = getMaxY(smoothedData);
  const paddingTop = 5;

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [height, paddingTop],
  });

  const xScale = scaleUtc({
    domain: [dateFrom, dateTo],
    range: [0, width],
  });

  const getXCoord = (p: Column) => xScale(p.x);
  const getYCoord = (p: Column) => yScale(p.y);

  const barWidth = 2;

  return (
    <>
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
                key={`line-${p.x}`}
                data={smoothedData}
                x={getXCoord}
                y={getYCoord}
                stroke="black"
                strokeWidth={2}
                curve={curveMonotoneX}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>
    </>
  );
};

const SparkLine: React.FC<{
  rawData: Column[];
  smoothedData: Column[];
  dateFrom: dateItem;
  dateTo: dateItem;
}> = ({ smoothedData, rawData, dateFrom, dateTo }) => {
  return (
    <Container>
      <ParentSize>
        {({ width, height }) => (
          <SparkLineInner
            rawData={rawData}
            smoothedData={smoothedData}
            dateFrom={dateFrom}
            dateTo={dateTo}
            width={width}
            height={height}
          />
        )}
      </ParentSize>
    </Container>
  );
};

export default SparkLine;
