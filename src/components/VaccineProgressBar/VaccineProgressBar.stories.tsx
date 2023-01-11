import React from 'react';
import { VaccineProgressBar } from './VaccineProgressBar';

export default {
  title: 'Components/VaccineProgressBar',
  component: VaccineProgressBar,
};

export const Example = () => {
  return <VaccineProgressBar locationName="Idaho" vaccinationsRatio={0.45} />;
};
