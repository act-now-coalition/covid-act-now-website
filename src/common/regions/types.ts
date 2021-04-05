import urlJoin from 'url-join';

export type FipsCode = string;
export type ZipCode = string;

export enum RegionType {
  COUNTY = 'county',
  STATE = 'state',
  MSA = 'MSA',
}

// PODT Region object to aid serialization/deserialization w/ JSON
export interface RegionObject {
  n: string;
  u: string;
  f: FipsCode;
  p: number;
  t: RegionType;
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
      (subregion.regionType === RegionType.MSA &&
        (subregion as any).states.includes(this)) ||
      (subregion.regionType === RegionType.COUNTY &&
        (subregion as any).state === this)
    );
  }

  public toObject(): StateObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      t: this.regionType,
      s: this.stateCode,
    };
  }

  public static fromObject(obj: StateObject) {
    return new State(obj.n, obj.u, obj.f, obj.p, obj.s);
  }
}
