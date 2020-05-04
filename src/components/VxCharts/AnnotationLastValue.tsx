import React from 'react';
import { formatDecimal, isDefined, last } from './utils';

const AnnotationLastValue = ({
  data,
  x,
  y,
  xScale,
  yScale,
  labelFormatter = formatDecimal,
  dx = 5,
}: {
  data: any[];
  x: (num: any) => Date;
  y: (num: any) => number;
  yScale: (num: number) => number;
  xScale: (date: Date) => number;
  labelFormatter?: (num: number) => string;
  dx?: number;
}) => {
  const lastPoint = last(data.filter(d => isDefined(x(d)) && isDefined(y(d))));
  const [xValue, yValue] = [x(lastPoint), y(lastPoint)];
  return (
    <text
      className="chart-annotation chart-annotation--current-value"
      x={xScale(xValue)}
      y={yScale(yValue)}
      dx={5}
    >
      {labelFormatter(yValue)}
    </text>
  );
};

export default AnnotationLastValue;
