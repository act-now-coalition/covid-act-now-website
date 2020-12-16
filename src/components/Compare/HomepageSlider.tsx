import React from 'react';
import { HomepageLocationScope } from 'common/utils/compare';
import { SliderContainer } from 'components/Compare/Filters.style';
import { StyledSlider } from './HomepageSlider.style';

const labelMap = {
  [HomepageLocationScope.CITIES]: 'Cities',
  [HomepageLocationScope.COUNTIES]: 'Counties',
  [HomepageLocationScope.STATES]: 'States',
};

/* Last value is set to 99 for styling so that the final mark falls on the slider and not to the right of it */
const marks = [
  {
    value: 0,
    label: labelMap[HomepageLocationScope.COUNTIES],
    //   label: GeoFilterLabels[GeoScopeFilter.NEARBY],
  },
  {
    value: 50,
    label: labelMap[HomepageLocationScope.CITIES],
  },
  {
    value: 99,
    label: labelMap[HomepageLocationScope.STATES],
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
