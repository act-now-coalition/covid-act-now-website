import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import TextField from '@material-ui/core/TextField';
import { Region, County, MetroArea } from 'common/regions';
import MenuItem from './MenuItem';
import { StyledPaper } from './Search.style';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

interface ZipCodeMap {
  [fipsCode: string]: string[];
}

const SearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
  setHideMapToggle?: any;
}> = ({ locations, filterLimit, setHideMapToggle }) => {
  const [input, setInput] = useState('');
  const [zipCodeMap, setZipCodeMap] = useState<ZipCodeMap | null>(null);

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
    if (checkForZipcodeMatch && zipCodeMap && (option as County).fipsCode) {
      return `${(zipCodeMap[(option as County).fipsCode] || []).join(' ')}`;
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

  useEffect(() => {
    if (zipCodeMap === null) {
      fetchZipcodesByCounty().then((data: ZipCodeMap) => {
        console.log({ data });
        setZipCodeMap(data);
      });
    }
  }, [zipCodeMap, setZipCodeMap]);

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

function fetchZipcodesByCounty() {
  return fetch('/data/county-zipcode.json').then(res => res.json());
}

export default SearchAutocomplete;
