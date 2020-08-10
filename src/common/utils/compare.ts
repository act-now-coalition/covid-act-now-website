import { getLocationNames, Location } from 'common/locations';
import { stateSummary, countySummary } from 'common/location_summaries';
import { LocationSummary } from 'common/location_summaries';

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}

const locations: any = getLocationNames();

export function getStatesArr(): SummaryForCompare[] {
  return locations
    .filter((location: Location) => !location.county)
    .map((stateInfo: Location) => {
      return {
        locationInfo: stateInfo,
        metricsInfo: stateSummary(stateInfo.state_code),
      };
    });
}

export function getCountiesArr(stateId: string): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county && location.state_code === stateId,
    )
    .map((countyInfo: Location) => {
      return {
        locationInfo: countyInfo,
        metricsInfo:
          countyInfo.full_fips_code && countySummary(countyInfo.full_fips_code),
      };
    });
}
