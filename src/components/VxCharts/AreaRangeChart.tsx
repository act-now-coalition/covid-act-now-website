import React from 'react';
import { isUndefined as _isUndefined } from 'lodash';
import { Group } from '@vx/group';
import { Area } from '@vx/shape';
import { curveNatural } from '@vx/curve';

const AreaRangeChart = ({
  data,
  x = d => d.x,
  y0 = d => d.y0,
  y1 = d => d.y1,
}: {
  data: any[];
  x: (d: any) => number;
  y0?: (d: any) => number;
  y1?: (d: any) => number;
}) => {
  if (_isUndefined(y0) || _isUndefined(y1)) {
    return null;
  }
  return (
    <Group className="chart-area-range">
      <Area
        className="chart__area"
        data={data}
        x={x}
        y0={y0}
        y1={y1}
        curve={curveNatural}
      />
    </Group>
  );
};

export default AreaRangeChart;
