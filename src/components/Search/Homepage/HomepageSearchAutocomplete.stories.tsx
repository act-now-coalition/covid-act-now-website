import React from 'react';
import HomepageSearchAutocomplete from './HomepageSearchAutocomplete';
import { getFilterLimit } from 'components/Search';
import { getFinalAutocompleteLocations } from 'common/regions';

export default {
  title: 'Shared Components/HomepageSearchAutocomplete',
  component: HomepageSearchAutocomplete,
};

export const Home = () => {
  const geolocation = {
    zipCode: '06903',
    stateCode: 'CT',
    country: 'United States',
  };
  const locations = getFinalAutocompleteLocations(geolocation);
  return (
    <HomepageSearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit()}
    />
  );
};
