import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { RegionType, Region } from 'common/regions';
import MenuItem from './MenuItem';

function getOptionSelected(option: any, selectedOption: any) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete = (props: {
  locations: Region[];
  filterLimit: number;
}) => {
  const { locations, filterLimit } = props;

  // WIP :
  const [isZip, setIsZip] = useState(false);

  const onInputChange = (e: any, value: string) => {
    const isStringOfDigits = /^\d+$/.test(value);
    const isLengthForZipCheck = value.length === 5;
    if (isStringOfDigits && isLengthForZipCheck) setIsZip(true);
    else setIsZip(false);
  };

  const stringifyOption = (option: any) => {
    if (isZip) {
      if (option.zipCodes) {
        return `${option.zipCodes.join(' ')}`;
      }
      return option.name;
    }
    return option.name;
  };

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
      onInputChange={onInputChange}
      options={locations}
      disableListWrap
      disableClearable
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      filterOptions={createFilterOptions({
        matchFrom: isZip ? 'any' : 'start',
        limit: filterLimit,
        stringify: stringifyOption,
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
