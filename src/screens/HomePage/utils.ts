import { sortBy, reverse, take } from 'lodash';
import regions from 'common/regions';

/* Gets fips of 5 largest metro areas to set as homepage explore presets */
export function getLargestMetroFipsForExplore(numRegions: number) {
  const sortedMetros = reverse(
    sortBy(regions.metroAreas, metro => metro.population),
  );

  return take(sortedMetros, numRegions).map(
    locationInfo => locationInfo.fipsCode,
  );
}
