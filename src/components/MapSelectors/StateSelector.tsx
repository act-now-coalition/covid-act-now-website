import { sortBy, isEqual } from 'lodash';
import React, { useState } from 'react';
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import CustomStyles from './CustomStyles';
import BaseValueContainer from './BaseValueContainer';
import ShortNumber from 'utils/ShortNumber';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020.json';
import { State } from './MapTypes';
import { STATE_TO_INTERVENTION } from 'enums';

import {
  // StyledDot,
  StyledState,
  StyledResultsMenuOption,
  StyledResultsMenuSubText,
  StyledNoOptionsMessage,
} from './MapSelectors.style';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<any> & { children: State }) => {
  return (
    <components.SingleValue {...props}>{children.state}</components.SingleValue>
  );
};

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <StyledNoOptionsMessage>No matching states</StyledNoOptionsMessage>
    </components.NoOptionsMessage>
  );
};

const Option = ({
  children,
  ...props
}: OptionProps<any> & { children: State }) => {
  const intervention = STATE_TO_INTERVENTION[children.state_code];

  return (
    <components.Option {...props}>
      <StyledResultsMenuOption hasData={true}>
        <div style={{ marginLeft: '0', marginRight: '.75rem' }}>
          <StyledState>
            <StateCircleSvg ratio={0.8} state={children.state_code} />
          </StyledState>
        </div>
        <div>
          <div>{children.state}</div>
          <StyledResultsMenuSubText>
            <span>
              {intervention && <span>{intervention} • </span>}{' '}
              {ShortNumber(children.population)} residents
            </span>
          </StyledResultsMenuSubText>
        </div>
      </StyledResultsMenuOption>
    </components.Option>
  );
};

const StateSelector = ({
  handleChange,
}: {
  handleChange: (state: State) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<State | null>(null);
  const options = US_STATE_DATASET.state_dataset;

  const sortedOptions = sortBy(options, ['state']);

  const handleSelectChange = (option: State) => {
    setSelectedOption(option);

    if (!option) {
      return;
    }

    return handleChange(option);
  };

  const isOptionSelected = (option: State) => {
    return isEqual(option, selectedOption);
  };

  const handleCustomFilter = (option: { data: State }, searchInput: string) => {
    const words = searchInput.split(' ');

    return words.reduce(
      (acc, cur) =>
        acc &&
        (option.data.state.toLowerCase().includes(cur.toLowerCase()) ||
          option.data.state_code.toLowerCase().includes(cur.toLowerCase())),
      true,
    );
  };

  return (
    // @ts-ignore Bunch of things seem wrong here, really tricky to fix this, can dig into it later
    <Select
      onChange={handleSelectChange}
      components={{
        NoOptionsMessage,
        ValueContainer: BaseValueContainer,
        Option,
        SingleValue,
        IndicatorsContainer: () => null,
      }}
      name="state"
      isOptionSelected={isOptionSelected}
      isClearable={true}
      placeholder="Find your state"
      styles={CustomStyles}
      filterOption={handleCustomFilter}
      getOptionLabel={option => option}
      isSearchable={true}
      options={sortedOptions}
    />
  );
};

export default StateSelector;
