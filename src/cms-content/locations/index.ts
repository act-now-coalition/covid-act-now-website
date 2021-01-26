import { RegionType } from 'common/regions';

export interface CMSLocation {
  locationName: string;
  locationType: RegionType;
  fips: string;
  stateCode: string;
}
