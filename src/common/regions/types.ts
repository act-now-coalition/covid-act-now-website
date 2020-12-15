import urlJoin from 'url-join';
import { getAbbreviatedCounty } from 'common/utils/compare';

export type FipsCode = string;
export type ZipCode = string;

export enum RegionType {
  COUNTY = 'county',
  STATE = 'state',
  MSA = 'MSA',
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
  abstract get shortName(): string;
  abstract get abbreviation(): string;
  abstract get relativeUrl(): string;

  // Todo (Chelsi) - switch back before merging (or maybe keep this change)
  get canonicalUrl() {
    // return urlJoin('https://covidactnow.org', this.relativeUrl);
    return urlJoin(window.location.origin, this.relativeUrl);
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
    private readonly zipCodes: ZipCode[],
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
    private stateCodeList: string[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.MSA);
  }

  get fullName() {
    return `${this.name}, ${this.stateCodes}`;
  }

  get shortName() {
    return this.name;
  }

  get abbreviation() {
    return this.name;
  }

  get relativeUrl() {
    return `us/metro/${this.urlSegment}`;
  }

  get stateCodes() {
    return this.stateCodeList.join('-');
  }
}
