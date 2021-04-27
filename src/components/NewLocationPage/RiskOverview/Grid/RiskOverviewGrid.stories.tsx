import React, { Fragment } from 'react';
import RiskOverviewGrid from './RiskOverviewGrid';
import { useLocationSummariesForFips } from 'common/hooks';
import regions from 'common/regions';

export default {
  title: 'Location page redesign/Risk overview grid',
  component: RiskOverviewGrid,
};

export const NewYork = () => {
  const region = regions.findByFipsCodeStrict('36');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }
  return <RiskOverviewGrid region={region} locationSummary={locationSummary} />;
};
