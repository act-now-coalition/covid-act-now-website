/**
 * Used to get preset regions for homepage explore chart
 *
 * If user has been geolocated -> returns an array of user's region fips
 * Else -> returns an array of largest metro areas' fips (by population)
 *
 * Note: geolocation only works on prod + main staging (won't work locally or in preview links)
 * To test, hardcode zip/state/county in useGeolocation.ts
 */

import { useEffect, useState } from 'react';
import { isNull, values, chain } from 'lodash';
import {
  getGeolocatedRegions,
  filterUndefinedRegions,
  FipsCode,
} from 'common/regions';
import { getLargestMetroFipsForExplore } from 'screens/HomePage/utils';
import { GeolocationInfo } from './useGeolocation';

export default function useGeolocationInExplore(
  numLocations: number,
  geolocation?: GeolocationInfo,
): FipsCode[] {
  const [initialExploreFips, setInitialExploreFips] = useState(
    getLargestMetroFipsForExplore(numLocations),
  );

  useEffect(() => {
    if (geolocation) {
      const userRegions = getGeolocatedRegions(geolocation);
      if (!isNull(userRegions)) {
        const regionValues = values(userRegions);
        const filteredUserRegions = filterUndefinedRegions(regionValues);
        const userRegionsFips = chain(filteredUserRegions)
          .map((region: any) => region.fipsCode)
          .value();
        if (userRegionsFips.length) {
          setInitialExploreFips(userRegionsFips);
        }
      }
    }
  }, [geolocation]);

  return initialExploreFips;
}
