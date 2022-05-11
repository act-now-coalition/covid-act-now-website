import React from 'react';
import MenuItem from './MenuItem';
import regions from 'common/regions';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('09001');
  return <MenuItem region={region} zipCodeInput="" />;
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('15');
  return <MenuItem region={region} zipCodeInput="" />;
};

export const Metro = () => {
  const region = regions.findByFipsCodeStrict('35620');
  return <MenuItem region={region} zipCodeInput="" />;
};
