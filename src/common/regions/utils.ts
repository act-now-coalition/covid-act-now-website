import { concat, partition, sortBy } from 'lodash';
import regions from './region_db';
import { getStateFips } from './regions_data';
import { County, State, Region, MetroArea } from './types';

export function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

/**
 * Returns a list of regions in the order that is most relevant given the
 * region passed as argument
 *
 * Homepage (region is undefined): states, metros, counties
 * Metro: counties in metro, states, other counties, metros
 * State and County: counties in the state, states, metros, other counties
 */
export function getAutocompleteRegions(region?: Region) {
  const { states, metroAreas, counties } = regions;

  // Homepage
  if (!region) {
    return concat<Region>(states, metroAreas, counties);
  }

  // Location pages
  if (region instanceof MetroArea) {
    const [countiesInMetro, otherCounties] = partition(counties, county =>
      region.counties.includes(county),
    );
    const sortedMetroCounties = sortBy(
      countiesInMetro,
      county => -county.population,
    );

    return concat<Region>(
      sortedMetroCounties,
      states,
      otherCounties,
      metroAreas,
    );
  } else if (region instanceof State || region instanceof County) {
    const stateFips = getStateFips(region);
    const [stateCounties, otherCounties] = partition(counties, county =>
      belongsToState(county, stateFips),
    );
    const sortedStateCounties = sortBy(
      stateCounties,
      county => -county.population,
    );

    return concat<Region>(
      sortedStateCounties,
      states,
      metroAreas,
      otherCounties,
    );
  } else {
    return [];
  }
}
