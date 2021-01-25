import { chain } from 'lodash';
import regions from 'common/regions';

/* Gets fips of 5 largest metro areas to set as homepage explore presets */
export function getLargestMetroFipsForExplore(numRegions: number) {
  return chain(regions.metroAreas)
    .sortBy(metro => metro.population)
    .reverse()
    .take(numRegions)
    .map(locationInfo => locationInfo.fipsCode)
    .value();
}
