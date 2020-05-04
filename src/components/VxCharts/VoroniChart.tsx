import React from 'react';
import { Group } from '@vx/group';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';

const VoroniChart = ({
  data,
  x,
  y,
  width,
  height,
}: {
  data: any[];
  x: (d: any) => number;
  y: (d: any) => number;
  width: number;
  height: number;
}) => {
  const voronoiDiagram = voronoi({ x, y, width, height })(data);
  const polygons = voronoiDiagram.polygons();

  return (
    <Group>
      {polygons.map((polygon, i) => (
        <VoronoiPolygon
          key={`polygon-${i}`}
          polygon={polygon}
          stroke="#ffffff"
          strokeWidth={1}
          fill="black"
          fillOpacity={0.2}
        />
      ))}
    </Group>
  );
};

export default VoroniChart;
