import flatten from 'lodash/flatten';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import type { Dictionary } from 'lodash';
import US_STATE_DATASET from './us_states_dataset_01_02_2020.json';
import countyAdjacencyMsa from './county_adjacency_msa.json';
import metroAreaDataset from './msa-data.json';
import {
  FipsCode,
  State,
  County,
  MetroArea,
} from '../../src/common/regions/types';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

function buildStates(): State[] {
  return map(
    state_dataset,
    stateInfo =>
      new State(
        stateInfo.state,
        stateInfo.state_url_name,
        stateInfo.state_fips_code,
        stateInfo.population,
        stateInfo.state_code,
      ),
  );
}

function buildCounties(
  statesByFips: Dictionary<State>,
  countyAdjacency: { [fipsCode: string]: AdjacencyInfo },
): County[] {
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
    const adjacentCounties = countyAdjacency[countyFips]?.adjacent_counties;
    return new County(
      countyInfo.county,
      countyInfo.county_url_name,
      countyFips,
      countyInfo.population,
      state.fipsCode,
      adjacentCounties || [],
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

    return new MetroArea(
      name,
      metro.urlSegment,
      metro.cbsaCode,
      metro.population,
      counties.map(county => county.fipsCode),
      states.map(state => state.fipsCode),
    );
  });
}

const states: State[] = buildStates();
export const statesByFips = keyBy(states, state => state.fipsCode);

export const statesByStateCode = keyBy(states, state => state.stateCode);

interface AdjacencyInfo {
  adjacent_counties: FipsCode[];
  msa_code?: string;
}
const adjacency: Dictionary<AdjacencyInfo> = countyAdjacencyMsa.counties;

const counties: County[] = buildCounties(statesByFips, adjacency);
export const countiesByFips = keyBy(counties, county => county.fipsCode);

const metroAreas = buildMetroAreas(countiesByFips, statesByFips);
export const metroAreasByFips = keyBy(metroAreas, metro => metro.fipsCode);

const customAreas = [
  new State('USA', '', '00001', 331486822, 'USA'),
  new State('Native American Majority Counties', '', '00002', 314704, 'NAMC'),
];

export const customAreasByFips = keyBy(customAreas, metro => metro.fipsCode);
