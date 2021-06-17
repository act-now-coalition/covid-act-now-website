import regions from 'common/regions';
import React from 'react';
import VaccineTooltip from './VaccineTooltip';

export default {
  title: 'Shared Components/USVaccineMap/VaccineTooltip',
  component: VaccineTooltip,
};

const idaho = regions.findByStateCodeStrict('ID');

export const Example = () => {
  const props = {
    state: idaho,
    vaccinationsCompleted: 0.29,
    vaccinationsInitiated: 0.35,
  };

  return <VaccineTooltip {...props} />;
};

export const Mobile = () => {
  const props = {
    state: idaho,
    vaccinationsCompleted: 0.29,
    vaccinationsInitiated: 0.35,
    isMobileVersion: true,
  };

  return <VaccineTooltip {...props} />;
};
