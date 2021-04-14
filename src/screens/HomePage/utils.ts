import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import take from 'lodash/take';
import { RegionDB } from 'common/regions';

// This is used to compute data at build time, because it governs a fixed list
// we can precompute.  So if you need to change this value,
// re-run `yarn prepare-regions-data` and check in the updated files.
export const DEFAULT_EXPLORE_GEOLOCATION_COUNT = 5;

/* Gets fips of 5 largest metro areas to set as homepage explore presets 
  These are precomputed by hand using the function below.
*/
export function getLargestMetroFipsForExplore() {
  return ['35620', '31080', '16980', '19100', '26420'];
}

/**
 * Use this function to re-compute the values for the function above, if needed
 */
export function computeLargestMetroFipsForExplore(
  regions: RegionDB,
  numRegions: number,
) {
  const sortedMetros = reverse(
    sortBy(regions.metroAreas, metro => metro.population),
  );

  return take(sortedMetros, numRegions).map(
    locationInfo => locationInfo.fipsCode,
  );
}
