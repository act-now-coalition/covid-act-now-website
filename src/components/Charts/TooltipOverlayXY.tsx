import React, { useMemo } from 'react';
import { Group } from '@vx/group';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';

/**
 * `TooltipOverlayXY` divides the area given by `width` and `height`
 * into regions such that each region is the set of points in the
 * region closer to each point in `data`. This is useful for knowing
 * the closest point in the dataset to the point hovered/clicked
 * by the user, so we can show the tooltip even if they are not
 * the point exactly.
 *
 * See https://en.wikipedia.org/wiki/Voronoi_diagram
 */
const TooltipOverlayXY = <T extends unknown>({
  data,
  x,
  y,
  width,
  height,
  onMouseOver,
  onMouseOut,
}: {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  width: number;
  height: number;
  onMouseOver: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: T,
  ) => void;
  onMouseOut: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}) => {
  const hoverPolygons = useMemo(() => {
    const voronoiDiagram = voronoi({ x, y, width, height })(data);
    return voronoiDiagram.polygons();
  }, [x, y, width, height, data]);

  return (
    <Group>
      {hoverPolygons.map((polygon, i) => (
        <VoronoiPolygon
          key={`polygon-${i}`}
          polygon={polygon}
          fillOpacity={0}
          onMouseEnter={e => onMouseOver(e, polygon.data)}
          onMouseOut={onMouseOut}
        />
      ))}
    </Group>
  );
};

export default TooltipOverlayXY;
