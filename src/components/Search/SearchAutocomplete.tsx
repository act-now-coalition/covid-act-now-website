import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region, County, MetroArea } from 'common/regions';
import MenuItem from './MenuItem';
import { StyledPaper } from './Search.style';
import { GeolocationInfo } from 'common/hooks/useGeolocation';
import { getAutocompleteRegionsWithGeolocation } from 'common/regions';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
  setHideMapToggle?: any;
  geolocation?: GeolocationInfo;
}> = ({ locations, filterLimit, setHideMapToggle, geolocation }) => {
  const [input, setInput] = useState('');
  /* We only check for a zipcode match when the input is all numbers and has a length of 5: */
  const [checkForZipcodeMatch, setCheckForZipcodeMatch] = useState(false);
  const [noOptionsCopy, setNoOptionsCopy] = useState('No location found');

  const onInputChange = (e: any, value: string) => {
    setInput(value);
    const isStringOfDigits = /^\d+$/.test(value);
    if (isStringOfDigits) {
      setNoOptionsCopy('Enter a valid 5-digit zip code');
      if (value.length === 5) setCheckForZipcodeMatch(true);
      else setCheckForZipcodeMatch(false);
    } else setNoOptionsCopy('No location found');
  };

  const stringifyOption = (option: Region) => {
    if (checkForZipcodeMatch && (option as County).zipCodes) {
      return `${(option as County).zipCodes.join(' ')}`;
    } else {
      if (option instanceof MetroArea) {
        return `${option.shortName}, ${(option as MetroArea).stateCodes}`;
      } else {
        return option.shortName;
      }
    }
  };

  const onSelect = (e: any, value: Region) => {
    window.location.href = value.relativeUrl;
  };

  const zipCodeInput = checkForZipcodeMatch ? input : '';

  const finalLocations = geolocation
    ? getAutocompleteRegionsWithGeolocation(geolocation, locations)
    : locations;

  return (
    <Autocomplete
      noOptionsText={noOptionsCopy}
      onInputChange={onInputChange}
      options={finalLocations}
      disableListWrap
      disableClearable
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      filterOptions={createFilterOptions({
        matchFrom: checkForZipcodeMatch ? 'any' : 'start',
        limit: filterLimit,
        stringify: stringifyOption,
      })}
      popupIcon={<span />} // adding an empty span removes default MUI arrow icon
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search by state, metro, county, or zip"
        />
      )}
      renderOption={option => {
        return <MenuItem region={option} zipCodeInput={zipCodeInput} />;
      }}
      openOnFocus
      onOpen={() => {
        if (setHideMapToggle) {
          setHideMapToggle(true);
        }
      }}
      onClose={() => {
        if (setHideMapToggle) {
          setHideMapToggle(false);
        }
      }}
      PaperComponent={StyledPaper}
    />
  );
};

export default SearchAutocomplete;
