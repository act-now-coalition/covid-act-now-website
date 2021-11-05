import React from 'react';
import WorldMap from './WorldMap';

export default {
  title: 'Shared Components/WorldMap',
  component: WorldMap,
};

const getColorByNationId = (nationId: string) => {
  const num = parseInt(nationId, 10);
  const purples = ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'];
  const colorIndex = num % purples.length;
  return purples[colorIndex];
};

export const Example = () => (
  <WorldMap width={900} height={600} getColor={getColorByNationId} />
);
