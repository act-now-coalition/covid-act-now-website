/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { each, sortBy, takeRight } from 'lodash';
import { assert } from './utils';

// TODO(michael): Move more common code here.
export interface State {
  state_code: string;
  state: string;
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
}

export function getLocationNames(): Location[] {
  const locations = US_STATE_DATASET.state_dataset.map(state => {
    return {
      ...state,
      full_fips_code: state.state_fips_code,
    };
  });

  each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
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

export function getLocationUrlForFips(fips: string): string {
  if (fips.length === 2) {
    const state = findStateByFips(fips);
    return `https://covidactnow.org/us/${state.state_code.toLowerCase()}/`;
  } else {
    const county = findCountyByFips(fips);
    return `https://covidactnow.org/us/${county.state_code.toLowerCase()}/county/${
      county.county_url_name
    }`;
  }
}

export function topCountiesByPopulation(limit: number): County[] {
  const allCounties = [];
  const statesData = US_STATE_DATASET.state_county_map_dataset as any;
  for (const state in statesData) {
    const countiesData = statesData[state].county_dataset;
    allCounties.push(...countiesData);
  }

  return takeRight(
    sortBy(allCounties, c => c.population),
    limit,
  );
}
