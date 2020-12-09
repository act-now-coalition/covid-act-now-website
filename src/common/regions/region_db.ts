import { sortBy, takeRight, values, Dictionary } from 'lodash';
import { Region, County, State, MetroArea, FipsCode } from './types';
import { statesByFips, countiesByFips, metroAreasByFips } from './regions_data';

class RegionDB {
  public states: State[];
  public counties: County[];
  public metroAreas: MetroArea[];
  private regionsByFips: Dictionary<Region>;

  constructor(
    private statesByFips: Dictionary<State>,
    private countiesByFips: Dictionary<County>,
    private metroAreasByFips: Dictionary<MetroArea>,
  ) {
    this.states = values(statesByFips);
    this.counties = values(countiesByFips);
    this.metroAreas = values(metroAreasByFips);
    this.regionsByFips = {
      ...statesByFips,
      ...countiesByFips,
      ...metroAreasByFips,
    };
  }

  findByFipsCode(fipsCode: FipsCode): Region | null {
    return this.regionsByFips[fipsCode] || null;
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
    return [...this.states, ...this.counties];
  }

  topCountiesByPopulation(limit: number): County[] {
    return takeRight(
      sortBy(this.counties, c => c.population),
      limit,
    );
  }
}

function equalLower(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

const regions = new RegionDB(statesByFips, countiesByFips, metroAreasByFips);

export default regions;
export { RegionDB };
