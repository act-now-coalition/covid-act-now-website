import urlJoin from 'url-join';

import { findStateByFipsStrict } from './statesByFips';
import { RegionObject, State, Region, FipsCode, RegionType } from './types';

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
    stateFipsCode: FipsCode,
    public readonly adjacentCountiesFips: FipsCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.COUNTY);
    this.state = findStateByFipsStrict(stateFipsCode);
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
      t: this.regionType,
      s: this.state.fipsCode,
      a: this.adjacentCountiesFips,
    };
  }

  public static fromObject(obj: CountyObject) {
    return new County(obj.n, obj.u, obj.f, obj.p, obj.s, obj.a);
  }
}
