import sortBy from 'lodash/sortBy';
import takeRight from 'lodash/takeRight';
import values from 'lodash/values';
import type { Dictionary } from 'lodash';
import { Region, State, FipsCode } from './types';
import { County } from './County';
import { MetroArea } from './MetroArea';
import {
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
} from './preprocessed_regions_data';
import { statesByFips } from './statesByFips';
import {
  stateCodesToFips,
  stateUrlSegmentsToFips,
  countyUrlSegmentsToFips,
  metroAreaUrlSegmentsToFips,
} from './urlSegmentsToFips';

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
    private stateCodesToFips: Dictionary<string>,
    private stateUrlSegmentsToFips: Dictionary<string>,
    private countyUrlSegmentsToFips: Dictionary<string>,
    private metroAreaUrlSegmentsToFips: Dictionary<string>,
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

  findByStateCode(stateCode: string): State | null {
    const fips = this.stateCodesToFips[stateCode.toUpperCase()] ?? null;
    if (Boolean(fips)) {
      const state = this.findByFipsCode(fips);
      if (Boolean(state)) {
        return state as State;
      }
    }
    return null;
  }

  findByStateCodeStrict(stateCode: string): State {
    const region = this.findByStateCode(stateCode);
    assert(region, `Region unexpectedly not found for ${stateCode}`);
    return region;
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
  stateCodesToFips,
  stateUrlSegmentsToFips,
  countyUrlSegmentsToFips,
  metroAreaUrlSegmentsToFips,
);

export default regions;
export { RegionDB };
