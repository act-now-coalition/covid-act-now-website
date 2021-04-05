import { findStateByFipsStrict } from './statesByFips';
import { County } from './County';
import { RegionObject, State, Region, FipsCode, RegionType } from './types';

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
    public readonly countiesFipsCodes: FipsCode[],
    statesFipsCodes: FipsCode[],
  ) {
    super(name, urlSegment, fipsCode, population, RegionType.MSA);
    this.states = statesFipsCodes.map((fips: FipsCode) =>
      findStateByFipsStrict(fips),
    );
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
      this.countiesFipsCodes.includes(subregion.fipsCode)
    );
  }

  public toObject(): MetroAreaObject {
    return {
      n: this.name,
      u: this.urlSegment,
      f: this.fipsCode,
      p: this.population,
      t: this.regionType,
      c: this.countiesFipsCodes,
      s: this.states.map(state => state.fipsCode),
    };
  }

  public static fromObject(obj: MetroAreaObject) {
    return new MetroArea(obj.n, obj.u, obj.f, obj.p, obj.c, obj.s);
  }
}
