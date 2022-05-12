import React from 'react';
import { curveMonotoneX } from '@vx/curve';
import RectClipGroup from './RectClipGroup';
import { LinePath } from '@vx/shape';
import { ScaleTime } from 'd3-scale';

type Point = {
  x: number;
  y: any;
};

export const CDC_FRAMEWORK_START_DATE = new Date('2022-04-18');

const FrameworkOverlay: React.FC<{
  data: Point[];
  width: number;
  height: number;
  getXCoord: (p: Point) => number;
  getYCoord: (p: Point) => number;
  xScale: ScaleTime<number, number>;
}> = ({ data, width, height, getXCoord, getYCoord, xScale }) => {
  const overlayWidth = xScale(CDC_FRAMEWORK_START_DATE);
  return (
    <>
      <RectClipGroup width={overlayWidth} height={height} topPadding={5}>
        <LinePath
          data={data}
          x={getXCoord}
          y={getYCoord}
          width={width}
          curve={curveMonotoneX}
          stroke="black"
          strokeWidth="3"
        />
      </RectClipGroup>
      <line
        x1={overlayWidth}
        x2={overlayWidth}
        y1={0}
        y2={overlayWidth}
        stroke="black"
        strokeDasharray="3 3"
      />
    </>
  );
};

export default FrameworkOverlay;
