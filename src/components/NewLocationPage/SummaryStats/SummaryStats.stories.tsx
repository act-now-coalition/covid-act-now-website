import React from 'react';
import SummaryStats from './SummaryStats';
import { useLocationSummariesForFips } from 'common/hooks';
import { summaryToStats } from './utils';
import regions from 'common/regions';

export default {
  title: 'Location page redesign/Summary stats',
  component: SummaryStats,
};

export const Connecticut = () => {
  const locationSummary = useLocationSummariesForFips('09');

  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);
  return <SummaryStats stats={stats} />;
};
