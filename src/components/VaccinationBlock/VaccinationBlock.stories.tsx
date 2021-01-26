import React from 'react';
import regions from 'common/regions';
import VaccinationBlock from './VaccinationBlock';

export default {
  title: 'Shared Components/VaccinationBlock',
  component: VaccinationBlock,
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('01');
  return <VaccinationBlock region={region} />;
};
