import React from 'react';
import SummaryStatsBlock from './SummaryStatsBlock';
import { useLocationSummariesForFips } from 'common/hooks';
import { summaryToStats } from './utils';

export default {
  title: 'Location page redesign/Summary stats',
  component: SummaryStatsBlock,
};

export const Connecticut = () => {
  const locationSummary = useLocationSummariesForFips('09');

  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);
  return <SummaryStatsBlock stats={stats} />;
};
