import React from 'react';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { GridRows } from '@vx/grid';
import { Zones } from '../../enums/zones';
import { calculateYTicks } from './utils';

const GridZones = ({
  minY,
  maxY,
  zones,
  yScale,
  width,
}: {
  minY: number;
  maxY: number;
  zones: Zones;
  yScale: (num: number) => number;
  width: number;
}) => {
  const ticks = calculateYTicks(minY, maxY, zones);
  return (
    <Group>
      <AxisLeft
        axisClassName="chart__axis"
        scale={yScale}
        tickValues={ticks}
        hideAxisLine
        hideTicks
      />
      <GridRows
        className="chart__grid chart__grid--zones"
        scale={yScale}
        width={width}
        tickValues={ticks}
      />
    </Group>
  );
};

export default GridZones;
