import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region, County } from 'common/regions';
import MenuItem from './MenuItem';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
}> = ({ locations, filterLimit }) => {
  const [input, setInput] = useState('');
  const [isZip, setIsZip] = useState(false);
  const [noOptionsCopy, setNoOptionsCopy] = useState('No location found');

  const onInputChange = (e: any, value: string) => {
    setInput(value);
    const isStringOfDigits = /^\d+$/.test(value);
    if (isStringOfDigits) {
      setNoOptionsCopy('Enter a valid 5-digit zip code');
      if (value.length === 5) setIsZip(true);
      else setIsZip(false);
    } else setNoOptionsCopy('No location found');
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

  const onSelect = (e: any, value: Region) => {
    window.location.href = `/${value.relativeUrl}`;
  };

  const zipCodeInput = isZip ? input : '';

  return (
    <Autocomplete
      noOptionsText={noOptionsCopy}
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
        return <MenuItem region={option} zipCodeInput={zipCodeInput} />;
      }}
    />
  );
};

export default SearchAutocomplete;
