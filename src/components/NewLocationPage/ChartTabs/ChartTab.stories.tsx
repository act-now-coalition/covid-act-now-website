import React from 'react';
import ChartTab from './ChartTab';
import { Metric } from 'common/metricEnum';

export default {
  title: 'Location page redesign/Chart Tabs',
};

export const CaseDensityTab = () => {
  return <ChartTab metric={Metric.CASE_DENSITY} value={25} />;
};

export const ChartGrowthRateTab = () => {
  return <ChartTab metric={Metric.CASE_GROWTH_RATE} value={0.25} />;
};
