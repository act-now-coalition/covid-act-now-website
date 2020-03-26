import { find, each, sortBy, isEqual } from 'lodash';
import React, { useState }             from 'react';
import Select, { components }          from 'react-select';
import CustomStyles                    from './CustomStyles';
import BaseValueContainer              from './BaseValueContainer';
import ShortNumber                     from 'utils/ShortNumber';
import StateCircleSvg                  from 'components/StateSvg/StateCircleSvg';
import US_STATE_DATASET                from './datasets/us_states_dataset_01_02_2020';

import { 
  STATE_TO_INTERVENTION,
} from 'enums';

import {
  // StyledDot,
  StyledState,
  StyledResultsMenuOption,
  StyledResultsMenuSubText,
  StyledNoOptionsMessage,
} from './MapSelectors.style'

const SingleValue = ({children, ...props}) => {
  return (
    <components.SingleValue {...props}>
      {children.state}
    </components.SingleValue>
  );
};

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <StyledNoOptionsMessage>
        No matching states
      </StyledNoOptionsMessage>
    </components.NoOptionsMessage>
  );
};

const Option = ({ children, ...props }) => {
  const intervention = STATE_TO_INTERVENTION[children.state_code];

  return (
      <components.Option {...props}>
        <StyledResultsMenuOption hasData={true}>
          <div style={{ marginLeft: '0', marginRight: '.75rem' }}>
            <StyledState>
              <StateCircleSvg 
                ratio={0.8}
                intervention={intervention} 
                state={children.state_code} 
              />
            </StyledState>
          </div>
          <div>
            <div>
              {children.state}
            </div>
            <StyledResultsMenuSubText>
              <span>{intervention && 
                  <span>{intervention} • </span>
              } {ShortNumber(children.population)} residents</span>
            </StyledResultsMenuSubText>
          </div>
        </StyledResultsMenuOption>
      </components.Option>
  );
};

const StateSelector = ({
  state,
  handleChange,
  dataset = [{
    county: 'Wayne County',
  }],
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = US_STATE_DATASET.state_dataset;

  each(dataset, (item) => {
    const county = find(options, {
      state: item,
    });

    if (!county) {
      return;
    }
  });

  const sortedOptions = sortBy(options, ['state']);

  const handleSelectChange = (option) => {
    setSelectedOption(option);

    if (!option) {
      return;
    }

    return handleChange(option);
  };

  const isOptionSelected = (option) => {
    return isEqual(option, selectedOption);
  };

  const handleCustomFilter = (option, searchInput) => {
    const words = searchInput.split(' ');

    return words.reduce(
      (acc, cur) => acc && 
      (
        option.data.state.toLowerCase().includes(cur.toLowerCase()) 
        || option.data.state_code.toLowerCase().includes(cur.toLowerCase())
      ),
      true,
    );
  };

  return (
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
