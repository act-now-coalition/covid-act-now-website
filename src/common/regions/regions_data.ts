import { chain, Dictionary, fromPairs } from 'lodash';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import countyAdjacencyMsa from 'common/data/county_adjacency_msa.json';
import metroAreaDataset from 'common/data/msa-data.json';
import countyFipsToZips from 'components/MapSelectors/datasets';
import {
  RegionType,
  FipsCode,
  Region,
  State,
  County,
  MetroArea,
} from './types';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

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
  return chain(state_county_map_dataset)
    .map(stateData => stateData.county_dataset)
    .flatten()
    .map(countyInfo => {
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
      const zipCodes = countyFipsToZips[countyFips];
      return new County(
        countyInfo.county,
        countyInfo.county_url_name,
        countyFips,
        countyInfo.population,
        state,
        adjacentCounties || [],
        zipCodes || [],
      );
    })
    .value();
}

function buildMetroAreas(
  countiesByFips: Dictionary<County>,
  statesByFips: Dictionary<State>,
): MetroArea[] {
  const statesByCode = chain(statesByFips)
    .values()
    .map(state => [state.stateCode, state])
    .fromPairs()
    .value();

  return chain(metroAreaDataset.metro_areas)
    .map(metro => {
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
        counties,
        states,
      );
    })
    .value();
}

const states: State[] = buildStates();
export const statesByFips = fromPairs(
  states.map(state => [state.fipsCode, state]),
);

interface AdjacencyInfo {
  adjacent_counties: FipsCode[];
  msa_code?: string;
}
const adjacency: Dictionary<AdjacencyInfo> = countyAdjacencyMsa.counties;

const counties: County[] = buildCounties(statesByFips, adjacency);
export const countiesByFips = fromPairs(
  counties.map(county => [county.fipsCode, county]),
);

const metroAreas = buildMetroAreas(countiesByFips, statesByFips);
export const metroAreasByFips = fromPairs(
  metroAreas.map(metro => [metro.fipsCode, metro]),
);

const customAreas = [
  new State('USA', '', '00001', 331486822, 'USA'),
  new State('Native American Majority Counties', '', '00002', 314704, 'NAMC'),
];

export const customAreasByFips = fromPairs(
  customAreas.map(metro => [metro.fipsCode, metro]),
);
