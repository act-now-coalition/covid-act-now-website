/**
 * Used for Compare filter on location page.
 * Updates the MUI slider value whenever the filter scope changes on location page.
 */

import { useEffect, useState } from 'react';
import { scopeValueMap, GeoScopeFilter } from 'common/utils/compare';

export default function useLocationPageCompareSliderMap(
  geoScope: GeoScopeFilter,
) {
  const defaultSliderValue = scopeValueMap[geoScope];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  useEffect(() => {
    setSliderValue(scopeValueMap[geoScope]);
  }, [geoScope]);

  return sliderValue;
}
