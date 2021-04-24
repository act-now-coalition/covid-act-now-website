import useGeolocatedRegions from './useGeolocatedRegions';
import { getFinalAutocompleteLocations } from 'common/regions';

const useFinalAutocompleteLocations = () => {
  const { userRegions } = useGeolocatedRegions();

  const locations = getFinalAutocompleteLocations(userRegions);
  return locations;
};

export default useFinalAutocompleteLocations;
