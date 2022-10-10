import React from 'react';
import USRiskMap from './USRiskMap';

export default {
  title: 'Components/USRiskMap',
  component: USRiskMap,
  argTypes: {
    onClick: () => {},
    showCounties: false,
  },
};

export const States = (args: any) => (
  <div style={{ width: 600 }}>
    <USRiskMap {...args} />
  </div>
);

export const Counties = (args: any) => (
  <div style={{ width: 600 }}>
    <USRiskMap {...args} showCounties />
  </div>
);
