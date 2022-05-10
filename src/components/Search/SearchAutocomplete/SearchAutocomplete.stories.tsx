import React, { useState } from 'react';
import SearchAutocomplete from './SearchAutocomplete';
import { getFilterLimit } from 'components/Search';
import {
  getFinalAutocompleteLocations,
  getGeolocatedRegions,
} from 'common/regions';
import countyToZipMap from 'common/data/county-zipcode.json';

export default {
  title: 'Components/HomepageSearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = () => {
  const geolocation = {
    zipCode: '06903',
    stateCode: 'CT',
    country: 'United States',
  };
  const geolocatedRegions = getGeolocatedRegions(geolocation, countyToZipMap);
  const locations = getFinalAutocompleteLocations(geolocatedRegions);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit()}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      placeholder="City, county, state, or zip"
    />
  );
};
