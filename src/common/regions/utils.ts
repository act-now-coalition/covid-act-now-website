import { concat, partition, sortBy, find } from 'lodash';
import regions from './region_db';
import { getStateFips } from './regions_data';
import { County, State, Region, MetroArea } from './types';

export function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

const sortByPopulation = (regions: Region[]): Region[] =>
  sortBy(regions, region => -region.population);

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
    const sortedMetroCounties = sortByPopulation(countiesInMetro);

    return concat<Region>(
      sortedMetroCounties,
      states,
      metroAreas,
      otherCounties,
    );
  } else if (region instanceof State || region instanceof County) {
    const stateFips = getStateFips(region);
    const [stateCounties, otherCounties] = partition(counties, county =>
      belongsToState(county, stateFips),
    );
    const sortedStateCounties = sortByPopulation(stateCounties);

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

function countyIncludesZip(county: County, zipCode: string): boolean {
  return county.zipCodes.includes(zipCode);
}

export function getStateRegionFromStateCode(
  stateCode: string,
): Region | undefined {
  const regionFromStateCode = find(
    regions.states,
    (region: State) => region.stateCode === stateCode,
  );
  return regionFromStateCode;
}

export function getCountyRegionFromZipCode(
  zipCode: string,
): Region | undefined {
  const countyFromZip = find(regions.counties, (region: County) =>
    countyIncludesZip(region, zipCode),
  );
  return countyFromZip;
}

// TODO (Chelsi): fix the any
export function getMetroRegionFromZipCode(zipCode: string): any {
  const metroFromZip = find(regions.metroAreas, (region: MetroArea) =>
    find(region.counties, (region: County) =>
      countyIncludesZip(region, zipCode),
    ),
  );
  return metroFromZip;
}
