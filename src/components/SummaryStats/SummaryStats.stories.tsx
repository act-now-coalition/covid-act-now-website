import React from 'react';
import regions from 'common/regions';
import { useProjectionsFromRegion } from 'common/utils/model';
import SummaryStats from './SummaryStats';

export default {
  title: 'Building Blocks/SummaryStats',
  component: SummaryStats,
};

export const California = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);

  if (!projections) {
    return null;
  }

  return <SummaryStats stats={projections.getMetricValues()} />;
};
