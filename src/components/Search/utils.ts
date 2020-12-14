import regions, { RegionType, County, getStateFips } from 'common/regions';
import { sortBy, partition } from 'lodash';
import { stateColor, countyColor } from 'common/colors';

// Todo (Chelsi): replace the many anys

// Move somewhere more central:
function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

export function getSearchAutocompleteLocations(region?: any) {
  const allStates = regions.states;
  const allCounties = regions.counties;

  const sortedStates = sortBy(allStates, state => state.name);
  const sortedCounties = sortBy(allCounties, county => county.name);

  if (!region) {
    return [...sortedStates, ...sortedCounties];
  }

  const stateFips = getStateFips(region);
  const [stateCounties, otherCounties] = partition(sortedCounties, county =>
    belongsToState(county, stateFips),
  );

  return [...stateCounties, ...sortedStates, ...otherCounties];
}

/* To get color of location icon in dropdown menu:  */
export function getStateIconFillColor(region?: any) {
  if (region.regionType === RegionType.STATE) {
    return stateColor(region.stateCode);
  }
  return countyColor(region.fipsCode, stateColor(region.state.stateCode));
}

/* 
  Determines amount of locations that show in dropdown menu when clicking into searchbar.
  If on homepage, should only show states.
  If on location page, should only show counties within state.
*/
export function getFilterLimit(region?: any) {
  if (region) {
    const stateFips = getStateFips(region);
    const countiesInState = regions.counties.filter(county =>
      belongsToState(county, stateFips),
    );
    return countiesInState.length;
  }
  return regions.states.length;
}
