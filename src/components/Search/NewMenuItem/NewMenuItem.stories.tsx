import React from 'react';
import NewMenuItem from './NewMenuItem';
import regions, { getAutocompleteRegions } from 'common/regions';

export default {
  title: 'Shared Components/NewMenuItem',
  component: NewMenuItem,
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('09001');
  const locations = getAutocompleteRegions(region);
  return <NewMenuItem region={region} zipCodeInput="" />;
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('15');
  const locations = getAutocompleteRegions(region);
  return <NewMenuItem region={region} zipCodeInput="" />;
};

export const Metro = () => {
  const region = regions.findByFipsCodeStrict('35620');
  const locations = getAutocompleteRegions(region);
  return <NewMenuItem region={region} zipCodeInput="" />;
};
