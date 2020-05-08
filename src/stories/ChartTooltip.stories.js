import React from 'react';
import Tooltip from '../components/VxCharts/Tooltip';
import {
  TooltipTitle,
  TooltipBody,
} from '../components/VxCharts/Tooltip.style';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const Rt = () => (
  <div style={{ position: 'relative' }}>
    <Tooltip top={100} left={100}>
      <TooltipTitle>Saturday, Apr 4, 2020</TooltipTitle>
      <TooltipBody>Rt 1.61</TooltipBody>
    </Tooltip>
  </div>
);
