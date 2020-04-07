import React from 'react';
import { chain, each, map, some } from 'lodash';
import { useParams } from 'react-router-dom';
import Downshift from 'downshift';
import SearchIcon from '@material-ui/icons/Search';
import ShortNumber from 'utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020';

import {
  STATE_TO_INTERVENTION,
  STATE_TO_CALCULATED_INTERVENTION_COLOR,
  FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR,
} from 'enums/interventions';

import {
  StyledDropDownWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledInput,
  StyledInputIcon,
  StyledInputWrapper,
} from './GlobalSelector.style';

import {
  StyledState,
  StyledCounty,
  StyledResultsMenuOption,
  StyledResultsMenuSubText,
} from './MapSelectors.style';

const StateItem = ({ dataset }) => {
  const intervention = STATE_TO_INTERVENTION[dataset.state_code];
  const fillColor = STATE_TO_CALCULATED_INTERVENTION_COLOR[dataset.state_code];

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
          <span>
            {intervention && <span>{intervention} • </span>}{' '}
            {ShortNumber(dataset.population)} residents
          </span>
        </StyledResultsMenuSubText>
      </div>
    </StyledResultsMenuOption>
  );
};

const CountyItem = ({ dataset }) => {
  let fillColor = STATE_TO_CALCULATED_INTERVENTION_COLOR[dataset.state_code];

  if (FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR[dataset.full_fips_code]) {
    fillColor =
      FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR[dataset.full_fips_code];
  }

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
          {dataset.county}, {dataset.state_code}
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
  const { id: location } = useParams();

  const stateDataset = US_STATE_DATASET.state_dataset;
  const countyDataset = [];

  each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
    countyDataset.push(...value.county_dataset);
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
      )
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
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }

    if (location && !inputValue) {
      const topCountiesByParamState = chain(countyDataset)
        .filter(item => item.state_code === location.toUpperCase())
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
          .filter(item => {
            // TODO this is a temporary filter
            // to remove combined county name
            return !item.county.includes(' / ');
          })
          .map((item, index) => ({
            ...item,
            id: item.full_fips_code,
            value: `${item.county}, ${item.state_code}`,
            type: 'COUNTY',
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

  return (
    <Downshift
      onChange={selection => handleChange(selection)}
      itemToString={item => (item ? item.value : '')}
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
                  placeholder: 'Search for your city, county or state',
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
