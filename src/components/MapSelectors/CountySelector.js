import { find, each, sortBy, some, isEqual } from 'lodash';
import React, { useState } from 'react';
import Select, { components } from 'react-select';
import BaseValueContainer from './BaseValueContainer';
import CustomStyles from './CustomStyles';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020';

import {
  StyledNoResultsMenuOption,
  StyledResultsMenuOption,
  StyledNoOptionsMessage,
} from './MapSelectors.style';

const SingleValue = ({ children, ...props }) => {
  return (
    <components.SingleValue {...props}>
      {children.county}
    </components.SingleValue>
  );
};

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <StyledNoOptionsMessage>No matching counties</StyledNoOptionsMessage>
    </components.NoOptionsMessage>
  );
};

const Option = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <StyledResultsMenuOption hasData={props.data.hasData}>
        <div>
          <div>
            <strong>{children.county}</strong>
          </div>
          {!props.data.hasData && <span>No data available - </span>}
          <span>
            {new Intl.NumberFormat().format(children.population)} residents
          </span>
        </div>
      </StyledResultsMenuOption>
    </components.Option>
  );
};

const MenuList = ({ children, ...props }) => {
  const hasCountyDataCount = props.options.filter(opt => opt.hasData).length;

  const hasMatches = Array.isArray(children);

  const countyCount = props.options.length;

  return (
    <components.MenuList {...props}>
      {hasCountyDataCount < countyCount && hasMatches && (
        <StyledNoResultsMenuOption>
          Data is available for {hasCountyDataCount} of {countyCount} MI
          counties
        </StyledNoResultsMenuOption>
      )}
      {children}
    </components.MenuList>
  );
};

// TODO waiting on County dataset from BE
const CountySelector = ({
  state,
  handleChange,
  dataset = [
    {
      county: 'Wayne County',
    },
  ],
  selectedCounty,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options =
    US_STATE_DATASET.state_county_map_dataset[state].county_dataset;
  const COUNTY_FIELD = 'county';

  each(dataset, item => {
    const county = find(options, {
      county: item[COUNTY_FIELD],
    });

    if (!county) {
      return;
    }

    Object.assign(county, {
      hasData: true,
    });
  });

  const sortedOptions = sortBy(options, ['population', 'hasData']).reverse();

  const handleSelectChange = option => {
    console.log('change', option);

    if (!option) {
      return;
    }

    return handleChange(option);
  };

  const isOptionSelected = option => {
    if (!selectedOption) {
      return false;
    }
    console.log('selected');

    return isEqual(option, selectedCounty);
  };

  const handleCustomFilter = (option, searchInput) => {
    const words = searchInput.split(' ');
    const lowerCasedCities = option.data.cities.map(city => city.toLowerCase());

    return words.reduce(
      (acc, cur) =>
        acc &&
        (option.data.county.toLowerCase().includes(cur.toLowerCase()) ||
          some(lowerCasedCities, lowerCasedCity =>
            lowerCasedCity.includes(cur.toLowerCase()),
          )),
      true,
    );
  };

  return (
    <Select
      onChange={handleSelectChange}
      components={{
        SingleValue,
        NoOptionsMessage,
        Option,
        MenuList,
        ValueContainer: BaseValueContainer,
        IndicatorsContainer: () => null,
      }}
      name="county"
      isClearable={true}
      placeholder="Select a county"
      isOptionSelected={isOptionSelected}
      styles={CustomStyles}
      filterOption={handleCustomFilter}
      getOptionLabel={option => option}
      getOptionValue={option => option}
      isSearchable={true}
      options={sortedOptions}
    />
  );
};

export default CountySelector;
