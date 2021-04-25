import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region, MetroArea } from 'common/regions';
import { StyledPaper, SearchBarIcon } from './Search.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { useCountyToZipMap } from 'common/hooks';
import MenuItem from './MenuItem';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const SearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
  setHideMapToggle?: any;
}> = ({ locations, filterLimit, setHideMapToggle }) => {
  const [input, setInput] = useState('');
  /* We only check for a zipcode match when the input is all numbers and has a length of 5: */
  const [checkForZipcodeMatch, setCheckForZipcodeMatch] = useState(false);
  const [noOptionsCopy, setNoOptionsCopy] = useState('No location found');
  const { result: countyToZipMap } = useCountyToZipMap();

  const onInputChange = (e: React.ChangeEvent<{}>, value: string) => {
    setInput(value);
    const isStringOfDigits = /^\d+$/.test(value);
    if (isStringOfDigits) {
      setNoOptionsCopy('Enter a valid 5-digit zip code');
      setCheckForZipcodeMatch(value.length === 5);
    } else {
      setCheckForZipcodeMatch(false);
      if (value.length) {
        setNoOptionsCopy(
          `No locations named ${value} found. You can also try searching by zip code.`,
        );
      } else setNoOptionsCopy('No location found');
    }
  };

  const stringifyOption = (option: Region) => {
    const zipCodes = countyToZipMap?.[option.fipsCode];
    if (checkForZipcodeMatch && zipCodes) {
      return `${zipCodes.join(' ')}`;
    } else {
      if (option instanceof MetroArea) {
        return `${option.shortName}, ${(option as MetroArea).stateCodes}`;
      } else {
        return option.shortName;
      }
    }
  };

  const onSelect = (e: React.ChangeEvent<{}>, value: Region) => {
    trackEvent(
      EventCategory.SEARCH,
      EventAction.NAVIGATE,
      `Selected: ${value.fullName} (${input})`,
    );
    window.location.href = value.relativeUrl;
  };

  const zipCodeInput = checkForZipcodeMatch ? input : '';

  return (
    <Autocomplete
      disableListWrap
      disableClearable
      options={locations}
      noOptionsText={noOptionsCopy}
      onInputChange={onInputChange}
      onChange={onSelect}
      getOptionSelected={getOptionSelected}
      getOptionLabel={() => ''} // we don't want the location name to populate the searchbar after selecting
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
          placeholder="Search city, county, or state"
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchBarIcon />,
          }}
        />
      )}
      renderOption={option => {
        return <MenuItem region={option} zipCodeInput={zipCodeInput} />;
      }}
      openOnFocus
      onOpen={() => {
        trackEvent(EventCategory.SEARCH, EventAction.FOCUS, 'Search Focused');
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
