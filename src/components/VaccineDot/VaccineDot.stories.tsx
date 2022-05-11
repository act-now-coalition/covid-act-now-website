import React from 'react';
import VaccineDot, { DotStyle, VaccineDotProps } from './VaccineDot';

export default {
  title: 'Components/VaccineDot',
  component: VaccineDot,
};

export const Default = () => {
  const props: VaccineDotProps = {
    vaccinationsInitiated: 0.35,
  };

  return <VaccineDot {...props} />;
};

export const Hatched = () => {
  const props: VaccineDotProps = {
    vaccinationsInitiated: 0.35,
    dotStyle: DotStyle.HATCHED,
  };

  return <VaccineDot {...props} size={10} />;
};
