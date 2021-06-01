import React from 'react';
import ChartTab from './ChartTab';
import { Metric } from 'common/metricEnum';
import { TabsContainer } from './ChartTab.style';

export default {
  title: 'Location page redesign/Chart Tabs',
};

export const CaseDensityTab = () => {
  return <ChartTab metric={Metric.CASE_DENSITY} value={25} />;
};

export const ChartGrowthRateTab = () => {
  return <ChartTab metric={Metric.CASE_GROWTH_RATE} value={0.25} />;
};

export const HospitalUsageTab = () => {
  return <ChartTab metric={Metric.HOSPITAL_USAGE} value={0.5} />;
};

export const PositiveTestTab = () => {
  return <ChartTab metric={Metric.POSITIVE_TESTS} value={0.75} />;
};

export const VaccinationTab = () => {
  return <ChartTab metric={Metric.VACCINATIONS} value={1} />;
};

export const MultipleTabs = () => {
  return (
    <TabsContainer>
      <ChartTab metric={Metric.CASE_DENSITY} value={25} />
      <ChartTab metric={Metric.CASE_GROWTH_RATE} value={0.25} />
      <ChartTab metric={Metric.HOSPITAL_USAGE} value={0.5} />
    </TabsContainer>
  );
};
