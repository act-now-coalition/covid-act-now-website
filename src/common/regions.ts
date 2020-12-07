import { chain, fromPairs } from 'lodash';
import urlJoin from 'url-join';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import countyAdjacencyMsa from './data/county_adjacency_msa.json';
const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

export type FipsCode = string;

export enum RegionType {
  COUNTY = 'county',
  STATE = 'state',
  CBSA = 'CBSA',
}

abstract class Region {
  constructor(
    public readonly name: string,
    protected readonly urlSegment: string,
    public readonly fipsCode: FipsCode,
    public readonly population: number,
    public readonly regionType: RegionType,
  ) {}

  abstract fullName(): string;
  abstract relativeUrl(): string;
  canonicalUrl() {
    return urlJoin('https://covidactnow.org', this.relativeUrl());
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

  fullName() {
    return this.name;
  }

  relativeUrl() {
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

  fullName() {
    return `${this.name}, ${this.state.stateCode}`;
  }

  relativeUrl() {
    return urlJoin(this.state.relativeUrl(), `county/${this.urlSegment}`);
  }
}

const states: State[] = chain(state_dataset)
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

const statesByFips = fromPairs(states.map(state => [state.fipsCode, state]));
const statesFipsList = states.map(state => state.fipsCode);

interface AdjacencyInfo {
  adjacent_counties: FipsCode[];
  msa_code?: string;
}

const adjacency: { [fipsCode: string]: AdjacencyInfo } =
  countyAdjacencyMsa.counties;

const counties: County[] = chain(state_county_map_dataset)
  .map(stateData => stateData.county_dataset)
  .flatten()
  .filter(county => statesFipsList.includes(county.state_fips_code))
  .map(countyInfo => {
    const countyFips = countyInfo.full_fips_code;
    const state = statesByFips[countyInfo.state_fips_code];
    const adjacentCounties = adjacency[countyFips]?.adjacent_counties;
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

class RegionDB {
  constructor(private regions: Region[]) {}

  private filterByType(regionType: RegionType) {
    return this.all().filter(region => region.regionType === regionType);
  }

  findByFipsCode(fipsCode: FipsCode): Region | null {
    const region = this.regions.find(region => region.fipsCode === fipsCode);
    return region || null;
  }

  all(): Region[] {
    return this.regions;
  }

  states(): Region[] {
    return this.filterByType(RegionType.STATE);
  }

  counties(): Region[] {
    return this.filterByType(RegionType.COUNTY);
  }
}

const regions = new RegionDB([...states, ...counties]);
export default regions;
