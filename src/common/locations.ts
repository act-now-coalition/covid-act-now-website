/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import urlJoin from 'url-join';
import { each, sortBy, takeRight, has, partition, toLower } from 'lodash';
import { assert } from './utils';
import countyAdjacencyMsa from './data/county_adjacency_msa.json';
import collegesByFips from './data/colleges_by_fips.json';
import { REVERSED_STATES, STATES as STATES_MAP } from 'common';

export interface AdjacencyData {
  [fips: string]: {
    adjacent_counties: string[];
    msa_code?: string;
  };
}

export const ADJACENT_COUNTIES: AdjacencyData = countyAdjacencyMsa.counties;

/** Aggregations supported by the Explore chart. */
export const AGGREGATED_LOCATIONS: Location[] = [
  {
    state_fips_code: '00',
    full_fips_code: '00001',
    state: 'USA',
    population: 331486822,
    state_code: 'USA',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00002',
    state: 'Native American Majority Counties',
    population: 314704,
    state_code: 'NAMC',
  },
];

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

function _findStateByFips(fips: string): State | undefined {
  return US_STATE_DATASET.state_dataset.find(
    state => state.state_fips_code === fips,
  );
}

export function isStateFips(fips: string): boolean {
  const state = _findStateByFips(fips);
  return !!state;
}

export function findStateByFips(fips: string): State {
  const state = _findStateByFips(fips);
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
  if (fips.startsWith('00')) {
    return (
      AGGREGATED_LOCATIONS.find(l => l.full_fips_code === fips)?.state || ''
    );
  }
  if (isStateFips(fips)) {
    return findStateByFips(fips).state;
  } else {
    const county = findCountyByFips(fips);
    return `${county.county}, ${county.state_code}`;
  }
}

export function getRelativeUrlForFips(fips: string): string {
  return `/${getCanonicalUrl(fips)}`;
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
  return fips.startsWith('00')
    ? AGGREGATED_LOCATIONS.find(l => l.full_fips_code === fips)
    : isStateFips(fips)
    ? findStateByFips(fips)
    : findCountyByFips(fips);
}

export function getColleges(fips: string): CollegeData[] {
  return COLLEGES[fips] || [];
}

export function getStateCode(stateName: string) {
  return REVERSED_STATES[stateName];
}

export function getStateName(stateCode: string): string | undefined {
  return (STATES_MAP as any)[stateCode];
}

const ALL_LOCATIONS = getLocationNames();
const locationsByType = partition(ALL_LOCATIONS, isCounty);
const COUNTIES = locationsByType[0] as County[];
export const STATES = locationsByType[1] as State[];

export function getStateByUrlName(stateUrlName: string): State | undefined {
  return STATES.find(
    state =>
      toLower(state.state_url_name) === toLower(stateUrlName) ||
      toLower(state.state_code) === toLower(stateUrlName),
  );
}

export function getCountyByUrlName(
  stateCode: string | undefined,
  countyUrlName: string,
): County | undefined {
  return COUNTIES.find(
    county =>
      toLower(county.county_url_name) === toLower(countyUrlName) &&
      toLower(county.state_code) === toLower(stateCode),
  );
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

export function isCounty(location: Location) {
  return location.county !== undefined;
}

export function isState(location: Location) {
  return !isCounty(location);
}

export function belongsToState(location: Location, stateFips: string) {
  return location.state_fips_code === stateFips;
}

export function locationNameFromUrlParams(stateId?: string, countyId?: string) {
  if (!stateId) {
    return '';
  }

  const state = getStateByUrlName(stateId);
  const countyOption =
    countyId && getCountyByUrlName(state?.state_code, countyId);
  const isValidLocation = state && !(countyId && !countyOption);

  if (!isValidLocation) {
    return '';
  }

  return state && countyId && countyOption
    ? `${countyOption.county}, ${state?.state}`
    : `${state?.state}`;
}

export function findFipsByUrlParams(
  stateUrlName?: string,
  countyUrlName?: string,
) {
  if (!stateUrlName) {
    return undefined;
  } else {
    const state = getStateByUrlName(stateUrlName);
    const countyOption =
      countyUrlName && getCountyByUrlName(state?.state_code, countyUrlName);

    return countyOption && state
      ? countyOption.full_fips_code
      : state && state.state_fips_code;
  }
}
