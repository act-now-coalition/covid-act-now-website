import React from 'react';
import Stat from './Stat';
import { Metric } from 'common/metricEnum';
// import { SectionContainer } from '../Shared/Shared.style';
import { StatsWrapper } from './SummaryStats.style';

const orderedStatMetrics = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.VACCINATIONS,
];

const SummaryStats: React.FC<{ stats: any }> = ({ stats }) => {
  console.log('stats', stats);
  return (
    // <SectionContainer>
    <StatsWrapper>
      {orderedStatMetrics.map((metric: Metric) => {
        const value = stats[metric] as number;
        return <Stat metric={metric} value={value} />;
      })}
    </StatsWrapper>
    // </SectionContainer>
  );
};

export default SummaryStats;
