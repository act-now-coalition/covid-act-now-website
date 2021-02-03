import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import { Region, County, MetroArea } from 'common/regions';
import {
  Wrapper,
  StyledTextField,
  SearchBarIcon,
  SearchDirections,
  ListContainer,
  StyledPaper,
} from './HomepageSearchAutocomplete.style';
import NewMenuItem from 'components/Search/NewMenuItem/NewMenuItem';
import { getSearchTextFieldStyles } from 'assets/theme/customStyleBlocks/getSearchTextFieldStyles';
import { getSearchAutocompleteStyles } from 'assets/theme/customStyleBlocks/getSearchAutocompleteStyles';
import { useBreakpoint } from 'common/hooks';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const HomepageSearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
  setHideMapToggle?: any;
}> = ({ locations, filterLimit, setHideMapToggle }) => {
  const [input, setInput] = useState('');
  /* We only check for a zipcode match when the input is all numbers and has a length of 5: */
  const [checkForZipcodeMatch, setCheckForZipcodeMatch] = useState(false);
  const [noOptionsCopy, setNoOptionsCopy] = useState('No location found');
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useBreakpoint(600);

  const searchTextFieldStyles = getSearchTextFieldStyles();
  const autocompleteStyles = getSearchAutocompleteStyles();

  const onInputChange = (e: any, value: string) => {
    setInput(value);
    const isStringOfDigits = /^\d+$/.test(value);
    if (isStringOfDigits) {
      setNoOptionsCopy('Enter a valid 5-digit zip code');
      if (value.length === 5) setCheckForZipcodeMatch(true);
      else setCheckForZipcodeMatch(false);
    } else {
      if (value.length) {
        setNoOptionsCopy(
          `No locations named ${value} found. You can also try searching by zip code.`,
        );
      } else setNoOptionsCopy('No location found');
    }
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
    trackEvent(
      EventCategory.SEARCH,
      EventAction.NAVIGATE,
      `Selected: ${value.fullName} (${input})`,
    );
    window.location.href = value.relativeUrl;
  };

  const zipCodeInput = checkForZipcodeMatch ? input : '';

  const getPlaceholderText = (): string => {
    if (isOpen) {
      return '';
    } else {
      if (isMobile) {
        return 'City, county, or state';
      } else {
        return 'Search city, county, or state';
      }
    }
  };

  const searchDirectionsText = isOpen ? 'Search city, county, or state' : '';

  return (
    <Wrapper isOpen={isOpen}>
      <Autocomplete
        disableListWrap
        disableClearable
        disablePortal
        clearOnEscape
        fullWidth
        options={locations}
        noOptionsText={noOptionsCopy}
        onInputChange={onInputChange}
        onChange={onSelect}
        getOptionSelected={getOptionSelected}
        filterOptions={createFilterOptions({
          matchFrom: checkForZipcodeMatch ? 'any' : 'start',
          limit: filterLimit,
          stringify: stringifyOption,
        })}
        openOnFocus
        onOpen={() => {
          trackEvent(EventCategory.SEARCH, EventAction.FOCUS, 'Search Focused');
          setIsOpen(true);
          if (setHideMapToggle) {
            setHideMapToggle(true);
          }
        }}
        onClose={() => {
          setIsOpen(false);
          if (setHideMapToggle) {
            setHideMapToggle(false);
          }
        }}
        PaperComponent={StyledPaper}
        ListboxComponent={ListContainer}
        popupIcon={<span />} // adding an empty span removes default MUI arrow icon
        renderInput={params => (
          <StyledTextField
            placeholder={getPlaceholderText()}
            {...params}
            className={searchTextFieldStyles.root}
            $isOpen={isOpen}
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchBarIcon />,
            }}
          />
        )}
        renderOption={option => {
          return <NewMenuItem region={option} zipCodeInput={zipCodeInput} />;
        }}
        classes={{
          option: autocompleteStyles.option,
          noOptions: autocompleteStyles.noOptions,
          popperDisablePortal: autocompleteStyles.popperDisablePortal,
        }}
      />
      <SearchDirections>{searchDirectionsText}</SearchDirections>
    </Wrapper>
  );
};

export default HomepageSearchAutocomplete;
