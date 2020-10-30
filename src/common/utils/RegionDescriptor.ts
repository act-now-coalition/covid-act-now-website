import { assertStateId, assertCountyId } from 'common/utils';

export enum RegionAggregateDescriptor {
  // NOTE: These strings must match the API endpoints.
  COUNTIES = 'counties',
  STATES = 'states',
  CBSAS = 'cbsas',
}

/**
 * Represents a region (e.g. US State or County).
 */
export abstract class RegionDescriptor {
  static forState(stateId: string): RegionDescriptor {
    return new StateRegionDescriptor(stateId.toUpperCase());
  }

  static forCounty(countyFipsId: string): RegionDescriptor {
    return new CountyRegionDescriptor(countyFipsId);
  }
  static forCbsa(locationId: string): RegionDescriptor {
    return new CBSARegionDescriptor(locationId);
  }

  isState(): this is StateRegionDescriptor {
    return this instanceof StateRegionDescriptor;
  }

  isCounty(): this is CountyRegionDescriptor {
    return this instanceof CountyRegionDescriptor;
  }

  isCbsa(): this is CBSARegionDescriptor {
    return this instanceof CBSARegionDescriptor;
  }

  abstract toString(): string;
}

export class StateRegionDescriptor extends RegionDescriptor {
  constructor(
    /** The 2-letter uppercase abbreviation of the state/territory. */
    readonly stateId: string,
  ) {
    super();
    assertStateId(stateId);
  }

  toString(): string {
    return this.stateId;
  }
}

export class CountyRegionDescriptor extends RegionDescriptor {
  constructor(
    /** The 5-digit FIPS ID of the county. */
    readonly countyFipsId: string,
  ) {
    super();
    assertCountyId(countyFipsId);
  }

  toString(): string {
    return this.countyFipsId;
  }
}

export class CBSARegionDescriptor extends RegionDescriptor {
  constructor(readonly locationId: string) {
    super();
  }

  toString(): string {
    const match = /iso1:us#cbsa:(\d+)/.exec(this.locationId);
    return (match && match[1]!) ?? '';
  }
}
