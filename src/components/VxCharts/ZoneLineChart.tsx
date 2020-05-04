import React from 'react';
import { Group } from '@vx/group';
import { Zones } from '../../enums/zones';
import LineChart from './LineChart';
import { RectClipPath } from '@vx/clip-path';
import { computeZoneRegions, randomizeId } from './utils';

const ZoneLineChart = ({
  data,
  x = d => d.x,
  y = d => d.y,
  zones,
  minY,
  maxY,
  yScale,
  width,
}: {
  data: any[];
  x: (d: any) => number;
  y: (d: any) => number;
  zones: Zones;
  minY: number;
  maxY: number;
  yScale: (num: number) => number;
  width: number;
}) => {
  const zoneRegions = computeZoneRegions(minY, maxY, zones);
  return (
    <Group className="chart-zone-line">
      {zoneRegions.map((zone, i) => {
        const clipPathId = randomizeId(`clip-path-zone-${zone.name}`);
        const zoneHeight = yScale(zone.valueFrom) - yScale(zone.valueTo);
        return (
          <Group key={`chart-zone-line-group-${i}`}>
            <RectClipPath
              id={clipPathId}
              width={width}
              y={yScale(zone.valueTo)}
              height={zoneHeight}
            />
            <LineChart
              className={`chart-line--zone-${zone.name.toLowerCase()}`}
              clipPath={clipPathId}
              data={data}
              x={x}
              y={y}
            />
          </Group>
        );
      })}
    </Group>
  );
};

export default ZoneLineChart;
