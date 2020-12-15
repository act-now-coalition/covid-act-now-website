import regions, {
  County,
  getStateFips,
  State,
  Region,
  MetroArea,
} from 'common/regions';
import { sortBy, partition } from 'lodash';
import { stateColor, countyColor } from 'common/colors';

// Move somewhere more central:
function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

export function getSearchAutocompleteLocations(region?: Region) {
  console.log('metros', regions.metroAreas);
  const allStates = regions.states;
  const allCounties = regions.counties;
  const allmetros = regions.metroAreas;

  const sortedStates = sortBy(allStates, state => state.name);
  const sortedCounties = sortBy(allCounties, county => county.name);
  const sortedMetros = sortBy(allmetros, metro => metro.name);

  // Homepage:
  if (!region) {
    return [...sortedStates, ...sortedMetros, ...sortedCounties];
  }

  // Metro page:
  // TODO (chelsi): use same logic as state/county pages (return counties in metro first)
  if (region instanceof MetroArea) {
    return [...sortedStates, ...sortedMetros, ...sortedCounties];
  }

  // County and state pages:
  const stateFips = getStateFips(region);
  const [stateCounties, otherCounties] = partition(sortedCounties, county =>
    belongsToState(county, stateFips),
  );

  return [...stateCounties, ...sortedStates, ...sortedMetros, ...otherCounties];
}

/* To get color of location icon in dropdown menu:  */
export function getStateIconFillColor(region: Region) {
  // TODO (chelsi): fix once we decide upon icon for MSAs
  if (region instanceof MetroArea) {
    return 'blue';
  }
  if (region instanceof State) {
    return stateColor((region as State).stateCode);
  }
  return countyColor(
    region.fipsCode,
    stateColor((region as County).state.stateCode),
  );
}

/* 
  Determines amount of locations that show in dropdown menu when clicking into searchbar.
  If on homepage, should only show states.
  If on location page, should only show counties within state.
*/
export function getFilterLimit(region?: Region) {
  if (region) {
    // TODO (chelsi): use same logic as state/county pages (return # of counties in metro?)
    if (region instanceof MetroArea) {
      return 20;
    }
    const stateFips = getStateFips(region);
    const countiesInState = regions.counties.filter(county =>
      belongsToState(county, stateFips),
    );
    return countiesInState.length;
  }
  return regions.states.length;
}
