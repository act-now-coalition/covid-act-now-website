import React from 'react';
import regions from 'common/regions/region_db';
import { getAutocompleteRegions } from 'common/regions';
import SearchAutocomplete from './SearchAutocomplete';
import { getFilterLimit } from 'components/Search';

export default {
  title: 'Shared Components/SearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = () => {
  const locations = getAutocompleteRegions(undefined);
  return (
    <SearchAutocomplete locations={locations} filterLimit={getFilterLimit()} />
  );
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('02');
  const locations = getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('53033');
  const locations = getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};

export const MetroArea = () => {
  const region = regions.findByFipsCodeStrict('14460');
  const locations = getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={getFilterLimit(region)}
    />
  );
};
