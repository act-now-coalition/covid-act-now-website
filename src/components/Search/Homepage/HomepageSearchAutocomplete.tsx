import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import Hidden from '@material-ui/core/Hidden';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';
import { Region, MetroArea } from 'common/regions';
import {
  Wrapper,
  StyledTextField,
  SearchBarIcon,
  ListContainer,
  StyledPaper,
  CloseIcon,
} from './HomepageSearchAutocomplete.style';
import NewMenuItem from 'components/Search/NewMenuItem/NewMenuItem';
import {
  getSearchTextFieldStyles,
  getSearchAutocompleteStyles,
} from 'assets/theme/customMuiStyleBlocks';
import { useBreakpoint, useCountyToZipMap } from 'common/hooks';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { LockBodyScroll } from 'components/Dialog';

function getOptionSelected(option: Region, selectedOption: Region) {
  return option.fipsCode === selectedOption.fipsCode;
}

const HomepageSearchAutocomplete: React.FC<{
  locations: Region[];
  filterLimit: number;
  setHideMapToggle?: any;
  menuOpen: boolean;
}> = ({ locations, filterLimit, setHideMapToggle, menuOpen }) => {
  const [input, setInput] = useState('');
  /* We only check for a zipcode match when the input is all numbers and has a length of 5: */
  const [checkForZipcodeMatch, setCheckForZipcodeMatch] = useState(false);
  const [noOptionsCopy, setNoOptionsCopy] = useState('No location found');
  const [isOpen, setIsOpen] = useState(false);
  const { result: countyToZipMap } = useCountyToZipMap();

  const isMobile = useBreakpoint(600);

  const searchTextFieldStyles = getSearchTextFieldStyles();
  const autocompleteStyles = getSearchAutocompleteStyles();

  useEffect(() => {
    if (menuOpen) setIsOpen(false);
  }, [menuOpen]);

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

  const lockBackgroundScroll = isMobile && isOpen;

  return (
    <>
      {lockBackgroundScroll && <LockBodyScroll />}
      <Wrapper $isOpen={isOpen}>
        <Autocomplete
          open={isOpen}
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
          getOptionLabel={() => ''} // we don't want the location name to populate the searchbar after selecting
          filterOptions={createFilterOptions({
            matchFrom: checkForZipcodeMatch ? 'any' : 'start',
            limit: filterLimit,
            stringify: stringifyOption,
          })}
          popupIcon={<span />} // adding an empty span removes default MUI arrow icon
          renderInput={params => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledTextField
                placeholder="City, county, state, or zip"
                {...params}
                className={searchTextFieldStyles.root}
                $isOpen={isOpen}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <SearchBarIcon />,
                }}
              />
              <Hidden smUp>
                <CloseIcon
                  onClick={() => setIsOpen(false)}
                  $showIcon={isOpen}
                />
              </Hidden>
            </div>
          )}
          renderOption={option => {
            return <NewMenuItem region={option} zipCodeInput={zipCodeInput} />;
          }}
          openOnFocus
          onOpen={() => {
            trackEvent(
              EventCategory.SEARCH,
              EventAction.FOCUS,
              'Search Focused',
            );
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
          classes={{
            option: autocompleteStyles.option,
            noOptions: autocompleteStyles.noOptions,
            popperDisablePortal: autocompleteStyles.popperDisablePortal,
          }}
        />
      </Wrapper>
    </>
  );
};

export default HomepageSearchAutocomplete;
