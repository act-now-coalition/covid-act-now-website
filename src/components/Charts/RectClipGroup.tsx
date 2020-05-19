import React from 'react';
import { Group } from '@vx/group';
import { RectClipPath } from '@vx/clip-path';
import { randomizeId } from './utils';

/**
 * This component hides anything outside a rectangular region defined by the
 * given `width` and `height`. By default, SVG elements don't have boundaries,
 * and are cropped only by the boundaries of the SVG element.
 *
 * To create a clipping area, we need to add an element with the clipping shape,
 * in our case, that's a rectangle and assign it a unique ID in the DOM. The
 * element that we want to clip needs to have the `clip-path` property, and the
 * value must be a reference to the clipping path.
 */
const RectClipGroup: React.FunctionComponent<{
  width: number;
  height: number;
  x?: number;
  y?: number;
}> = ({ width, height, x = 0, y = 0, children }) => {
  // Random ID for the clipping shape, to ensure that is unique in the DOM tree.
  const clipPathId = randomizeId('clip-path');
  return (
    <>
      <RectClipPath x={x} y={y} id={clipPathId} width={width} height={height} />
      <Group clipPath={`url(#${clipPathId})`}>{children}</Group>
    </>
  );
};

export default RectClipGroup;
