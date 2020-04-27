import React from 'react';
import SummaryStat from './SummaryStat';
import { ChartType } from 'enums/zones';
import { SummaryStatsWrapper, SummaryHolder } from './SummaryStats.style';

const SummaryStats = (props: { stats: [] }) => {
  return (
    <SummaryHolder>
      <SummaryStatsWrapper>
        <SummaryStat
          chartType={ChartType.CASE_GROWTH_RATE}
          value={1.5}
        />
        <SummaryStat
          chartType={ChartType.POSITIVE_TESTS}
          value={.5}
        />
        <SummaryStat
          chartType={ChartType.HOSPITAL_USAGE}
          value={.15}
        />
      </SummaryStatsWrapper>
    </SummaryHolder>
  );
};

export default SummaryStats;
