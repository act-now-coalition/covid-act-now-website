import { useEffect, useState } from 'react';
import { isNull, values } from 'lodash';
import {
  getGeolocatedRegions,
  filterUndefinedRegions,
  Region,
} from 'common/regions';
import useGeolocation from './useGeolocation';

export default function useGeolocationRegions(): Region[] {
  const [geolocatedRegions, setGeolocatedRegions] = useState<Region[]>([]);

  const { geolocationData } = useGeolocation();
  const geolocationDataString = JSON.stringify(geolocationData);
  useEffect(() => {
    if (geolocationDataString) {
      const geolocationInfo = JSON.parse(geolocationDataString);
      const userRegions = getGeolocatedRegions(geolocationInfo);
      if (!isNull(userRegions)) {
        const regionValues = values(userRegions);
        const filteredUserRegions = filterUndefinedRegions(regionValues);

        if (filteredUserRegions.length > 0) {
          setGeolocatedRegions(filteredUserRegions);
        }
      }
    }
  }, [geolocationDataString]);

  return geolocatedRegions;
}
