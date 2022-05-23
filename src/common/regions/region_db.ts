import sortBy from 'lodash/sortBy';
import takeRight from 'lodash/takeRight';
import values from 'lodash/values';
import type { Dictionary } from 'lodash';
import { Region, County, State, MetroArea, FipsCode, USA } from './types';
import {
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  statesByStateCode,
} from './preprocessed_regions_data';
import { assert } from '@actnowcoalition/assert';

export class RegionDB {
  public states: State[];
  public counties: County[];
  public metroAreas: MetroArea[];
  public usa: USA;
  private regionsByFips: Dictionary<Region>;

  constructor(
    statesByFips: Dictionary<State>,
    countiesByFips: Dictionary<County>,
    metroAreasByFips: Dictionary<MetroArea>,
    private statesByStateCode: Dictionary<State>,
  ) {
    this.usa = USA.instance;
    this.states = sortBy(values(statesByFips), state => state.name);
    this.counties = sortBy(values(countiesByFips), county => county.name);
    this.metroAreas = sortBy(values(metroAreasByFips), metro => metro.name);

    this.regionsByFips = {
      [USA.instance.fipsCode]: USA.instance,
      ...statesByFips,
      ...countiesByFips,
      ...metroAreasByFips,
    };
  }

  findByFipsCode(fipsCode: FipsCode): Region | null {
    return this.regionsByFips[fipsCode] || null;
  }

  findByFipsCodeStrict(fipsCode: FipsCode): Region {
    const region = this.regionsByFips[fipsCode];
    assert(region, `Region unexpectedly not found for ${fipsCode}`);
    return region;
  }

  findByStateCode(stateCode: string): State | null {
    return this.statesByStateCode[stateCode.toUpperCase()] ?? null;
  }

  findByStateCodeStrict(stateCode: string): State {
    const region = this.statesByStateCode[stateCode.toUpperCase()];
    assert(region, `Region unexpectedly not found for ${stateCode}`);
    return region;
  }

  findByFullName(fullName: string): Region | null {
    return this.all().find(region => region.fullName === fullName) || null;
  }

  findCountiesByStateCode(stateCode: string): County[] {
    return this.counties.filter(county => county.stateCode === stateCode);
  }

  /** Find counties and metros that are in / overlap given state code. */
  findCountiesAndMetrosByStateCode(stateCode: string): Region[] {
    const counties = this.counties.filter(
      county => county.stateCode === stateCode,
    );
    const metros = this.metroAreas.filter(metro =>
      metro.states.map(state => state.stateCode).includes(stateCode),
    );
    return [...counties, ...metros];
  }

  findStateByUrlParams(stateUrlSegment: string): State | null {
    // The second condition is added to support legacy URLs with the 2-letter
    // state code (`/us/wa`)
    const foundState = this.states.find(
      state =>
        equalLower(state.urlSegment, stateUrlSegment) ||
        equalLower(state.stateCode, stateUrlSegment),
    );
    return foundState || null;
  }

  findMetroAreaByUrlParams(metroAreaUrlSegment: string) {
    const foundMetro = this.metroAreas.find(
      metro => metro.urlSegment === metroAreaUrlSegment,
    );
    return foundMetro || null;
  }

  findCountyByUrlParams(
    stateUrlSegment: string,
    countyUrlSegment: string,
  ): County | null {
    const foundState = this.findStateByUrlParams(stateUrlSegment);
    if (!foundState) {
      return null;
    }

    const foundCounty = this.counties.find(
      county =>
        county.state.fipsCode === foundState.fipsCode &&
        equalLower(county.urlSegment, countyUrlSegment),
    );

    return foundCounty || null;
  }

  all(): Region[] {
    return [...this.states, ...this.counties, ...this.metroAreas];
  }

  topCountiesByPopulation(limit: number): County[] {
    return takeRight(
      sortBy(this.counties, c => c.population),
      limit,
    );
  }

  topMetrosByPopulation(limit: number): MetroArea[] {
    return takeRight(
      sortBy(this.metroAreas, c => c.population),
      limit,
    );
  }
}

function equalLower(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

const regions = new RegionDB(
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  statesByStateCode,
);

/**
 * Async helper for decoupling regions DB incrementally
 */
export const getRegionsDB = async () => {
  return regions;
};

export default regions;
