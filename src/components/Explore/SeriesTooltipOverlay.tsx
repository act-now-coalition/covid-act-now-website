import React, { useMemo } from 'react';
import { flatten } from 'lodash';
import { Group } from '@vx/group';
import { voronoi, VoronoiPolygon } from '@vx/voronoi';
import { Column } from 'common/models/Projection';
import { Series } from './interfaces';

interface SeriesHoverPointInfo {
  x: number;
  y: number;
  seriesIndex: number;
  pointIndex: number;
}

const flattenSeries = (series: Series[]): SeriesHoverPointInfo[] =>
  flatten(
    series.map(({ data }, seriesIndex) =>
      data.map((point, pointIndex) => {
        return { ...point, pointIndex, seriesIndex };
      }),
    ),
  );

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
const SeriesTooltipOverlayX = <T extends unknown>({
  series,
  x,
  y,
  width,
  height,
  onMouseOver,
  onMouseOut,
}: {
  series: Series[];
  x: (d: Column) => number;
  y: (d: Column) => number;
  width: number;
  height: number;
  onMouseOver: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: SeriesHoverPointInfo,
  ) => void;
  onMouseOut: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}) => {
  const data = useMemo(() => flattenSeries(series), [series]);

  const hoverPolygons = useMemo(() => {
    const voronoiDiagram = voronoi<SeriesHoverPointInfo>({
      x,
      y,
      width,
      height,
    })(data);
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

export default SeriesTooltipOverlayX;
