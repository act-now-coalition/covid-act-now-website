import React from 'react';
import { RegionChartWrapper } from './RegionChart.style';

const RegionChart = ({
  width = 800,
  height = 600,
}: {
  width: number;
  height: number;
}) => {
  return (
    <RegionChartWrapper>
      <svg className="chart chart--region" width={width} height={height}></svg>
    </RegionChartWrapper>
  );
};

export default RegionChart;
