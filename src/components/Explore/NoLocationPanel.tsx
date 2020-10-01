import React from 'react';
import { ScreenshotReady } from 'components/Screenshot';
import { EmptyChart as EmtpyChartStyle } from './Explore.style';

const NoLocationPanel: React.FC<{
  height: number;
}> = ({ height }) => (
  <EmtpyChartStyle style={{ height }}>
    <p>Please select states or counties to explore trends.</p>
    <ScreenshotReady />
  </EmtpyChartStyle>
);

export default NoLocationPanel;
