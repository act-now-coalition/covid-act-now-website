import urlJoin from 'url-join';
import mapValues from 'lodash/mapValues';

import { assert } from '@actnowcoalition/assert';

import statesByFipsJson from 'common/data/states_by_fips.json';

export type FipsCode = string;
export type ZipCode = string;

export enum RegionType {
  NATION = 'nation',
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

/**
 * Common name-to-url-segment manipulation.
 * Some have custom things to do though, which are handled below.
 */
const mungeName = (s: string) => {
  let t = s;
  // make lowercase (order of this matters for above)
  t = t.toLowerCase();
  // replace slashes with dashes
  t = t.replace(/\//g, '-');
  // replace double-dashes with dashes
  t = t.replace(/--/g, '-');
  // remove accents from characters
  t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // replace O' with O_ (e.g., O'Brien)
  t = t.replace(/^o'/, 'o_');
  // remove periods
  t = t.replace(/[.]/g, '');
  // remove apostrophes
  t = t.replace(/[']/g, '');
  return t;
};

/**
 * Compute the urlSegment for a state based on the name and stateCode.
 * Must match the one that would have been provided by input data,
 * the validator in the generator script will check that.
 */
export const generateStateUrlSegment = (name: string, stateCode: string) => {
  let s = mungeName(name);
  // for states, replace spaces with underscores
  s = s.replace(/ /g, '_');
  return `${s}-${stateCode.toLowerCase()}`;
};

/**
 * Compute the urlSegment for a county based on the name.
 * Must match the one that would have been provided by input data,
 * the validator in the generator script will check that.
 */
export const generateCountyUrlSegment = (name: string) => {
  // this one is misspelled, so special case it
  if (name === 'Tinian Municipality') {
    return 'tianian_municipality';
  }

  let s = name;
  // for counties, split e.g. DeKalb into De_Kalb
  s = s.replace(/([a-z])([A-Z])/g, '$1_$2');
  // for counties, replace spaces with underscores
  s = s.replace(/ /g, '_');
  // for Counties, replace dashes with underscores
  s = s.replace(/[-]/g, '_');
  s = mungeName(s);
  return s;
};

/**
 * Compute the urlSegment for a metroArea based on the name and states.
 * Must match the one that would have been provided by input data,
 * the validator in the generator script will check that.
 */
export const generateMetroAreaUrlSegment = (
  name: string,
  statesFips: FipsCode[],
) => {
  // this one is missing 'city' so special case it:
  if (name === 'New York-Newark-Jersey City') {
    return 'new-york-city-newark-jersey-city_ny-nj-pa';
  }

  const states = statesFips
    .map(fips => statesByFips[fips].stateCode.toLowerCase())
    .join('-');
  let s = name;
  // for metroareas, replace apostrophes with dashes
  s = s.replace(/[']/g, '-');
  s = mungeName(s);
  // for MetroAreas, replace spaces with dashes
  s = s.replace(/ /g, '-');
  return `${s}_${states}`;
};

// JSON-serializable representation of a Region object
export interface RegionObject {
  n: string; // name
  f: FipsCode; // fips code
  p: number; // population
}

export abstract class Region {
  constructor(
    public readonly name: string,
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

export class USA extends Region {
  private constructor() {
    super('USA', '0', 331486822, RegionType.NATION);
  }
  static instance = new USA();

  fullName = 'United States of America';
  shortName = 'USA';
  abbreviation = 'USA';

  get relativeUrl(): string {
    return '';
  }

  contains(subregion: Region): boolean {
    throw new Error('Method not implemented.');
  }
  toJSON(): RegionObject {
    throw new Error('Method not implemented.');
  }
}

export class State extends Region {
  constructor(
    name: string,
    fipsCode: FipsCode,
    population: number,
    public readonly stateCode: string,
  ) {
    super(name, fipsCode, population, RegionType.STATE);
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

  get urlSegment() {
    return generateStateUrlSegment(this.name, this.stateCode);
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
      f: this.fipsCode,
      p: this.population,
      s: this.stateCode,
    };
  }

  public static fromJSON(obj: StateObject): State {
    return new State(obj.n, obj.f, obj.p, obj.s);
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
}

export class County extends Region {
  public readonly state: State;

  constructor(
    name: string,
    fipsCode: FipsCode,
    population: number,
    stateFips: FipsCode,
  ) {
    super(name, fipsCode, population, RegionType.COUNTY);
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

  get urlSegment() {
    return generateCountyUrlSegment(this.name);
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
      f: this.fipsCode,
      p: this.population,
      s: this.state.fipsCode,
    };
  }

  public static fromJSON(obj: CountyObject): County {
    return new County(obj.n, obj.f, obj.p, obj.s);
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
    super(name, fipsCode, population, RegionType.MSA);
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

  get urlSegment() {
    return generateMetroAreaUrlSegment(
      this.name,
      this.states.map(state => state.fipsCode),
    );
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
      f: this.fipsCode,
      p: this.population,
      s: this.states.map(state => state.fipsCode),
      c: this.countiesFips,
    };
  }

  public static fromJSON(obj: MetroAreaObject): MetroArea {
    return new MetroArea(obj.n, obj.f, obj.p, obj.s, obj.c);
  }
}
