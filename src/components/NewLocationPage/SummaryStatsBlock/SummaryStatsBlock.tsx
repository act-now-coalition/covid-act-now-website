import React from 'react';
import SummaryStat from './SummaryStat';
import { BlockWrapper } from './SummaryStatsBlock.style';
import { Metric } from 'common/metricEnum';
import { MetricValues } from 'common/models/Projections';
import { orderedStatMetrics } from './utils';

const SummaryStatsBlock: React.FC<{ stats: MetricValues }> = ({ stats }) => {
  return (
    <BlockWrapper>
      {orderedStatMetrics.map((metric: Metric) => {
        const value = stats[metric] as number;
        return <SummaryStat metric={metric} value={value} key={metric} />;
      })}
    </BlockWrapper>
  );
};

export default SummaryStatsBlock;
