import React, { useState } from 'react';
import { find, chain, each, map, some } from 'lodash';
import Downshift from 'downshift';
import SearchIcon from '@material-ui/icons/Search';
import ShortNumber from 'utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020';

import { STATE_TO_INTERVENTION } from 'enums';

import {
  StyledDropDownWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledInput,
  StyledInputIcon,
  StyledInputWrapper,
} from './GlobalSelector.style';

import {
  // StyledDot,
  StyledState,
  StyledResultsMenuOption,
  StyledResultsMenuSubText,
  StyledNoOptionsMessage,
} from './MapSelectors.style';

const StateItem = ({ dataset }) => {
  const intervention = STATE_TO_INTERVENTION[dataset.state_code];

  return (
    <StyledResultsMenuOption hasData={true}>
      <div style={{ marginLeft: '0', marginRight: '.75rem' }}>
        <StyledState>
          <StateCircleSvg
            ratio={0.8}
            intervention={intervention}
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
  return (
    <StyledResultsMenuOption hasData={dataset.hasData}>
      <div>
        <div>
          <strong>
            {dataset.county}, {dataset.state_code} - {dataset.full_fips_code}
          </strong>
        </div>
        {false && !dataset.hasData && <span>No data available - </span>}
        <span>{ShortNumber(dataset.population)} residents</span>
      </div>
    </StyledResultsMenuOption>
  );
};

const GlobalSelector = ({ handleChange }) => {
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
    const words = inputValue.split(' ');

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

    if (!inputValue) {
      return matchedItems;
    }

    if (inputValue.toLowerCase() === 'igor kofman') {
      matchedItems.push({
        id: 'IGOR',
        type: 'STATE',
        state_code: 'CA',
        state: 'Poopy Town',
      });
    }

    const stateMatches = chain(stateDataset)
      .filter(item => hasStateMatch(item, inputValue))
      .map((item, index) => ({
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
        }))
        .sortBy('population')
        .uniqBy('id')
        .reverse()
        .value();

      matchedItems.push(...countyMatches);
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
        break;
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
      }) => (
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
                placeholder: 'Find your county or state',
              })}
            />
          </StyledInputWrapper>
          <StyledMenu
            {...getMenuProps({
              isOpen,
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
      )}
    </Downshift>
  );
};

export default GlobalSelector;
