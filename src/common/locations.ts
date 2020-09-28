/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import urlJoin from 'url-join';
import {
  each,
  sortBy,
  takeRight,
  has,
  partition,
  isUndefined,
  toLower,
} from 'lodash';
import { assert } from './utils';
import countyAdjacencyMsa from './data/county_adjacency_msa.json';
import collegesByFips from './data/colleges_by_fips.json';
import { REVERSED_STATES } from 'common';
import { isCounty } from '../components/AutocompleteLocations';

interface AdjacencyData {
  [fips: string]: {
    adjacent_counties: string[];
    msa_code?: string;
  };
}

const ADJACENT_COUNTIES: AdjacencyData = countyAdjacencyMsa.counties;

interface CollegeData {
  fips: string;
  name: string;
  ft_enroll: number;
}

interface CollegeMap {
  [fips: string]: CollegeData[];
}

const COLLEGES: CollegeMap = collegesByFips;

// TODO(michael): Move more common code here.
export interface State {
  state_code: string;
  state: string;
  state_url_name: string;
  state_fips_code: string;
  population: number;
}

export interface County {
  county: string;
  county_url_name: string;
  county_fips_code: string;
  state_fips_code: string;
  state_code: string;
  full_fips_code: string;
  cities: string[];
  population: number;
}

export interface Location {
  county?: string;
  county_url_name?: string;
  county_fips_code?: string;
  state_fips_code: string;
  full_fips_code?: string;
  cities?: string[];
  population: number;
  state_code: string;
  state: string;
  state_url_name?: string;
}

export function getLocationNames(): Location[] {
  const locations: Location[] = US_STATE_DATASET.state_dataset.map(state => {
    return {
      ...state,
      full_fips_code: state.state_fips_code,
    };
  });

  each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
    if (value.county_dataset.length === 0) {
      return null;
    }
    locations.push(
      ...value.county_dataset.map(county => {
        return { ...county, state: county.state_code };
      }),
    );
  });

  return locations;
}

// TODO(michael): Make this return County type and fix up references.
export function findCountyByFips(fips: string) {
  // NYC HACK.
  if (['36047', '36061', '36005', '36081', '36085'].includes(fips)) {
    fips = '36061';
  }

  const statesData = US_STATE_DATASET.state_county_map_dataset as any;
  for (const state in statesData) {
    const countiesData = statesData[state].county_dataset;
    for (const county of countiesData) {
      if (String(county.full_fips_code) === String(fips)) {
        return county;
      }
    }
  }
  return undefined;
}

export function isValidState(fips: string): boolean {
  const state = US_STATE_DATASET.state_dataset.find(
    state => state.state_fips_code === fips,
  );
  return !!state;
}

export function findStateByFips(fips: string): State {
  const state = US_STATE_DATASET.state_dataset.find(
    state => state.state_fips_code === fips,
  );
  assert(state !== undefined, `Invalid fips: ${fips}`);
  return state;
}

export function findStateFipsCode(stateCode: string): string {
  const fips = US_STATE_DATASET.state_dataset.find(
    state => state.state_code === stateCode,
  )?.state_fips_code;
  assert(fips !== undefined, `Invalid state code: ${stateCode}`);
  return fips;
}

export function getLocationNameForFips(fips: string): string {
  if (fips.length === 2) {
    return findStateByFips(fips).state;
  } else {
    const county = findCountyByFips(fips);
    return `${county.county}, ${county.state_code}`;
  }
}

export function getRelativeUrlForFips(fips: string): string {
  if (isStateFips(fips)) {
    const state = findStateByFips(fips);
    return `/us/${state.state_code.toLowerCase()}/`;
  } else {
    const county = findCountyByFips(fips);
    return `/us/${county.state_code.toLowerCase()}/county/${
      county.county_url_name
    }/`;
  }
}

export function getLocationUrlForFips(fips: string): string {
  return urlJoin('https://covidactnow.org', getRelativeUrlForFips(fips));
}

const allCountiesCache: County[] = [];
export function allCounties(): County[] {
  if (allCountiesCache.length === 0) {
    const statesData = US_STATE_DATASET.state_county_map_dataset as any;
    for (const state in statesData) {
      const countiesData = statesData[state].county_dataset;
      allCountiesCache.push(...countiesData);
    }
  }
  return allCountiesCache;
}

export function topCountiesByPopulation(limit: number): County[] {
  return takeRight(
    sortBy(allCounties(), c => c.population),
    limit,
  );
}

export function isStateFips(fips: string) {
  return fips.length === 2;
}

export function getAdjacentCounties(fips: string): string[] {
  assert(fips in ADJACENT_COUNTIES, `${fips} not found in adjacency list.`);
  return ADJACENT_COUNTIES[fips].adjacent_counties;
}

export function getCountyMsaCode(fips: string): string | undefined {
  if (has(ADJACENT_COUNTIES, fips)) {
    return ADJACENT_COUNTIES[fips].msa_code;
  }
}

export function findLocationForFips(fips: string): Location {
  return isStateFips(fips) ? findStateByFips(fips) : findCountyByFips(fips);
}

export function getColleges(fips: string): CollegeData[] {
  return COLLEGES[fips] || [];
}

export function getStateCode(stateName: string) {
  return REVERSED_STATES[stateName];
}

const ALL_LOCATIONS = getLocationNames();
const [COUNTIES, STATES] = partition(ALL_LOCATIONS, isCounty);

export function getStateByUrlName(stateUrlName: string): Location | undefined {
  return STATES.find(
    state =>
      toLower(state.state_url_name) === toLower(stateUrlName) ||
      toLower(state.state_code) === toLower(stateUrlName),
  );
}

export function getCountyByUrlName(
  countyUrlName: string,
): Location | undefined {
  return COUNTIES.find(
    county => toLower(county.county_url_name) === toLower(countyUrlName),
  );
}

export function getLocationByUrlParams(
  stateUrlName: string,
  countyUrlName?: string,
): Location | undefined {
  const location = countyUrlName
    ? getCountyByUrlName(countyUrlName)
    : getStateByUrlName(stateUrlName);

  assert(
    isUndefined(location),
    `Location for URL params '${stateUrlName}' and '${countyUrlName}' not found`,
  );

  return location;
}

export function getCanonicalUrl(fipsCode: string) {
  const { state_fips_code, county, county_url_name } = findLocationForFips(
    fipsCode,
  );
  const { state_url_name } = findStateByFips(state_fips_code);
  return county
    ? `us/${state_url_name}/county/${county_url_name}`
    : `us/${state_url_name}`;
}
