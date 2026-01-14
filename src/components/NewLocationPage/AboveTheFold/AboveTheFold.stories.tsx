import React from 'react';
import AboveTheFold from './AboveTheFold';
import regions from 'common/regions';

export default {
  title: 'Location Page/Above the fold',
  component: AboveTheFold,
};

export const California = () => {
  const region = regions.findByFipsCodeStrict('06');

  return <AboveTheFold region={region} />;
};

export const Missouri = () => {
  const region = regions.findByFipsCodeStrict('29');

  return <AboveTheFold region={region} />;
};

export const MaricopaCounty = () => {
  const region = regions.findByFipsCodeStrict('04013');

  return <AboveTheFold region={region} />;
};

export const EastBatonRougeParish = () => {
  const region = regions.findByFipsCodeStrict('22033');

  return <AboveTheFold region={region} />;
};

export const AtlantaMetro = () => {
  const region = regions.findByFipsCodeStrict('12060');

  return <AboveTheFold region={region} />;
};

export const BostonMetro = () => {
  const region = regions.findByFipsCodeStrict('14460');

  return <AboveTheFold region={region} />;
};
