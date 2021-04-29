import React from 'react';
import HomepageSearchAutocomplete from './HomepageSearchAutocomplete';
import { getFilterLimit } from 'components/Search';
import {
  getFinalAutocompleteLocations,
  getGeolocatedRegions,
} from 'common/regions';
import countyToZipMap from 'common/data/county-zipcode.json';

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
  const geolocatedRegions = getGeolocatedRegions(geolocation, countyToZipMap);
  const locations = getFinalAutocompleteLocations(geolocatedRegions);
  return (
    <HomepageSearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit()}
      menuOpen={false}
    />
  );
};
