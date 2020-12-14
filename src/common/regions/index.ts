import { createContext } from 'react';
import { chain, Dictionary, fromPairs } from 'lodash';
import urlJoin from 'url-join';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import countyAdjacencyMsa from 'common/data/county_adjacency_msa.json';
import { getAbbreviatedCounty } from 'common/utils/compare';
import RegionDB from 'common/regions/region_db';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

export type FipsCode = string;

export enum RegionType {
  COUNTY = 'county',
  STATE = 'state',
  CBSA = 'CBSA',
}

export abstract class Region {
  constructor(
    public readonly name: string,
    public readonly urlSegment: string,
    public readonly fipsCode: FipsCode,
    public readonly population: number,
    public readonly regionType: RegionType,
  ) {}

  abstract get fullName(): string;
  abstract get abbreviation(): string;
  abstract get relativeUrl(): string;

  // Todo (Chelsi) - switch back before merging (or maybe keep this change)
  get canonicalUrl() {
    // return urlJoin('https://covidactnow.org', this.relativeUrl);
    return urlJoin(window.location.origin, this.relativeUrl);
  }
}

export class State extends Region {
  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    public readonly stateCode: string,
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.STATE);
  }

  /**
   * State: Washington
   * County: King County, Washington
   */
  get fullName() {
    return this.name;
  }

  get abbreviation() {
    return this.stateCode;
  }
  get relativeUrl() {
    return `us/${this.urlSegment}`;
  }
}

export class County extends Region {
  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    public readonly state: State,
    public readonly cityNames: string[],
    private readonly adjacentCountiesFips: FipsCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.COUNTY);
  }

  get fullName() {
    return `${this.name}, ${this.state.name}`;
  }

  get relativeUrl() {
    return urlJoin(this.state.relativeUrl, `county/${this.urlSegment}`);
  }

  get abbreviation() {
    return getAbbreviatedCounty(this.name);
  }
  get stateCode() {
    return this.state.stateCode;
  }
}

// getStateName, getStateCode, and getStateFips are helper functions that make migrating
// some of the existing state based logic over.  Ideally we will be able
// to remove these at some point, but they are helpful in the meantime.
export const getStateName = (region: Region): string | null => {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.fullName;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).fullName;
  }
  return null;
};

export const getStateCode = (region: Region): string | null => {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.stateCode;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).stateCode;
  }
  return null;
};

export const getStateFips = (region: Region): string | null => {
  if (region.regionType === RegionType.COUNTY) {
    return (region as County).state.fipsCode;
  }
  if (region.regionType === RegionType.STATE) {
    return (region as State).fipsCode;
  }
  return null;
};

const buildStates = () => {
  const states = chain(state_dataset)
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
  return states;
};

const buildCounties = (
  statesByFips: Dictionary<State>,
  countyAdjacency: { [fipsCode: string]: AdjacencyInfo },
) => {
  const counties = chain(state_county_map_dataset)
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
  return counties;
};

const states: State[] = buildStates();
const statesByFips = fromPairs(states.map(state => [state.fipsCode, state]));
const statesFipsList = states.map(state => state.fipsCode);

interface AdjacencyInfo {
  adjacent_counties: FipsCode[];
  msa_code?: string;
}
const adjacency: { [fipsCode: string]: AdjacencyInfo } =
  countyAdjacencyMsa.counties;

const counties: County[] = buildCounties(statesByFips, adjacency);

// We are careful to never call `useRegion()` in components that are not
// nested inside `<RegionContext.Provider>` so we cheat and pretend that the
// value is non-nullable
export const RegionContext = createContext<Region>(null as any);

const regions = new RegionDB(states, counties);
export default regions;
