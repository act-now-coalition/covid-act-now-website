/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { each, has, partition, toLower } from 'lodash';
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

export function getAllLocations(): Location[] {
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

// export function findLocationForFips(fips: string): Location {
//   return fips.startsWith('00')
//     ? AGGREGATED_LOCATIONS.find(l => l.full_fips_code === fips)
//     : isStateFips(fips)
//     ? findStateByFips(fips)
//     : findCountyByFips(fips);
// }

export function getAdjacentCounties(fips: string): string[] {
  assert(fips in ADJACENT_COUNTIES, `${fips} not found in adjacency list.`);
  return ADJACENT_COUNTIES[fips].adjacent_counties;
}

export function getCountyMsaCode(fips: string): string | undefined {
  if (has(ADJACENT_COUNTIES, fips)) {
    return ADJACENT_COUNTIES[fips].msa_code;
  }
}

export function getColleges(fips: string): CollegeData[] {
  return COLLEGES[fips] || [];
}

const ALL_LOCATIONS = getAllLocations();
const locationsByType = partition(ALL_LOCATIONS, isCounty);
export const STATES = locationsByType[1] as State[];
