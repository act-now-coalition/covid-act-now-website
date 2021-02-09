import React, { Fragment } from 'react';
import AutocompleteRegions from './AutocompleteRegions';
import regions from 'common/regions';
import Chip from '@material-ui/core/Chip';
import ImmunizationIcon from 'assets/images/ImmunizationIcon';

export default {
  title: 'Shared Components/AutocompleteRegions',
  component: AutocompleteRegions,
  argTypes: {
    onChangeRegions: { action: 'change' },
  },
};

const states = regions.states;

export const States = (args: any) => (
  <Fragment>
    <label id="select-states-label">Select states</label>
    <AutocompleteRegions
      {...args}
      regions={states}
      selectedRegions={[states[0], states[3]]}
      ariaLabelledBy="select-states-label"
    />
  </Fragment>
);

function renderTags(value: any, getTagProps: any) {
  return (
    <>
      {value.map((option: any, index: any) => {
        const isState = option.stateCode;
        return (
          <Chip
            key={`key-${index}`}
            variant={isState ? 'outlined' : 'contained'}
            color={isState ? 'red' : 'blue'}
            label={option.fullName}
            {...getTagProps({ index })}
            icon={<ImmunizationIcon />}
          />
        );
      })}
    </>
  );
}

export const CustomTags = (args: any) => (
  <Fragment>
    <label id="select-states-label">Select states</label>
    <AutocompleteRegions
      {...args}
      regions={regions.all()}
      selectedRegions={[states[0], regions.counties[3]]}
      ariaLabelledBy="select-states-label"
      renderTags={renderTags}
    />
  </Fragment>
);
