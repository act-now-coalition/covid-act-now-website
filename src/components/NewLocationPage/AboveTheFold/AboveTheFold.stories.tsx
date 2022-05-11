import React from 'react';
import AboveTheFold from './AboveTheFold';
import regions from 'common/regions';
import { useLocationSummariesForFips } from 'common/hooks';

export default {
  title: 'Location Page/Above the fold',
  component: AboveTheFold,
};

const onClickProps = {
  onClickAlertSignup: () => {},
  onClickShare: () => {},
  onClickSparkLine: () => {},
  onClickTransmissionMetricsCard: () => {},
  onClickMasksCard: () => {},
};

export const California = () => {
  const region = regions.findByFipsCodeStrict('06');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};

export const Missouri = () => {
  const region = regions.findByFipsCodeStrict('29');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};

export const MaricopaCounty = () => {
  const region = regions.findByFipsCodeStrict('04013');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};

export const EastBatonRougeParish = () => {
  const region = regions.findByFipsCodeStrict('22033');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};

export const AtlantaMetro = () => {
  const region = regions.findByFipsCodeStrict('12060');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};

export const BostonMetro = () => {
  const region = regions.findByFipsCodeStrict('14460');
  const locationSummary = useLocationSummariesForFips(region.fipsCode);

  if (!locationSummary) {
    return null;
  }

  return (
    <AboveTheFold
      region={region}
      locationSummary={locationSummary}
      {...onClickProps}
    />
  );
};
