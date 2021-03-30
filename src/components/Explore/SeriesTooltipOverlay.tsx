import React, { useMemo } from 'react';
import flatten from 'lodash/flatten';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';
import { Group } from '@vx/group';
import { Series } from './interfaces';
import { Column } from 'common/models/Projection';

export interface HoverPointInfo {
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
  seriesList: Series[];
  width: number;
  height: number;
  x: (p: Column) => number;
  y: (p: Column) => number;
  onMouseOver: (pointInfo: HoverPointInfo) => void;
  onMouseOut: () => void;
}> = ({ seriesList, width, height, x, y, onMouseOver, onMouseOut }) => {
  const hoverPoints = getHoverPoints(seriesList);
  const hoverPolygons = useMemo(() => {
    const voronoiDiagram = voronoi<HoverPointInfo>({ x, y, width, height })(
      hoverPoints,
    );
    return voronoiDiagram.polygons();
  }, [hoverPoints, width, height, x, y]);
  return (
    <Group>
      {hoverPolygons.map((polygon, i) => (
        <VoronoiPolygon
          key={`hover-polygon-${i}`}
          polygon={polygon}
          fillOpacity={0}
          onMouseEnter={e => onMouseOver(polygon.data)}
          onMouseOut={onMouseOut}
        />
      ))}
    </Group>
  );
};

/**
 * Returns an array containing the points for all the series, along with
 * the seriesIndex and pointIndex. This information will be useful in the
 * chart to render the tooltip and other hover markers.
 */
function getHoverPoints(seriesList: Series[]): HoverPointInfo[] {
  return flatten(
    seriesList.map(({ data }, seriesIndex) =>
      data.map((point, pointIndex) => ({ ...point, seriesIndex, pointIndex })),
    ),
  );
}

export default SeriesTooltipOverlay;
