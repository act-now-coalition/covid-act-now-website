import React from 'react';
import NewMenuItem from './NewMenuItem';
import regions from 'common/regions/region_db';

export default {
  title: 'Shared Components/NewMenuItem',
  component: NewMenuItem,
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('09001');
  return <NewMenuItem region={region} zipCodeInput="" />;
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('15');
  return <NewMenuItem region={region} zipCodeInput="" />;
};

export const Metro = () => {
  const region = regions.findByFipsCodeStrict('35620');
  return <NewMenuItem region={region} zipCodeInput="" />;
};
