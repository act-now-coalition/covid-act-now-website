import React, { useMemo } from 'react';
import { flatten } from 'lodash';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';
import { Series } from './interfaces';
import { Column } from 'common/models/Projection';

interface HoverPointInfo {
  x: number;
  y: number;
  seriesIndex: number;
  pointIndex: number;
}

/**
 * This component makes it easier for the user to click or hover on a point
 * in the chart. Given a set of points, this component divides the chart area
 * into regions "centered" around each data point.
 *
 * See https://en.wikipedia.org/wiki/Voronoi_diagram for more details.
 **/
const SeriesTooltipOverlay: React.FC<{
  series: Series[];
  width: number;
  height: number;
  x: (p: Column) => number;
  y: (p: Column) => number;
}> = ({ series, width, height, x, y }) => {
  const hoverPoints = getHoverPoints(series);
  const hoverPolygons = useMemo(() => {
    const voronoiDiagram = voronoi<HoverPointInfo>({ x, y, width, height })(
      hoverPoints,
    );
    return voronoiDiagram.polygons();
  }, [hoverPoints, width, height, x, y]);
  return (
    <g>
      {hoverPolygons.map((polygon, i) => (
        <VoronoiPolygon
          key={`hover-polygon-${i}`}
          polygon={polygon}
          fillOpacity={0.1}
          stroke="white"
        />
      ))}
    </g>
  );
};

/**
 * Returns an array containing the points for all the series, along with
 * the seriesIndex and pointIndex. This information will be useful in the
 * chart to render the tooltip and other hover markers.
 */
function getHoverPoints(series: Series[]): HoverPointInfo[] {
  return flatten(
    series.map(({ data }, seriesIndex) =>
      data.map((point, pointIndex) => ({ ...point, seriesIndex, pointIndex })),
    ),
  );
}

export default SeriesTooltipOverlay;
