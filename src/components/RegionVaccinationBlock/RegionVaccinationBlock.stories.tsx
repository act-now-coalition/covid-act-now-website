import React from 'react';
import regions from 'common/regions';
import RegionVaccinationBlock from './RegionVaccinationBlock';

export default {
  title: 'Shared Components/RegionVaccinationBlock',
  component: RegionVaccinationBlock,
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('01');
  return <RegionVaccinationBlock region={region} />;
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('53033');
  return <RegionVaccinationBlock region={region} />;
};

export const Metro = () => {
  const region = regions.findByFipsCodeStrict('35620');
  return <RegionVaccinationBlock region={region} />;
};
