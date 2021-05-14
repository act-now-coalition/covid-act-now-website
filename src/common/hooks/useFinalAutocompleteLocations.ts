import useGeolocatedRegions from './useGeolocatedRegions';
import { getFinalAutocompleteLocations } from 'common/regions';
import { Region } from 'common/regions';

const useFinalAutocompleteLocations = () => {
  const { userRegions } = useGeolocatedRegions();

  const locations = getFinalAutocompleteLocations(userRegions);

  // District of columbia has both a state and a county page
  // Filtering out the county page from search results
  const finalLocations: Region[] = locations.filter(
    location => location.fipsCode !== '11001',
  );

  return finalLocations;
};

export default useFinalAutocompleteLocations;
