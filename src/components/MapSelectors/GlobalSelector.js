import React from 'react';
import { chain, each, map, some, filter } from 'lodash';
import { useParams } from 'react-router-dom';
import Downshift from 'downshift';
import SearchIcon from '@material-ui/icons/Search';
import ShortNumber from 'common/utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020';
import COUNTY_ZIPCODE_MAP from './datasets/county-zipcode';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { stateColor, countyColor } from 'common/colors';

import {
  StyledDropDownWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledInput,
  StyledInputIcon,
  StyledInputWrapper,
  StyledZipcodeInCounty,
} from './GlobalSelector.style';
import {
  StyledState,
  StyledCounty,
  StyledResultsMenuOption,
  StyledResultsMenuSubText,
} from './MapSelectors.style';
import { getStateByUrlName } from 'common/locations';

const StateItem = ({ dataset }) => {
  const fillColor = stateColor(dataset.state_code);

  return (
    <StyledResultsMenuOption hasData={true}>
      <div style={{ marginLeft: '0', marginRight: '.75rem' }}>
        <StyledState>
          <StateCircleSvg
            ratio={0.8}
            fillColor={fillColor}
            state={dataset.state_code}
          />
        </StyledState>
      </div>
      <div>
        <div>{dataset.state}</div>
        <StyledResultsMenuSubText>
          <span>{ShortNumber(dataset.population)} residents</span>
        </StyledResultsMenuSubText>
      </div>
    </StyledResultsMenuOption>
  );
};

const CountyItem = ({ dataset }) => {
  const fillColor = countyColor(
    dataset.full_fips_code,
    stateColor(dataset.state_code),
  );

  const hasZipcodeMatch =
    dataset.matchedZipCodes !== undefined && dataset.matchedZipCodes.length > 0;
  return (
    <StyledResultsMenuOption hasData={dataset.hasData}>
      <div style={{ marginLeft: '0', marginRight: '.75rem' }}>
        <StyledCounty>
          <StateCircleSvg
            ratio={0.8}
            fillColor={fillColor}
            state={dataset.state_code}
          />
        </StyledCounty>
      </div>
      <div>
        <div>
          {dataset.county}, {dataset.state_code}{' '}
          {hasZipcodeMatch ? (
            <StyledZipcodeInCounty>
              contains zipcode {dataset.matchedZipCodes[0]}
            </StyledZipcodeInCounty>
          ) : null}
        </div>
        <StyledResultsMenuSubText>
          <span>
            {false && !dataset.hasData && <span>No data available - </span>}
            {ShortNumber(dataset.population)} residents
          </span>
        </StyledResultsMenuSubText>
      </div>
    </StyledResultsMenuOption>
  );
};

const GlobalSelector = ({ handleChange, extendRight }) => {
  const { stateId: location } = useParams();
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

  const stateDataset = US_STATE_DATASET.state_dataset;
  const countyDataset = [];

  each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
    const counties = value.county_dataset
      .filter(county => {
        // Remove combined county names, and DC county, which we treat as a state.
        return (
          !county.county.includes(' / ') && county.full_fips_code !== '11001'
        );
      })
      .map(county => {
        county.zip_codes = COUNTY_ZIPCODE_MAP[county.full_fips_code];
        return county;
      });
    countyDataset.push(...counties);
  });

  const hasStateMatch = (option, inputValue) => {
    const words = inputValue.split(' ');

    return words.reduce(
      (acc, cur) =>
        acc &&
        (option.state.toLowerCase().includes(cur.toLowerCase()) ||
          option.state_code.toLowerCase().includes(cur.toLowerCase())),
      true,
    );
  };

  const hasCountyMatch = (option, inputValue) => {
    const lowerCasedCities = option.cities.map(city => city.toLowerCase());
    const countyWithState = `${option.county}, ${option.state_code}`;

    return (
      countyWithState.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.county.toLowerCase().includes(inputValue.toLowerCase()) ||
      some(lowerCasedCities, lowerCasedCity =>
        lowerCasedCity.includes(inputValue.toLowerCase()),
      ) ||
      matchedZipCodesInCounty(option, inputValue).length > 0
    );
  };

  const matchedZipCodesInCounty = (option, inputValue) => {
    return filter(option.zip_codes, zip_code =>
      zip_code.slice(0, inputValue.length).includes(inputValue),
    );
  };

  const getMatchedItems = (
    getItemProps,
    inputValue,
    highlightedIndex,
    selectedItem,
  ) => {
    const matchedItems = [];

    if (inputValue.toLowerCase() === 'igor kofman') {
      window.location = 'https://youtu.be/EHRQHU3U86Y?t=12';
    }

    if (location && !inputValue) {
      const { state_code } = getStateByUrlName(location);
      const topCountiesByParamState = chain(countyDataset)
        .filter(item => item.state_code === state_code)
        .map(item => ({
          ...item,
          id: item.full_fips_code,
          value: `${item.county}, ${item.state_code}`,
          type: 'COUNTY',
        }))
        .uniqBy('id')
        .sortBy('population')
        .reverse()
        .slice(0, 20)
        .value();

      matchedItems.push(...topCountiesByParamState);
    } else {
      const stateMatches = chain(stateDataset)
        .filter(item => hasStateMatch(item, inputValue))
        .map(item => ({
          ...item,
          id: item.state_fips_code,
          value: item.state,
          type: 'STATE',
        }))
        .uniq()
        .value();

      matchedItems.push(...stateMatches);

      if (inputValue.length > 2) {
        const countyMatches = chain(countyDataset)
          .filter(item => hasCountyMatch(item, inputValue))
          .map((item, index) => ({
            ...item,
            id: item.full_fips_code,
            value: `${item.county}, ${item.state_code}`,
            type: 'COUNTY',
            matchedZipCodes: matchedZipCodesInCounty(item, inputValue),
          }))
          .uniqBy('id')
          .sortBy('population')
          .reverse()
          .slice(0, 50)
          .value();

        matchedItems.push(...countyMatches);
      }
    }

    return map(matchedItems, (item, index) => {
      return (
        <StyledMenuItem
          {...getItemProps({
            key: item.id,
            index,
            item,
            style: {
              backgroundColor: highlightedIndex === index ? '#e3e3e3' : 'white',
            },
          })}
        >
          {renderItem(item)}
        </StyledMenuItem>
      );
    });
  };

  const renderItem = item => {
    switch (item.type) {
      case 'STATE':
        return <StateItem dataset={item} />;
      case 'COUNTY':
        return <CountyItem dataset={item} />;
      default:
    }
  };

  /*
   * Downshift uses this state reducer function to close the menu when the escape key is pressed
   * and executes default behavior for all other events.
   */
  const escapeKeyStateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEscape:
        return {
          isOpen: false,
        };
      default:
        return changes;
    }
  };

  return (
    <Downshift
      onChange={selection => handleChange(selection)}
      itemToString={item => (item ? item.value : '')}
      stateReducer={escapeKeyStateReducer}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        openMenu,
      }) => {
        return (
          <StyledDropDownWrapper>
            <StyledInputWrapper
              {...getRootProps(
                {
                  isOpen,
                },
                { suppressRefError: true },
              )}
            >
              <StyledInputIcon>
                <SearchIcon />
              </StyledInputIcon>
              <StyledInput
                {...getInputProps({
                  isOpen,
                  onFocus: () => {
                    openMenu();
                  },
                  placeholder:
                    isNarrowMobile && extendRight
                      ? 'Search'
                      : 'Search for your state, county, or zip',
                })}
              />
            </StyledInputWrapper>
            <StyledMenu
              {...getMenuProps({
                isOpen,
                extendRight,
              })}
            >
              {isOpen
                ? getMatchedItems(
                    getItemProps,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                  )
                : null}
            </StyledMenu>
          </StyledDropDownWrapper>
        );
      }}
    </Downshift>
  );
};

export default GlobalSelector;
