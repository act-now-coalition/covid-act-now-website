import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { RegionType, Region, State, County } from 'common/regions';
import MenuItem from './MenuItem';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete = (props: {
  locations: Region[];
  filterLimit: number;
}) => {
  const { locations, filterLimit } = props;

  // WIP :
  const [input, setInput] = useState('');
  const [isZip, setIsZip] = useState(false);

  const onInputChange = (e: any, value: string) => {
    setInput(value);
    const isStringOfDigits = /^\d+$/.test(value);
    const isLengthForZipCheck = value.length === 5;
    if (isStringOfDigits && isLengthForZipCheck) setIsZip(true);
    else setIsZip(false);
  };

  const stringifyOption = (option: Region) => {
    if (isZip) {
      if ((option as County).zipCodes) {
        return `${(option as County).zipCodes.join(' ')}`;
      }
      return option.name;
    }
    return option.name;
  };

  // Todo (chelsi) - theres prob a better/built-in way to grab the county url
  const onSelect = (e: any, value: Region) => {
    if (value.regionType === RegionType.STATE) {
      const stateUrl = (value as State).canonicalUrl;
      window.location.href = stateUrl;
    } else if (value.regionType === RegionType.COUNTY) {
      const countyUrl = `${(value as County).state.canonicalUrl}/county/${
        value.urlSegment
      }`;
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
        return <MenuItem region={option} isZip={isZip} input={input} />;
      }}
    />
  );
};

export default SearchAutocomplete;
