import React from 'react';
import HomepageSlider from './HomepageSlider';
import { HomepageLocationScope } from 'common/utils/compare';

export default {
  title: 'Shared Components/HomepageSlider',
  component: HomepageSlider,
};

export const Example = () => (
  <HomepageSlider
    $isModal={false}
    homepageScope={HomepageLocationScope.MSA}
    onChange={() => {}}
    homepageSliderValue={50}
  />
);
