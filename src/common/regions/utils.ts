import concat from 'lodash/concat';
import partition from 'lodash/partition';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import values from 'lodash/values';
import isNull from 'lodash/isNull';
import without from 'lodash/without';
import regions from './region_db';
import { County, State, Region, RegionType, MetroArea } from './types';
import { GeolocationInfo } from 'common/hooks/useGeolocation';
import { CountyToZipMap } from 'common/data';

const UNITED_STATES = 'United States';

// getStateName, getStateCode, and getStateFips are helper functions that make migrating
// some of the existing state based logic over.  Ideally we will be able
// to remove these at some point, but they are helpful in the meantime.

export function getStateName(region: Region): string | null {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.fullName;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).fullName;
  }
  return null;
}

export function getStateCode(region: Region): string | null {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.stateCode;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).stateCode;
  }
  return null;
}
/*
Goes one step beyond getStateCode(). Inludes MSAs and returns each regionType's 'version' of a stateCode:
  metro -> dash-separated list of all states in which the MSA resides ('NY-NJ-PA')
  state -> state's stateCode ('NY')
  county -> stateCode of county's state ('NY')
*/

export function getFormattedStateCode(region: Region): string | null {
  if (
    region.regionType === RegionType.COUNTY ||
    region.regionType === RegionType.STATE
  ) {
    return getStateCode(region);
  } else if (region.regionType === RegionType.MSA) {
    return (region as MetroArea).stateCodes;
  } else {
    return null;
  }
}

export const getStateFips = (region: Region): string | null => {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.fipsCode;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).fipsCode;
  }
  return null;
};

export function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

const sortByPopulation = (regions: Region[]): Region[] =>
  sortBy(regions, region => -region.population);

/* Sort regions by name in ascending order.
If two regions have the same name, sort them by population in descending order. */
function sortByNameThenPopulation(locations: Region[]) {
  const sortedLocations = [...locations];
  sortedLocations.sort(compareRegionsByNameAndPopulation);
  return sortedLocations;
}

function compareRegionsByNameAndPopulation(region1: Region, region2: Region) {
  if (region1.name === region2.name)
    return region1.population < region2.population ? 1 : -1;
  else return region1.name < region2.name ? -1 : 1;
}

/**
 * Returns a list of regions in the order that is most relevant given the
 * region passed as argument
 *
 * Homepage (region is undefined): states, metros, counties
 * Metro: counties in metro, states, other counties, metros
 * State and County: counties in the state, states, metros, other counties
 */
export function getAutocompleteRegions(region?: Region): Region[] {
  const { states, metroAreas, counties } = regions;

  // Homepage
  if (!region) {
    return concat<Region>(
      sortByNameThenPopulation(states),
      sortByNameThenPopulation(metroAreas),
      sortByNameThenPopulation(counties),
    );
  }

  // Location pages
  if (region instanceof MetroArea) {
    const [countiesInMetro, otherCounties] = partition(counties, county =>
      region.countiesFipsCodes.includes(county.fipsCode),
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

function countyIncludesZip(
  county: County,
  countyToZipMap: CountyToZipMap,
  zipCode: string,
): boolean {
  return countyToZipMap[county.fipsCode]?.includes(zipCode);
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
  countyToZipMap: CountyToZipMap,
): Region | undefined {
  const countyFromZip = find(regions.counties, (region: County) =>
    countyIncludesZip(region, countyToZipMap, zipCode),
  );
  return countyFromZip;
}

export function getMetroRegionFromZipCode(
  zipCode: string,
  countyToZipMap: CountyToZipMap,
): Region | undefined {
  const countyFromZip = getCountyRegionFromZipCode(zipCode, countyToZipMap);
  const metroFromZip = find(regions.metroAreas, (region: MetroArea) =>
    region.countiesFipsCodes.includes((countyFromZip as County).fipsCode),
  );
  return metroFromZip;
}

export interface GeolocatedRegions {
  county?: Region;
  metroArea?: Region;
  state?: Region;
}

export function getGeolocatedRegions(
  geolocation: GeolocationInfo,
  countyToZipMap: CountyToZipMap,
): GeolocatedRegions | null {
  if (geolocation.country !== UNITED_STATES) {
    return null;
  } else {
    return {
      metroArea: getMetroRegionFromZipCode(geolocation.zipCode, countyToZipMap),
      county: getCountyRegionFromZipCode(geolocation.zipCode, countyToZipMap),
      state: getStateRegionFromStateCode(geolocation.stateCode),
    };
  }
}

export function filterUndefinedRegions(regions: any[]): Region[] | [] {
  return regions.filter(
    (region: Region | undefined) => region instanceof Region,
  );
}

/**
 * We rank a user's geolocated regions (state, county, metro if applicable) first
 * in the searchbar dropdown menu. This sorts the Region[] accordingly.
 */
export function getAutocompleteRegionsWithGeolocation(
  geolocation: GeolocationInfo,
  locations: Region[],
  countyToZipMap: CountyToZipMap,
): Region[] {
  const geolocatedRegions = getGeolocatedRegions(geolocation, countyToZipMap);

  if (isNull(geolocatedRegions)) {
    return locations;
  }

  const geolocatedRegionValues = values(geolocatedRegions);
  const sanitizedGeolocatedRegions: Region[] = filterUndefinedRegions(
    geolocatedRegionValues,
  );

  const otherRegions: Region[] = without(
    locations,
    ...sanitizedGeolocatedRegions,
  );

  const finalLocations = [...sanitizedGeolocatedRegions, ...otherRegions];

  return finalLocations;
}

/**
 * Checks if we've geolocated the user.
 * If so, returns autocomplete results with user's regions at the top.
 * If not, returns autocomplete results sorted for pagetype.
 */
export function getFinalAutocompleteLocations(
  geolocation?: GeolocationInfo,
  countyToZipMap?: CountyToZipMap,
): Region[] {
  const regionsSortedForPagetype = getAutocompleteRegions();
  if (!geolocation || !countyToZipMap) {
    return regionsSortedForPagetype;
  } else {
    return getAutocompleteRegionsWithGeolocation(
      geolocation,
      regionsSortedForPagetype,
      countyToZipMap,
    );
  }
}
