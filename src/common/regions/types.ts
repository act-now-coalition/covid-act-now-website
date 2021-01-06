import urlJoin from 'url-join';
import { getAbbreviatedCounty } from 'common/utils/compare';

export type FipsCode = string;
export type ZipCode = string;

export enum RegionType {
  COUNTY = 'county',
  STATE = 'state',
  MSA = 'MSA',
}

/* Used to rename some metro principal cities for clarity: */
const DC_METRO_FIPS = '47900';
const NY_METRO_FIPS = '35620';

interface FipsToPrincipalCityName {
  [key: string]: string;
}

const fipsToPrincipalCityRenames: FipsToPrincipalCityName = {
  [DC_METRO_FIPS]: 'Washington DC',
  [NY_METRO_FIPS]: 'New York City',
};

export abstract class Region {
  constructor(
    public readonly name: string,
    public readonly urlSegment: string,
    public readonly fipsCode: FipsCode,
    public readonly population: number,
    public readonly regionType: RegionType,
  ) {}

  abstract get fullName(): string;
  abstract get shortName(): string;
  abstract get abbreviation(): string;
  abstract get relativeUrl(): string;

  get canonicalUrl() {
    return urlJoin('https://covidactnow.org', this.relativeUrl);
  }

  toString() {
    return `${this.name} (fips=${this.fipsCode})`;
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

  get fullName() {
    return this.name;
  }

  get shortName() {
    return this.name;
  }

  get abbreviation() {
    return this.stateCode;
  }

  get relativeUrl() {
    return `/us/${this.urlSegment}`;
  }
}

export class County extends Region {
  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    public readonly state: State,
    private readonly adjacentCountiesFips: FipsCode[],
    public readonly zipCodes: ZipCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.COUNTY);
  }

  get fullName() {
    return `${this.name}, ${this.state.name}`;
  }

  get shortName() {
    return `${this.name}, ${this.stateCode}`;
  }

  get abbreviation() {
    return getAbbreviatedCounty(this.name);
  }

  get relativeUrl() {
    return urlJoin(this.state.relativeUrl, `county/${this.urlSegment}`);
  }

  get stateCode() {
    return this.state.stateCode;
  }
}

/**
 * Metropolitan Statistical Areas
 */
export class MetroArea extends Region {
  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    public counties: County[],
    public states: State[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.MSA);
  }

  private get principalCityName() {
    if (this.fipsCode in fipsToPrincipalCityRenames) {
      return fipsToPrincipalCityRenames[this.fipsCode];
    }
    return this.name.split('-')[0];
  }
  get fullName() {
    return `${this.principalCityName} metro area`;
  }

  get shortName() {
    return `${this.principalCityName} metro`;
  }

  get abbreviation() {
    return this.shortName;
  }

  get relativeUrl() {
    return `/us/metro/${this.urlSegment}`;
  }

  get stateCodes() {
    return this.states.map(state => state.stateCode).join('-');
  }
}
