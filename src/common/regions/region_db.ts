import { sortBy, takeRight, values, Dictionary } from 'lodash';
import { Region, County, State, MetroArea, FipsCode } from './types';
import {
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
} from './regions_data';
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
    private statesByFips: Dictionary<State>,
    private countiesByFips: Dictionary<County>,
    private metroAreasByFips: Dictionary<MetroArea>,
    private customAreasByFips: Dictionary<State>,
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

  findCountiesByStateCode(stateCode: string): County[] {
    return this.counties.filter(county => county.stateCode === stateCode);
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
  customAreasByFips,
);

export default regions;
export { RegionDB };
