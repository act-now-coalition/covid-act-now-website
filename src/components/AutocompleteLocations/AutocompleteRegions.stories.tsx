import React, { Fragment } from 'react';
import AutocompleteRegions from './AutocompleteRegions';
import regions from 'common/regions';

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
