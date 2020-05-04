import React from 'react';
import { isUndefined as _isUndefined } from 'lodash';
import { LinePath } from '@vx/shape';
import { curveNatural } from '@vx/curve';

const LineChart = ({
  data,
  x = d => d.x,
  y = d => d.y,
  clipPath,
  className,
}: {
  data: any[];
  x: (d: any) => number;
  y: (d: any) => number;
  clipPath?: string;
  className?: string;
}) => {
  const clipPathProp = _isUndefined(clipPath)
    ? {}
    : { clipPath: `url(#${clipPath})` };

  return (
    <LinePath
      className={`chart__line ${className}`}
      data={data}
      x={x}
      y={y}
      curve={curveNatural}
      {...clipPathProp}
    />
  );
};

export default LineChart;
