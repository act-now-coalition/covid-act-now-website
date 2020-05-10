import React from 'react';
import {
  Tooltip,
  TooltipTitle,
  TooltipBody,
} from '../components/VxCharts/Charts.style';

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
