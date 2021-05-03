import React, { useEffect, useState } from 'react';
import AboveTheFold from './AboveTheFold';
import regions from 'common/regions';
import { Projection } from 'common/models/Projection';
import { getProjectionForRegion } from '../SparkLineBlock/utils';
import { useLocationSummariesForFips } from 'common/hooks';

export default {
  title: 'Location page redesign/Above the fold',
  component: AboveTheFold,
};

export const California = () => {
  const region = regions.findByFipsCodeStrict('06');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};

export const Missouri = () => {
  const region = regions.findByFipsCodeStrict('29');
  const [projection, setProjection] = useState<Projection>();
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(region);
    fetchProjection().then(setProjection);
  }, [region]);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};

export const MaricopaCounty = () => {
  const region = regions.findByFipsCodeStrict('04013');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};

export const EastBatonRougeParish = () => {
  const region = regions.findByFipsCodeStrict('22033');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};

export const AtlantaMetro = () => {
  const region = regions.findByFipsCodeStrict('12060');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};

export const BostonMetro = () => {
  const region = regions.findByFipsCodeStrict('14460');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return <AboveTheFold region={region} locationSummary={locationSummary} />;
};
