import React from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';

const LineChart = ({
  data,
  x = d => d.x,
  y = d => d.y,
}: {
  data: any[];
  x: (d: any) => number;
  y: (d: any) => number;
}) => {
  return (
    <Group className="line-chart">
      <LinePath
        className="chart__line"
        data={data}
        x={x}
        y={y}
        curve={curveNatural}
      />
    </Group>
  );
};

export default LineChart;
