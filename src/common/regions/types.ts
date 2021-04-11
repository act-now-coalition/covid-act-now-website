import urlJoin from 'url-join';
import mapValues from 'lodash/mapValues';

import statesByFipsJson from 'common/data/states_by_fips.json';

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

  abstract toJSON(): RegionObject;
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

  public toJSON(): StateObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      s: this.stateCode,
    };
  }

  public static fromJSON(obj: StateObject): State {
    return new State(obj.n, obj.u, obj.f, obj.p, obj.s);
  }
}

/**
 * Construct this mapping here, so we can reference it to simplify reconstitution
 * of County and MetroArea objects.  The overall size for ~50 states is quite small,
 * so it's not worth trying to pull out of the main bundle, and having the lookup
 * available is quite handy.
 */
export const statesByFips = mapValues(
  statesByFipsJson as { [fips: string]: StateObject },
  v => State.fromJSON(v),
);

export const findStateByFipsCode = (fips: FipsCode): State | null => {
  return statesByFips[fips] ?? null;
};

export const findStateByFipsCodeStrict = (fips: FipsCode): State => {
  const state = findStateByFipsCode(fips);
  assert(state, `State unexpectedly not found for ${fips}`);
  return state;
};

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
  public readonly state: State;

  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    stateFips: FipsCode,
    public readonly adjacentCountiesFips: FipsCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.COUNTY);
    this.state = statesByFips[stateFips];
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

  public toJSON(): CountyObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      s: this.state.fipsCode,
      a: this.adjacentCountiesFips,
    };
  }

  public static fromJSON(obj: CountyObject): County {
    return new County(obj.n, obj.u, obj.f, obj.p, obj.s, obj.a);
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
  public readonly states: State[];

  constructor(
    name: string,
    urlSegment: string,
    fipsCode: FipsCode,
    population: number,
    // MetroAreas are constructed by FIPS for states, but the states are retrieved
    // and stored as objects
    statesFips: FipsCode[],
    // We intentionally only store counties by FIPS code instead of rich objects
    // so we can construct MetroArea objects without loading the entire counties DB.
    // This will be very useful for rendering things above the fold on location pages
    // and deferred loading the big data for charts down below.
    // If you need the county object, you  can look it up by FIPS from the regions_db.
    public readonly countiesFips: FipsCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.MSA);
    this.states = statesFips.map(fips => statesByFips[fips]);
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
    return (
      subregion instanceof County &&
      this.countiesFips.includes(subregion.fipsCode)
    );
  }

  public toJSON(): MetroAreaObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      s: this.states.map(state => state.fipsCode),
      c: this.countiesFips,
    };
  }

  public static fromJSON(obj: MetroAreaObject): MetroArea {
    return new MetroArea(obj.n, obj.u, obj.f, obj.p, obj.s, obj.c);
  }
}
