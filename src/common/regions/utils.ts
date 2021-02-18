import {
  concat,
  partition,
  sortBy,
  find,
  values,
  isNull,
  without,
} from 'lodash';
import regions from './region_db';
import { getStateFips } from './regions_data';
import { County, State, Region, MetroArea } from './types';
import { GeolocationInfo } from 'common/hooks/useGeolocation';
import { CountyToZipMap } from 'common/hooks/useCountyToZipMap';

const UNITED_STATES = 'United States';

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
export function getAutocompleteRegions(region?: Region): Region[] {
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
    region.counties.includes(countyFromZip as County),
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
