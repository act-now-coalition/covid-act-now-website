import { chain, Dictionary, fromPairs } from 'lodash';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import countyAdjacencyMsa from 'common/data/county_adjacency_msa.json';
import { RegionType, FipsCode, Region, State, County } from './types';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

// getStateName and getStateCode are helper functions that make migrating
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

function buildStates(): State[] {
  return chain(state_dataset)
    .map(stateInfo => {
      return new State(
        stateInfo.state,
        stateInfo.state_url_name,
        stateInfo.state_fips_code,
        stateInfo.population,
        stateInfo.state_code,
      );
    })
    .value();
}

function buildCounties(
  statesByFips: Dictionary<State>,
  countyAdjacency: { [fipsCode: string]: AdjacencyInfo },
): County[] {
  const statesFipsList = states.map(state => state.fipsCode);
  return chain(state_county_map_dataset)
    .map(stateData => stateData.county_dataset)
    .flatten()
    .filter(county => statesFipsList.includes(county.state_fips_code))
    .map(countyInfo => {
      const countyFips = countyInfo.full_fips_code;
      const state = statesByFips[countyInfo.state_fips_code];
      const adjacentCounties = countyAdjacency[countyFips]?.adjacent_counties;
      return new County(
        countyInfo.county,
        countyInfo.county_url_name,
        countyInfo.full_fips_code,
        countyInfo.population,
        state,
        countyInfo.cities || [],
        adjacentCounties || [],
      );
    })
    .value();
}

export const states: State[] = buildStates();
export const statesByFips = fromPairs(
  states.map(state => [state.fipsCode, state]),
);

interface AdjacencyInfo {
  adjacent_counties: FipsCode[];
  msa_code?: string;
}
const adjacency: Dictionary<AdjacencyInfo> = countyAdjacencyMsa.counties;

export const counties: County[] = buildCounties(statesByFips, adjacency);
export const countiesByFips = fromPairs(
  counties.map(county => [county.fipsCode, county]),
);
