/**
 * Detects the user geographic location (using their IP address) and returns
 * a list of regions that match their detected location. Depending on the
 * user location, the hook can return between 0 to 3 regions.
 *
 * Example:
 *
 *   const [metroArea, county, state] = useGeolocationRegions();
 */

import { useEffect, useState } from 'react';
import { isNull, values } from 'lodash';
import {
  getGeolocatedRegions,
  filterUndefinedRegions,
  Region,
} from 'common/regions';
import useGeolocation from './useGeolocation';
import useCountyToZipMap from './useCountyToZipMap';

export default function useGeolocationRegions(): Region[] {
  const [geolocatedRegions, setGeolocatedRegions] = useState<Region[]>([]);

  const { geolocationData, isLoading: geoIsLoading } = useGeolocation();
  const { result: countyToZipMap, pending: zipIsLoading } = useCountyToZipMap();

  const isLoading = geoIsLoading || zipIsLoading;
  // combine these and stringify so that useEffect will detect changes
  const geolocationDataString = JSON.stringify(geolocationData);
  const zipDataString = JSON.stringify(countyToZipMap);
  useEffect(() => {
    if (geolocationDataString && zipDataString) {
      const geolocationInfo = JSON.parse(geolocationDataString);
      const countyToZipMap = JSON.parse(zipDataString);

      const userRegions = getGeolocatedRegions(geolocationInfo, countyToZipMap);
      if (!isNull(userRegions)) {
        const regionValues = values(userRegions);
        const filteredUserRegions = filterUndefinedRegions(regionValues);

        if (filteredUserRegions.length > 0) {
          setGeolocatedRegions(filteredUserRegions);
        }
      }
    }
  }, [isLoading, geolocationDataString, zipDataString]);

  return geolocatedRegions;
}
