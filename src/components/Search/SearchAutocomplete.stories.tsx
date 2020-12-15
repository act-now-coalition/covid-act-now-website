import React from 'react';
import regions from 'common/regions';
import SearchAutocomplete from './SearchAutocomplete';
import {
  getSearchAutocompleteLocations,
  getFilterLimit,
} from 'components/Search/utils';

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
  const region = regions.findByFipsCode('02');
  const locations = getSearchAutocompleteLocations(region!);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region!)}
    />
  );
};

export const County = () => {
  const region = regions.findByFipsCode('53033');
  const locations = getSearchAutocompleteLocations(region!);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region!)}
    />
  );
};

export const MetroArea = () => {
  const region = regions.findByFipsCode('14460');
  const locations = getSearchAutocompleteLocations(region!);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region!)}
    />
  );
};
