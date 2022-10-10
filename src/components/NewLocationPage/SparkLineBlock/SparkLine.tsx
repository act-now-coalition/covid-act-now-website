import React from 'react';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleUtc } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { SingleSparkLineContainer as Container } from './SparkLineBlock.style';
import { Column } from 'common/models/Projection';
import { COLOR_MAP } from 'common/colors';
import { getMaxY, dateItem, SparkLineProps } from './utils';

const SparkLineInner: React.FC<
  SparkLineProps & {
    width: number;
    height: number;
  }
> = ({ smoothedData, rawData, dateFrom, dateTo, width, height }) => {
  // in some cases, the rendered size is 0x0, so don't render.
  // it doesn't show, it adds a lot of invisible DOM nodes
  if (width === 0 || height === 0) {
    return null;
  }

  const maxY = getMaxY(smoothedData);
  const paddingTop = 5;
  const strokeWidth = 2;

  // subtracking strokeWidth from the bottom of the yScale range so the line is never cut off
  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [height - strokeWidth, paddingTop],
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
            // make sure this doesn't come out negative.
            const barHeight = Math.max(height - getYCoord(p), 0);
            return (
              <rect
                key={`rect-${p.x}`}
                fill={COLOR_MAP.GREY_1}
                x={xScale(p.x) - barWidth / 2}
                y={yScale(p.y)}
                width={barWidth}
                height={barHeight}
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
                strokeWidth={strokeWidth}
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
