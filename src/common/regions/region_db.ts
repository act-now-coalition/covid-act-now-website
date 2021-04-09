import sortBy from 'lodash/sortBy';
import takeRight from 'lodash/takeRight';
import values from 'lodash/values';
import type { Dictionary } from 'lodash';
import { Region, County, State, MetroArea, FipsCode } from './types';
import {
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
} from './preprocessed_regions_data';
import { assert } from 'common/utils';

class RegionDB {
  public states: State[];
  public counties: County[];
  public metroAreas: MetroArea[];
  // Custom areas are additional locations that are manually created.
  // It is created in the service of USA + NAMC aggregations and should
  // be used sparingly.
  public customAreas: State[];
  private regionsByFips: Dictionary<Region>;

  constructor(
    statesByFips: Dictionary<State>,
    countiesByFips: Dictionary<County>,
    metroAreasByFips: Dictionary<MetroArea>,
    customAreasByFips: Dictionary<State>,
  ) {
    this.states = sortBy(values(statesByFips), state => state.name);
    this.counties = sortBy(values(countiesByFips), county => county.name);
    this.metroAreas = sortBy(values(metroAreasByFips), metro => metro.name);
    this.customAreas = values(customAreasByFips);

    this.regionsByFips = {
      ...statesByFips,
      ...countiesByFips,
      ...metroAreasByFips,
      ...customAreasByFips,
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

const regions = new RegionDB(
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
);

export default regions;
export { RegionDB };
