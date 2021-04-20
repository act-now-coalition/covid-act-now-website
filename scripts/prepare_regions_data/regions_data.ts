import flatten from 'lodash/flatten';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import type { Dictionary } from 'lodash';
import US_STATE_DATASET from './us_states_dataset_01_02_2020.json';
import metroAreaDataset from './msa-data.json';
import { State, County, MetroArea } from '../../src/common/regions/types';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

// used in the script to validate the generators
export const stateFipsToUrlSegment: { [index: string]: string } = {};
export const countyFipsToUrlSegment: { [index: string]: string } = {};
export const metroAreaFipsToUrlSegment: { [index: string]: string } = {};

function buildStates(): State[] {
  return map(state_dataset, stateInfo => {
    stateFipsToUrlSegment[stateInfo.state_fips_code] = stateInfo.state_url_name;
    return new State(
      stateInfo.state,
      stateInfo.state_fips_code,
      stateInfo.population,
      stateInfo.state_code,
    );
  });
}

function buildCounties(statesByFips: Dictionary<State>): County[] {
  return flatten(
    map(state_county_map_dataset, stateData => stateData.county_dataset),
  ).map(countyInfo => {
    /**
     * TODO: The following counties in New York State have the same
     * `full_fips_code ` (36061), but different `county_fips_code`.
     * Determine how we want to handle this before shipping.
     *
     * - New York County (county_fips_code: 061)
     * - Queens County (county_fips_code: 081)
     * - Richmond County" (county_fips_code: 085)
     * - Bronx County" (county_fips_code: 005)
     */
    const countyFips = `${countyInfo.state_fips_code}${countyInfo.county_fips_code}`;
    const state = statesByFips[countyInfo.state_fips_code];
    countyFipsToUrlSegment[countyFips] = countyInfo.county_url_name;
    return new County(
      countyInfo.county,
      countyFips,
      countyInfo.population,
      state.fipsCode,
    );
  });
}

function buildMetroAreas(
  countiesByFips: Dictionary<County>,
  statesByFips: Dictionary<State>,
): MetroArea[] {
  const statesByCode = keyBy(values(statesByFips), state => state.stateCode);

  return map(metroAreaDataset.metro_areas, metro => {
    const counties: County[] = metro.countyFipsCodes
      .map(countyFips => countiesByFips[countyFips] || null)
      .filter(county => county);

    const [name, statesText] = metro.cbsaTitle.split(', ');
    const stateCodes = statesText.split('-');

    const states = stateCodes
      .map(stateCode => statesByCode[stateCode])
      .filter(state => state);

    metroAreaFipsToUrlSegment[metro.cbsaCode] = metro.urlSegment;

    return new MetroArea(
      name,
      metro.cbsaCode,
      metro.population,
      states.map(state => state.fipsCode),
      counties.map(county => county.fipsCode),
    );
  });
}

const states: State[] = buildStates();
export const statesByFips = keyBy(states, state => state.fipsCode);

export const statesByStateCode = keyBy(states, state => state.stateCode);

const counties: County[] = buildCounties(statesByFips);
export const countiesByFips = keyBy(counties, county => county.fipsCode);

const metroAreas = buildMetroAreas(countiesByFips, statesByFips);
export const metroAreasByFips = keyBy(metroAreas, metro => metro.fipsCode);
