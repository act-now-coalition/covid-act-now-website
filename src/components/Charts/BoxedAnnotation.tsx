import React, { useRef } from 'react';
import { Group } from '@vx/group';
import useSvgBox from './useSvgBox';

/**
 * This component renders text within a rectangle. In SVG, the size of a text
 * element is known only at rendering time, so we need to measure and update
 * the width and height of the rectangle.
 *
 * The coordinates (x, y) correspond to the position of the text element in its
 * SVG context. Note that the alignment of the text relative to (x, y) depends on
 * the style properties `text-anchor` and `dominant-baseline`, which allows us
 * to use this component and control alignment with styled components. See
 * `TextAnnotation` and `RegionAnnotation` in `Charts.style.ts` for examples.
 */
export const BoxedAnnotation = ({
  x,
  y,
  text,
  padding = 2,
}: {
  x: number;
  y: number;
  text: string;
  padding?: number;
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const { top, left, height, width } = useSvgBox(textRef);
  return (
    <Group left={x} top={y}>
      <rect
        y={top - padding}
        x={left - padding}
        width={Math.abs(width + 2 * padding)}
        height={Math.abs(height + 2 * padding)}
      />
      <text ref={textRef}>{text}</text>
    </Group>
  );
};

export default BoxedAnnotation;
