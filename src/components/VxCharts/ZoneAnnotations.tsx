import React from 'react';
import { Group } from '@vx/group';
import { Zones } from '../../enums/zones';

// TODO(@pnavarrc) - define types for the elements
const computeZoneRegions = (minY: number, maxY: number, zones: Zones) => [
  {
    y: (minY + zones.LOW.upperLimit) / 2,
    name: zones.LOW.name,
    color: zones.LOW.color,
  },
  {
    y: (zones.LOW.upperLimit + zones.MEDIUM.upperLimit) / 2,
    name: zones.MEDIUM.name,
    color: zones.MEDIUM.color,
  },
  {
    y: (zones.MEDIUM.upperLimit + maxY) / 2,
    name: zones.HIGH.name,
    color: zones.HIGH.color,
  },
];

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
  dx: number;
}) => {
  const zoneRegions = computeZoneRegions(minY, maxY, zones);
  return (
    <Group className="chart-zone-annotations">
      {zoneRegions.map((zone, i) => {
        return (
          <Group className={groupZoneClassName(zone)}>
            <text key={`zone-annotation-${i}`} x={0} dx={dx} y={yScale(zone.y)}>
              {zone.name}
            </text>
          </Group>
        );
      })}
    </Group>
  );
};

export default ZoneAnnotations;
