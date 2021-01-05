import { chain } from 'lodash';
import regions from 'common/regions';

/* Sets homepage explore presets to be 5 largest metro areas */
export function getLocationFipsCodesForExplore(numStates: number) {
  return chain(regions.metroAreas)
    .sortBy(metro => metro.population)
    .reverse()
    .take(numStates)
    .map(locationInfo => locationInfo.fipsCode)
    .value();
}
