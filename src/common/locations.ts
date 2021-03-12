/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { each, has } from 'lodash';
import { assert } from './utils';
import countyAdjacencyMsa from './data/county_adjacency_msa.json';
import { STATES as STATES_MAP } from 'common';

interface AdjacencyData {
  [fips: string]: {
    adjacent_counties: string[];
    msa_code?: string;
  };
}

const ADJACENT_COUNTIES: AdjacencyData = countyAdjacencyMsa.counties;

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

export interface Location {
  county?: string;
  county_url_name?: string;
  county_fips_code?: string;
  state_fips_code: string;
  full_fips_code?: string;
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

export function getCountyMsaCode(fips: string): string | undefined {
  if (has(ADJACENT_COUNTIES, fips)) {
    return ADJACENT_COUNTIES[fips].msa_code;
  }
}

export function getStateName(stateCode: string): string | undefined {
  return (STATES_MAP as any)[stateCode];
}
