import React from 'react';
import regions from 'common/regions';
import VaccinationInfo from './VaccinationInfo';

export default {
  title: 'Shared Components/VaccinationInfo',
  component: VaccinationInfo,
};

export const County = () => {
  const county = regions.findByFipsCodeStrict('53033');
  return <VaccinationInfo region={county} />;
};

export const State = () => {
  const state = regions.findByFipsCodeStrict('53');
  return <VaccinationInfo region={state} />;
};

export const Metro = () => {
  const metro = regions.findByFipsCodeStrict('35620');
  return <VaccinationInfo region={metro} />;
};
