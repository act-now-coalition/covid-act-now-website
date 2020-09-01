import React from 'react';
import { EmptyChart as EmtpyChartStyle } from './Explore.style';

const EmptyChart: React.FC<{
  height: number;
}> = ({ height, children }) => (
  <EmtpyChartStyle style={{ height }}>{children}</EmtpyChartStyle>
);

export default EmptyChart;
