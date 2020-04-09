import React from 'react';
import { find, each, sortBy, some } from 'lodash';
import Select, {
  components,
  OptionProps,
  SingleValueProps,
  MenuListComponentProps,
} from 'react-select';
import BaseValueContainer from './BaseValueContainer';
import CustomStyles from './CustomStyles';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020.json';
import { County, StateCode } from './MapTypes';

import {
  StyledNoResultsMenuOption,
  StyledResultsMenuOption,
  StyledNoOptionsMessage,
} from './MapSelectors.style';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<any> & { children: County }) => {
  return (
    <components.SingleValue {...props}>
      {children.county}
    </components.SingleValue>
  );
};

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <StyledNoOptionsMessage>No matching counties</StyledNoOptionsMessage>
    </components.NoOptionsMessage>
  );
};

const Option = ({
  children,
  ...props
}: OptionProps<any> & { children: County }) => {
  return (
    <components.Option {...props}>
      <StyledResultsMenuOption hasData={props.data.hasData}>
        <div>
          <div>
            <strong>{children.county}</strong>
          </div>
          {false && !props.data.hasData && <span>No data available - </span>}
          <span>
            {new Intl.NumberFormat().format(children.population)} residents
          </span>
        </div>
      </StyledResultsMenuOption>
    </components.Option>
  );
};

const MenuList = ({ children, ...props }: MenuListComponentProps<any>) => {
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
  autoFocus = false,
}: {
  state: StateCode;
  handleChange: () => void;
  dataset: Partial<County>[];
  selectedCounty: string;
  autoFocus?: boolean;
}) => {
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

  const handleCustomFilter = (
    option: { data: County },
    searchInput: string,
  ) => {
    const words = searchInput.split(' ');
    const lowerCasedCities = option.data.cities!.map(city =>
      city.toLowerCase(),
    );

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
    // @ts-ignore Bunch of things seem wrong here, really tricky to fix this, can dig into it later
    <Select
      defaultValue={selectedCounty}
      value={selectedCounty}
      placeholder="Select a county"
      options={sortedOptions}
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
      styles={CustomStyles}
      filterOption={handleCustomFilter}
      getOptionLabel={option => option}
      getOptionValue={option => option}
      isSearchable={true}
      autoFocus={autoFocus}
      onChange={handleChange}
    />
  );
};

export default CountySelector;
