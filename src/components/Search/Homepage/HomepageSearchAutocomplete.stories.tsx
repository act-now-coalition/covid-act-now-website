import React from 'react';
import HomepageSearchAutocomplete from './HomepageSearchAutocomplete';
import { getAutocompleteRegions } from 'common/regions';
import { getFilterLimit } from 'components/Search';

export default {
  title: 'Shared Components/HomepageSearchAutocomplete',
  component: HomepageSearchAutocomplete,
};

export const Home = () => {
  const locations = getAutocompleteRegions(undefined);
  return (
    <HomepageSearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit()}
    />
  );
};
