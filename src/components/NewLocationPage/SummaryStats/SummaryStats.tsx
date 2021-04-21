import React from 'react';
import Stat from './Stat';
import { Metric } from 'common/metricEnum';

const orderedStatMetrics = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.VACCINATIONS,
];

const SummaryStats: React.FC<{ stats: any }> = ({ stats }) => {
  console.log('stats', stats);
  return (
    <>
      {orderedStatMetrics.map((metric: Metric) => {
        const value = stats[metric] as number;
        return <Stat metric={metric} value={value} />;
      })}
    </>
  );
};

export default SummaryStats;
