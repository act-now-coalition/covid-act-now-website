import React, { FunctionComponent } from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';

interface BarChartProps<P> {
  data: P[];
  x: (p: P) => number;
  y: (p: P) => number;
  yMin: number;
  yMax: number;
  barWidth: number;
}

const BarChart: FunctionComponent<BarChartProps> = ({
  data,
  x,
  y,
  yMin,
  yMax,
  barWidth,
}) => {
  return (
    <Group>
      {data.map((p, i) => {
        return (
          <Bar
            key={`bar-${i}`}
            x={x(p)}
            y={y(p)}
            width={barWidth}
            height={yMax - y(p)}
          />
        );
      })}
    </Group>
  );
};

export default BarChart;
