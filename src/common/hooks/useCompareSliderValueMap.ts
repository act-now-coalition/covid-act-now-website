import { useEffect, useState } from 'react';
import {
  scopeValueMap,
  homepageScopeValueMap,
  GeoScopeFilter,
  HomepageLocationScope,
} from 'common/utils/compare';

// export default function useCompareSliderValueMap(setSliderValue:any, geoScope: GeoScopeFilter, setHomepageSliderValue: any, homepageScope:HomepageLocationScope) {
//   useEffect(() => {
//     setSliderValue(scopeValueMap[geoScope])
//     setHomepageSliderValue(homepageScopeValueMap[homepageScope])

//   }, [geoScope, homepageScope])
// }

export default function useCompareSliderValueMap(
  geoScope: GeoScopeFilter,
  homepageScope: HomepageLocationScope,
) {
  const defaultSliderValue = scopeValueMap[geoScope];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  const defaultHomepageSliderValue = homepageScopeValueMap[homepageScope];
  const [homepageSliderValue, setHomepageSliderValue] = useState(
    defaultHomepageSliderValue,
  );

  useEffect(() => {
    setSliderValue(scopeValueMap[geoScope]);
    setHomepageSliderValue(homepageScopeValueMap[homepageScope]);
  }, [geoScope, homepageScope]);

  return [sliderValue, homepageSliderValue];
}
