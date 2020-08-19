import React from 'react';
import { localPoint } from '@vx/event';
import { ScaleTime } from 'd3-scale';

const ChartOverlay: React.FC<{
  width: number;
  height: number;
  xScale: ScaleTime<number, number>;
  onMouseOver: (x: number) => void;
  onMouseLeave: () => void;
  barWidth: number;
}> = ({ width, height, onMouseOver, onMouseLeave }) => {
  const onMouseMove = (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    const { x: xSvg } = localPoint(event) || { x: 0 };
    onMouseOver(xSvg);
  };
  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fillOpacity={0}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default ChartOverlay;
