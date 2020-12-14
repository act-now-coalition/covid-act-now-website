import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { getFilterLimit } from './utils';
import { RegionType, Region } from 'common/regions';
import MenuItem from './MenuItem';

function getOptionSelected(option: any, selectedOption: any) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete = (props: {
  locations: Region[];
  region?: Region;
}) => {
  const { locations, region } = props;

  function getOptionLabel(location: any) {
    return location.name;
  }

  // Todo (chelsi) - theres prob a better/built-in way to grab the county url
  const onSelect = (e: any, value: any) => {
    if (value.regionType === RegionType.STATE) {
      const stateUrl = value.canonicalUrl;
      window.location.href = stateUrl;
    } else if (value.regionType === RegionType.COUNTY) {
      const countyUrl = `${value.state.canonicalUrl}/county/${value.urlSegment}`;
      window.location.href = countyUrl;
    }
  };

  return (
    <Autocomplete
      noOptionsText="No location found"
      options={locations}
      getOptionLabel={getOptionLabel}
      disableListWrap
      disableClearable
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      filterOptions={createFilterOptions({
        matchFrom: 'start',
        limit: getFilterLimit(region),
      })}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search for your state, county, or zip"
        />
      )}
      renderOption={option => {
        return <MenuItem region={option} />;
      }}
    />
  );
};

export default SearchAutocomplete;
