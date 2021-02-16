import { useState, useEffect, useLayoutEffect } from 'react';

/**
 * Returns an object with the width, height, top and left client coordinates
 * of a SVGGraphicsElement.
 *
 * At rendering time, text elements in SVG don't have a size yet, which makes
 * it difficult to align other elements around them. This hook takes a reference,
 * measures the bounding box of the referenced element and returns its position
 * and size. This allows other elements to use the dimensions of the text element
 * after rendering.
 *
 * Example:
 *
 *   const textRef = useRef(null);
 *   const { width, height, top, left } = useSvgBox(ref);
 *
 *   // more code...
 *   <rect x={top} y={left} width={width} height={height} />
 *   <text x={5} y={5} ref={textRef}>svg text</text>
 */
const useSvgBox = (ref: React.RefObject<SVGTextElement>) => {
  const [box, setBox] = useState({ width: 0, height: 0, top: 0, left: 0 });
  // FIXME: hack for SSR
  // useLayoutEffect
  useEffect(() => {
    if (ref?.current) {
      const { width, height, x, y } = ref.current.getBBox();
      setBox({ width, height, top: y, left: x });
    }
  }, [ref]);

  return box;
};

export default useSvgBox;
