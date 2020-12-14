import React from 'react';
import regions, { Region } from 'common/regions';
import SearchAutocomplete from './SearchAutocomplete';
import { getSearchAutocompleteLocations } from './utils';

export default {
  title: 'Shared Components/SearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = () => {
  const locations = getSearchAutocompleteLocations(undefined);
  return <SearchAutocomplete locations={locations} />;
};

export const State = () => {
  const region = regions.findByFipsCode('02');
  const locations = getSearchAutocompleteLocations(region);
  return <SearchAutocomplete locations={locations} region={region as Region} />;
};

export const County = () => {
  const region = regions.findByFipsCode('53033');
  const locations = getSearchAutocompleteLocations(region);
  return <SearchAutocomplete locations={locations} region={region as Region} />;
};

export const MetroArea = () => {
  const region = regions.findByFipsCode('14460');
  const locations = getSearchAutocompleteLocations(region);
  return <SearchAutocomplete locations={locations} region={region as Region} />;
};
