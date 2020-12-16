import React from 'react';
import regions from 'common/regions';
import SearchAutocomplete from './SearchAutocomplete';
import {
  getSearchAutocompleteLocations,
  getFilterLimit,
} from 'components/Search';

export default {
  title: 'Shared Components/SearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = () => {
  const locations = getSearchAutocompleteLocations(undefined);
  return (
    <SearchAutocomplete locations={locations} filterLimit={getFilterLimit()} />
  );
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('02');
  const locations = getSearchAutocompleteLocations(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('53033');
  const locations = getSearchAutocompleteLocations(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};

export const MetroArea = () => {
  const region = regions.findByFipsCodeStrict('14460');
  const locations = getSearchAutocompleteLocations(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};
