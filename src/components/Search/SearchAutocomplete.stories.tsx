import React from 'react';
import SearchAutocomplete from './SearchAutocomplete';
import { getSearchAutocompleteLocations } from 'components/Search';

export default {
  title: 'Shared Components/SearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = () => {
  const locations = getSearchAutocompleteLocations();
  return <SearchAutocomplete locations={locations} filterLimit={30} />;
};
