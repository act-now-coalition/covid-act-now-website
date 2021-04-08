import urlJoin from 'url-join';

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

// JSON-serializable representation of a Region object
export interface RegionObject {
  n: string;
  u: string;
  f: FipsCode;
  p: number;
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

  /**
   * Returns true if this region (at least partially) contains the specified subregion.
   *
   * Notes:
   *  - If a metro is partially contained within a state, state.contains(metro) returns true
   *  - Regions do not contain themselves, i.e. region.contains(region) returns false
   */
  abstract contains(subregion: Region): boolean;

  get canonicalUrl() {
    return urlJoin('https://covidactnow.org', this.relativeUrl);
  }

  toString() {
    return `${this.name} (fips=${this.fipsCode})`;
  }

  abstract toObject(): RegionObject;
}

export interface StateObject extends RegionObject {
  s: string;
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
    return `/us/${this.urlSegment}/`;
  }

  contains(subregion: Region): boolean {
    return (
      (subregion instanceof MetroArea && subregion.states.includes(this)) ||
      (subregion instanceof County && subregion.state === this)
    );
  }

  public toObject(): StateObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      s: this.stateCode,
    };
  }

  public static fromObject(obj: StateObject): State {
    const s = new State(obj.n, obj.u, obj.f, obj.p, obj.s);
    return s;
  }
}

/**
 * Shortens the county name by using the abbreviated version of 'county'
 * or the equivalent administrative division.
 */
export function getAbbreviatedCounty(fullCountyName: string) {
  if (fullCountyName.includes('Parish'))
    return fullCountyName.replace('Parish', 'Par.');
  if (fullCountyName.includes('Borough'))
    return fullCountyName.replace('Borough', 'Bor.');
  if (fullCountyName.includes('Census Area'))
    return fullCountyName.replace('Census Area', 'C.A.');
  if (fullCountyName.includes('Municipality'))
    return fullCountyName.replace('Municipality', 'Mun.');
  if (fullCountyName.includes('Municipio'))
    return fullCountyName.replace('Municipio', 'Mun.');
  else return fullCountyName.replace('County', 'Co.');
}

export interface CountyObject extends RegionObject {
  s: FipsCode;
  a: FipsCode[];
}

export class County extends Region {
  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    public readonly state: State,
    public readonly adjacentCountiesFips: FipsCode[],
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
    return urlJoin(this.state.relativeUrl, `county/${this.urlSegment}/`);
  }

  get stateCode() {
    return this.state.stateCode;
  }

  contains(subregion: Region): boolean {
    return false;
  }

  public toObject(): CountyObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      s: this.state.fipsCode,
      a: this.adjacentCountiesFips,
    };
  }

  public static fromObject(
    obj: CountyObject,
    stateLookup: { [fips: string]: State },
  ): County {
    const state = stateLookup[obj.s];
    return new County(obj.n, obj.u, obj.f, obj.p, state, obj.a);
  }
}

export interface MetroAreaObject extends RegionObject {
  c: FipsCode[];
  s: FipsCode[];
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

  get isSingleStateMetro() {
    return this.states.length === 1;
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
    return `/us/metro/${this.urlSegment}/`;
  }

  get stateCodes() {
    return this.states.map(state => state.stateCode).join('-');
  }

  contains(subregion: Region): boolean {
    return subregion instanceof County && this.counties.includes(subregion);
  }

  public toObject(): MetroAreaObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      c: this.counties.map(county => county.fipsCode),
      s: this.states.map(state => state.fipsCode),
    };
  }

  public static fromObject(
    obj: MetroAreaObject,
    stateLookup: { [fips: string]: State },
    countyLookup: { [fips: string]: County },
  ): MetroArea {
    const counties = obj.c.map((code: FipsCode) => countyLookup[code]);
    const states = obj.s.map((code: FipsCode) => stateLookup[code]);
    return new MetroArea(obj.n, obj.u, obj.f, obj.p, counties, states);
  }
}
