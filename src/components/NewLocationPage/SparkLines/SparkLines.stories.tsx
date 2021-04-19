import React from 'react';
import SingleSparkLine from './SingleSparkLine';
import { getCapY } from './utils';

export default {
  title: 'Location page redesign/Spark lines',
  component: SingleSparkLine,
};

const data = [
  { x: 0, y: 43.15866676429975 },
  { x: 1, y: 46.15866676429975 },
  { x: 2, y: 47.15866676429975 },
  { x: 3, y: 42.15866676429975 },
  { x: 4, y: 43.15866676429975 },
  { x: 5, y: 44.15866676429975 },
  { x: 6, y: 49.15866676429975 },
  { x: 7, y: 52.15866676429975 },
  { x: 8, y: 50.15866676429975 },
  { x: 9, y: 44.15866676429975 },
  { x: 10, y: 49.15866676429975 },
  { x: 11, y: 50.15866676429975 },
  { x: 12, y: 52.15866676429975 },
  { x: 13, y: 51.15866676429975 },
  { x: 14, y: 69.15866676429975 },
  { x: 15, y: 46.15866676429975 },
  { x: 16, y: 48.15866676429975 },
  { x: 17, y: 55.15866676429975 },
  { x: 18, y: 54.15866676429975 },
  { x: 19, y: 46.15866676429975 },
  { x: 20, y: 47.15866676429975 },
  { x: 21, y: 42.15866676429975 },
  { x: 22, y: 43.15866676429975 },
  { x: 23, y: 44.15866676429975 },
  { x: 24, y: 49.15866676429975 },
  { x: 25, y: 52.15866676429975 },
  { x: 26, y: 50.15866676429975 },
  { x: 27, y: 44.15866676429975 },
  { x: 28, y: 49.15866676429975 },
  { x: 29, y: 50.15866676429975 },
];

const chartWidth = 120;
const chartHeight = 60;

export const Example = () => {
  const capY = getCapY(data);

  return (
    <SingleSparkLine
      data={data}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      capY={capY}
    />
  );
};
