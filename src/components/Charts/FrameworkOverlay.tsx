import React from 'react';
import { curveMonotoneX } from '@vx/curve';
import RectClipGroup from './RectClipGroup';
import { LinePath } from '@vx/shape';
import { formatDateTime, DateFormat } from 'common/utils/time-utils';
import { ScaleTime } from 'd3-scale';

type Point = {
  x: number;
  y: any;
};

const FrameworkOverlay: React.FC<{
  data: Point[];
  width: number;
  height: number;
  getXCoord: (p: Point) => number;
  getYCoord: (p: Point) => number;
  xScale: ScaleTime<number, number>;
}> = ({ data, width, height, getXCoord, getYCoord, xScale }) => {
  const dateFrameworkUpdate = new Date('2022-04-12');
  const overlayWidth = xScale(dateFrameworkUpdate);
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
      <text x={overlayWidth} y={10} dx={5} fontSize={12}>
        {formatDateTime(dateFrameworkUpdate, DateFormat.MMM_D_YYYY)}
      </text>
    </>
  );
};

export default FrameworkOverlay;
