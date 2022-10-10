import React from 'react';
import { TooltipMode } from './USMapTooltip';
import USVaccineMap from './USVaccineMap';

export default {
  title: 'Components/USVaccineMap',
  component: USVaccineMap,
  argTypes: {
    onClick: () => {},
    showCounties: false,
  },
};

export const States = (args: any) => (
  <div style={{ width: 600 }}>
    <USVaccineMap {...args} tooltipMode={TooltipMode.ACTIVATE_ON_HOVER} />
  </div>
);

export const StatesMobile = (args: any) => (
  <div style={{ width: 600 }}>
    <USVaccineMap {...args} tooltipMode={TooltipMode.ACTIVATE_ON_CLICK} />
  </div>
);

export const Counties = (args: any) => (
  <div style={{ width: 600 }}>
    <USVaccineMap
      {...args}
      showCounties
      tooltipMode={TooltipMode.ACTIVATE_ON_HOVER}
    />
  </div>
);
