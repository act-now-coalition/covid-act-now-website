import React, { Fragment } from 'react';
import AutocompleteRegions from './AutocompleteRegions';
import regions, { Region, State } from 'common/regions';
import { AutocompleteGetTagProps } from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import ImmunizationIcon from 'assets/images/ImmunizationIcon';

export default {
  title: 'Components/AutocompleteRegions',
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

function renderTags(regions: Region[], getTagProps: AutocompleteGetTagProps) {
  return (
    <>
      {regions.map((region: Region, index: number) => {
        const isState = region instanceof State;
        return (
          <Chip
            key={`key-${index}`}
            variant="outlined"
            color={isState ? 'primary' : 'secondary'}
            label={region.fullName}
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
