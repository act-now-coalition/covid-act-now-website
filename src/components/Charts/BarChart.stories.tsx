import React from 'react';
import BarChart from './BarChart';
import { max as d3max } from 'd3-array';
import { scaleBand, scaleLinear } from '@vx/scale';

export default {
  title: 'Charts/BarChart',
  component: BarChart,
};

const width = 400;
const height = 300;

interface Point {
  x: Date;
  y: number;
}

export const Simple = () => {
  const data: Point[] = [
    { x: new Date('2020-08-01'), y: 10 },
    { x: new Date('2020-08-02'), y: 12 },
    { x: new Date('2020-08-03'), y: 15 },
    { x: new Date('2020-08-04'), y: 11 },
    { x: new Date('2020-08-05'), y: 16 },
    { x: new Date('2020-08-06'), y: 11 },
    { x: new Date('2020-08-07'), y: 6 },
  ];

  const getX = (p: Point) => p.x;
  const getY = (p: Point) => p.y;

  const xScale = scaleBand<Date>({
    rangeRound: [0, width],
    domain: data.map(getX),
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    rangeRound: [0, height],
    domain: [d3max(data, getY), 0],
  });

  return (
    <svg width={width} height={height}>
      <BarChart
        data={data}
        x={p => xScale(getX(p))}
        y={p => yScale(getY(p))}
        barWidth={xScale.bandwidth()}
        yMin={0}
        yMax={height}
      />
    </svg>
  );
};
