import { getGeolocatedRegions } from 'common/regions';
import useGeolocation from './useGeolocation';
import useCountyToZipMap from './useCountyToZipMap';

/**
 * Hook to provide a map of region type (metroArea, county, state) to region
 * based on the user's geolocation information.
 * `isLoading` will be true until the data is available.
 * `userRegions` will be null until loaded or if unavailable after loading
 */
const useGeolocatedRegions = () => {
  const { geolocationData, isLoading: geoIsLoading } = useGeolocation();
  const { result: countyToZipMap, pending: zipIsLoading } = useCountyToZipMap();

  const isLoading = geoIsLoading || zipIsLoading;
  const userRegions =
    geolocationData && countyToZipMap
      ? getGeolocatedRegions(geolocationData, countyToZipMap)
      : null;

  return {
    userRegions,
    isLoading,
  };
};

export default useGeolocatedRegions;
