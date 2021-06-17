import React from 'react';
import USVaccineMap from './USVaccineMap';

export default {
  title: 'Shared Components/USVaccineMap',
  component: USVaccineMap,
  argTypes: {
    onClick: () => {},
    showCounties: false,
  },
};

export const States = (args: any) => (
  <div style={{ width: 600 }}>
    <USVaccineMap {...args} />
  </div>
);

export const Counties = (args: any) => (
  <div style={{ width: 600 }}>
    <USVaccineMap {...args} showCounties />
  </div>
);
