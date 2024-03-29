import React from 'react';
import VaccinationEligibilityBlock from './VaccinationEligibilityBlock';
import regions from 'common/regions';

export default {
  title: 'Location Page/VaccinationEligibilityBlock',
  component: VaccinationEligibilityBlock,
};

export const Colorado = () => {
  const state = regions.findByFipsCodeStrict('08');
  return <VaccinationEligibilityBlock region={state} />;
};
