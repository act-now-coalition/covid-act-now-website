import React from 'react';
import { ScreenshotReady } from 'components/Screenshot';
import { EmptyChart as EmtpyChartStyle } from './Explore.style';

const EmptyChart: React.FC<{
  height: number;
}> = ({ height, children }) => (
  <EmtpyChartStyle style={{ height }}>
    {children}
    <ScreenshotReady />
  </EmtpyChartStyle>
);

export default EmptyChart;
