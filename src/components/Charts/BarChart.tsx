import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';

interface BarChartProps<T> {
  data: T[];
  x: (d: T) => number | undefined;
  y: (d: T) => number | undefined;
  yMax: number;
  barWidth: number;
}

const BarChart = <T extends unknown>({
  data,
  x,
  y,
  yMax,
  barWidth,
}: BarChartProps<T>) => {
  return (
    <Group>
      {data.map((d, i) => {
        const x0 = x(d)!;
        const y0 = y(d)!;
        return (
          <Bar
            key={`bar-${i}`}
            x={x0}
            y={y0}
            width={barWidth}
            height={yMax - y0}
          />
        );
      })}
    </Group>
  );
};

export default BarChart;
