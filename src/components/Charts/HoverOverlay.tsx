import React, { useMemo } from 'react';
import { Group } from '@vx/group';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';

const HoverOverlay = ({
  data,
  x,
  y,
  width,
  height,
  onMouseOver,
  onMouseOut,
}: {
  data: any[];
  x: (d: any) => number;
  y: (d: any) => number;
  width: number;
  height: number;
  onMouseOver: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: any,
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

export default HoverOverlay;
