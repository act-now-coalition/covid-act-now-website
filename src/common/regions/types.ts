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

// PODT Region object to aid serialization/deserialization w/ JSON
export interface RegionObject {
  name: string;
  urlSegment: string;
  fipsCode: FipsCode;
  population: number;
  regionType: RegionType;
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

  abstract toJSON(): string;
  abstract toObject(): RegionObject;
}

export interface StateObject extends RegionObject {
  stateCode: string;
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
      name: this.name,
      urlSegment: this.urlSegment,
      fipsCode: this.fipsCode,
      population: this.population,
      regionType: this.regionType,
      stateCode: this.stateCode,
    };
  }
  public toJSON() {
    return JSON.stringify(this.toObject());
  }
  public static fromJSON(serialized: string) {
    const obj = JSON.parse(serialized);
    return State.fromObject(obj);
  }

  public static fromObject(obj: StateObject) {
    return new State(
      obj.name,
      obj.urlSegment,
      obj.fipsCode,
      obj.population,
      obj.stateCode,
    );
  }
}

export interface CountyObject extends RegionObject {
  stateObject: StateObject;
  adjacentCountiesFips: FipsCode[];
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
      name: this.name,
      urlSegment: this.urlSegment,
      fipsCode: this.fipsCode,
      population: this.population,
      regionType: this.regionType,
      stateObject: this.state.toObject(),
      adjacentCountiesFips: this.adjacentCountiesFips,
    };
  }
  public toJSON() {
    return JSON.stringify(this.toObject());
  }
  public static fromJSON(serialized: string) {
    const obj = JSON.parse(serialized);
    return County.fromObject(obj);
  }
  public static fromObject(obj: CountyObject) {
    return new County(
      obj.name,
      obj.urlSegment,
      obj.fipsCode,
      obj.population,
      State.fromObject(obj.stateObject),
      obj.adjacentCountiesFips,
    );
  }
}

export interface MetroAreaObject extends RegionObject {
  countyObjects: CountyObject[];
  stateObjects: StateObject[];
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
  public toObject(): MetroAreaObject {
    return {
      name: this.name,
      urlSegment: this.urlSegment,
      fipsCode: this.fipsCode,
      population: this.population,
      regionType: this.regionType,
      countyObjects: this.counties.map(county => county.toObject()),
      stateObjects: this.states.map(state => state.toObject()),
    };
  }
  public toJSON() {
    return JSON.stringify(this.toObject());
  }
  public static fromObject(obj: MetroAreaObject) {
    return new MetroArea(
      obj.name,
      obj.urlSegment,
      obj.fipsCode,
      obj.population,
      obj.countyObjects.map((county: CountyObject) =>
        County.fromObject(county),
      ),
      obj.stateObjects.map((state: StateObject) => State.fromObject(state)),
    );
  }
  public static fromJSON(serialized: string) {
    const obj = JSON.parse(serialized);
    return MetroArea.fromObject(obj);
  }
  contains(subregion: Region): boolean {
    return subregion instanceof County && this.counties.includes(subregion);
  }
}
