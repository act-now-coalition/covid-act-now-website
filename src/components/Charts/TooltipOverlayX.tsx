import React from 'react';
import { localPoint } from '@vx/event';

/**
 * The TooltipOverlayX captures mouse movements in the rectangle defined by
 * the points (0, 0) to (width, height). It calls `onMouseOver` passing
 * the (x, y) coordinates of the point relative to its container SVG element.
 *
 * It calls `onMouseLeave` when the cursor leaves the hovering rectangle.
 */
const TooltipOverlayX: React.FC<{
  width: number;
  height: number;
  onMouseOver: ({ x, y }: { x: number; y: number }) => void;
  onMouseLeave: () => void;
}> = ({ width, height, onMouseOver, onMouseLeave }) => {
  const onMouseMove = (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    const { x, y } = localPoint(event) || { x: 0, y: 0 };
    onMouseOver({ x, y });
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

export default TooltipOverlayX;
