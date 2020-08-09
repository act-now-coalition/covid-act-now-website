import { getLocationNames, Location } from 'common/locations';
import { stateSummary, countySummary } from 'common/location_summaries';
import { LocationSummary } from 'common/location_summaries';
import { Metric } from 'common/metric';
import { Level } from 'common/level';

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}
export interface RankedLocationSummary extends SummaryForCompare {
  rank: number;
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

export function getDisclaimerCopy(
  countiesArr: SummaryForCompare[],
  stateName?: string,
) {
  const contactTracingData = countiesArr.filter(
    (location: any) =>
      location.metricsInfo.metrics[Metric.CONTACT_TRACING].level !==
      Level.UNKNOWN,
  );
  const positiveTestData = countiesArr.filter(
    (location: any) =>
      location.metricsInfo.metrics[Metric.POSITIVE_TESTS].level !==
      Level.UNKNOWN,
  );
  if (contactTracingData.length && positiveTestData.length) {
    return 'Most states only report contact tracing at the state level.';
  } else {
    const disclaimer = `${stateName} only reports ${
      !positiveTestData.length ? 'positive tests ' : ''
    } ${!positiveTestData.length && !contactTracingData.length ? 'and ' : ''} ${
      !contactTracingData.length ? 'contact tracing ' : ''
    } at the state level.`;
    return disclaimer;
  }
}
