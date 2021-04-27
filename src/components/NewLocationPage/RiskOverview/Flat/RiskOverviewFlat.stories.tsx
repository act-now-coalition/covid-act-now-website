import React, { Fragment } from 'react';
import RiskOverviewFlat from './RiskOverviewFlat';
import { useLocationSummariesForFips } from 'common/hooks';
import regions from 'common/regions';

export default {
  title: 'Location page redesign/Risk overview flat',
  component: RiskOverviewFlat,
};

export const NewYork = () => {
  const region = regions.findByFipsCodeStrict('36');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }
  return <RiskOverviewFlat region={region} locationSummary={locationSummary} />;
};
