import React from 'react';
import Map from './Map';

export default {
  title: 'Shared Components/Map',
  component: Map,
  argTypes: {
    onClick: () => {},
    showCounties: false,
  },
};

export const States = (args: any) => (
  <div style={{ width: 600 }}>
    <Map {...args} />
  </div>
);

export const Counties = (args: any) => (
  <div style={{ width: 600 }}>
    <Map {...args} showCounties />
  </div>
);
