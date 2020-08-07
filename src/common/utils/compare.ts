import { getLocationNames, Location } from 'common/locations';
import { stateSummary, countySummary } from 'common/location_summaries';
import { fail } from 'common/utils';
import { LocationSummary } from 'common/location_summaries';

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}

const locations: any = getLocationNames();

export function getStatesArr() {
  return locations
    .filter((location: Location) => !location.county)
    .map((stateInfo: Location) => {
      if (stateInfo.state_code) {
        return {
          locationInfo: stateInfo,
          metricsInfo: stateSummary(stateInfo.state_code),
        };
      } else {
        fail('No state code');
      }
    });
}

export function getCountiesArr(stateId: string) {
  return locations
    .filter(
      (location: Location) =>
        location.county && location.state_code === stateId,
    )
    .map((countyInfo: Location) => {
      if (countyInfo.full_fips_code) {
        return {
          locationInfo: countyInfo,
          metricsInfo: countySummary(countyInfo.full_fips_code),
        };
      } else {
        fail('No county fips');
      }
    });
}
