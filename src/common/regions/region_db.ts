import { sortBy, takeRight } from 'lodash';
import { Region, County, State, FipsCode } from './types';
import { states, statesByFips, counties, countiesByFips } from './regions_data';

interface RegionByFips {
  [fipsCode: string]: Region;
}

class RegionDB {
  private regions: Region[];
  private regionsByFips: RegionByFips;

  constructor(
    public states: State[],
    public counties: County[],
    private statesByFips: RegionByFips,
    private countiesByFips: RegionByFips,
  ) {
    this.regions = [...states, ...counties];
    this.states = states;
    this.counties = counties;
    this.regionsByFips = { ...statesByFips, ...countiesByFips };
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
    return this.regions;
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

const regions = new RegionDB(states, counties, statesByFips, countiesByFips);

export default regions;
export { RegionDB };
