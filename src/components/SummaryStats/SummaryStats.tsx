import React from 'react';
import SummaryStat from './SummaryStat';
import { INFECTION_RATE_STATUSES, Level } from 'enums/status';
import { SummaryStatsWrapper, SummaryHolder } from './SummaryStats.style';

const SummaryStats = (props: { stats: [] }) => {
  return (
    <SummaryHolder>
      <SummaryStatsWrapper>
        <SummaryStat
          name={'Testing'}
          value={'1.5'}
          status={INFECTION_RATE_STATUSES[Level.LOW]}
        />
        <SummaryStat
          name={'Postive Rates'}
          value={'.5'}
          status={INFECTION_RATE_STATUSES[Level.HIGH]}
        />
        <SummaryStat
          name={'Rate of Infection'}
          value={'.15'}
          status={INFECTION_RATE_STATUSES[Level.MEDIUM]}
        />
      </SummaryStatsWrapper>
    </SummaryHolder>
  );
};

export default SummaryStats;
