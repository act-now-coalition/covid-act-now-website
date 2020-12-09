import { sortBy, takeRight } from 'lodash';

import { Region, County, State, FipsCode } from 'common/regions';

class RegionDB {
  private regions: Region[];

  constructor(public states: State[], public counties: County[]) {
    this.regions = [...states, ...counties];
  }

  findByFipsCode(fipsCode: FipsCode): Region | null {
    const region = this.regions.find(region => region.fipsCode === fipsCode);
    return region || null;
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

export default RegionDB;
