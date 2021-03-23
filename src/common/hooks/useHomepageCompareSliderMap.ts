/**
 * Used for Compare filter on homepage.
 * Updates the MUI slider value whenever the filter scope changes on homepage.
 */

import { useEffect, useState } from 'react';
import {
  homepageScopeValueMap,
  HomepageLocationScope,
} from 'common/utils/compare';

export default function useHomepageCompareSliderMap(
  homepageScope: HomepageLocationScope,
) {
  const defaultHomepageSliderValue = homepageScopeValueMap[homepageScope];
  const [homepageSliderValue, setHomepageSliderValue] = useState(
    defaultHomepageSliderValue,
  );

  useEffect(() => {
    setHomepageSliderValue(homepageScopeValueMap[homepageScope]);
  }, [homepageScope]);

  return homepageSliderValue;
}
