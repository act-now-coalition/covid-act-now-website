import React from 'react';
import { Group } from '@vx/group';
import { Zones } from '../../enums/zones';
import { computeZoneRegions } from './utils';

// TODO(@pnavarrc) - use types for this function
const groupZoneClassName = (zone: any): string =>
  `chart-annotation chart-annotation--zone chart-annotation--zone-${zone.name.toLowerCase()}`;

const ZoneAnnotations = ({
  minY,
  maxY,
  zones,
  yScale,
  dx = -5,
}: {
  minY: number;
  maxY: number;
  zones: Zones;
  yScale: (num: number) => number;
  dx?: number;
}) => {
  const zoneRegions = computeZoneRegions(minY, maxY, zones);
  return (
    <Group className="chart-zone-annotations">
      {zoneRegions.map((zone, i) => {
        const yZone = (zone.valueFrom + zone.valueTo) / 2;
        return (
          <Group
            key={`zone-annotation-${i}`}
            className={groupZoneClassName(zone)}
          >
            <text x={0} dx={dx} y={yScale(yZone)}>
              {zone.name}
            </text>
          </Group>
        );
      })}
    </Group>
  );
};

export default ZoneAnnotations;
