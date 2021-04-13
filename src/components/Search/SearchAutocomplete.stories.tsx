import React from 'react';
import regions, { getAutocompleteRegions } from 'common/regions';
import SearchAutocomplete from './SearchAutocomplete';
import { getFilterLimit } from 'components/Search';

export default {
  title: 'Shared Components/SearchAutocomplete',
  component: SearchAutocomplete,
};

export const Home = async () => {
  const locations = await getAutocompleteRegions(undefined);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={await getFilterLimit()}
    />
  );
};

export const State = async () => {
  const region = regions.findByFipsCodeStrict('02');
  const locations = await getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={await getFilterLimit(region)}
    />
  );
};

export const County = async () => {
  const region = regions.findByFipsCodeStrict('53033');
  const locations = await getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={await getFilterLimit(region)}
    />
  );
};

export const MetroArea = async () => {
  const region = regions.findByFipsCodeStrict('14460');
  const locations = await getAutocompleteRegions(region);
  return (
    <SearchAutocomplete
      locations={locations}
      filterLimit={await getFilterLimit(region)}
    />
  );
};
