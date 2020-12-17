import React from 'react';
import { HomepageLocationScope } from 'common/utils/compare';
import { SliderContainer } from 'components/Compare/Filters.style';
import { StyledSlider } from './HomepageSlider.style';

export const homepageLabelMap = {
  [HomepageLocationScope.MSA]: {
    singular: 'City',
    plural: 'Cities',
  },
  [HomepageLocationScope.COUNTY]: {
    singular: 'County',
    plural: 'Counties',
  },
  [HomepageLocationScope.STATE]: {
    singular: 'State',
    plural: 'States',
  },
};

/* Last value is set to 99 for styling so that the final mark falls on the slider and not to the right of it */
const marks = [
  {
    value: 0,
    label: homepageLabelMap[HomepageLocationScope.COUNTY].plural,
  },
  {
    value: 50,
    label: homepageLabelMap[HomepageLocationScope.MSA].plural,
  },
  {
    value: 99,
    label: homepageLabelMap[HomepageLocationScope.STATE].plural,
  },
];

const HomepageSlider: React.FC<{
  onChange: any;
  homepageScope: any;
  homepageSliderValue: HomepageLocationScope;
  $isModal: boolean;
}> = ({ onChange, homepageScope, homepageSliderValue, $isModal }) => {
  return (
    <SliderContainer>
      <StyledSlider
        onChange={onChange}
        value={homepageSliderValue}
        step={null}
        marks={marks}
        track={false}
        homepageScope={homepageScope}
        $isModal={$isModal}
      />
    </SliderContainer>
  );
};

export default HomepageSlider;
