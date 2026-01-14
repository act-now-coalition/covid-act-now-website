import React from 'react';
import LocationOverview from './LocationOverview';
import { useLocationSummariesForFips } from 'common/hooks';
import regions from 'common/regions';

export default {
  title: 'Location Page/Location overview',
  component: LocationOverview,
};

export const NewYork = () => {
  const region = regions.findByFipsCodeStrict('36');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }
  return <LocationOverview region={region} locationSummary={locationSummary} />;
};
