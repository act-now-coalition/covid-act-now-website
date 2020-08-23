/** Helpers for compare, getting location arrays for each filter/pagetype **/
import {
  getLocationNames,
  Location,
  getAdjacentCounties,
  getCountyMsaCode,
} from 'common/locations';
import { stateSummary, countySummary } from 'common/location_summaries';
import { LocationSummary } from 'common/location_summaries';
import { Metric } from 'common/metric';

export interface SummaryForCompare {
  locationInfo: Location;
  metricsInfo: LocationSummary;
}
export interface RankedLocationSummary extends SummaryForCompare {
  rank: number;
}

export const orderedMetrics = [
  Metric.CASE_DENSITY,
  Metric.CASE_GROWTH_RATE,
  Metric.POSITIVE_TESTS,
  Metric.HOSPITAL_USAGE,
  Metric.CONTACT_TRACING,
];

const locations: any = getLocationNames();

function getLocationObj(locationInfo: Location) {
  if (locationInfo.full_fips_code) {
    return {
      locationInfo: locationInfo,
      metricsInfo:
        locationInfo.full_fips_code &&
        countySummary(locationInfo.full_fips_code),
    };
  } else {
    return {
      locationInfo: locationInfo,
      metricsInfo: stateSummary(locationInfo.state_code),
    };
  }
}

export function getAllStates(): SummaryForCompare[] {
  return locations
    .filter((location: Location) => !location.county)
    .map(getLocationObj);
}

export function getAllCounties(): SummaryForCompare[] {
  return locations
    .filter((location: Location) => location.county)
    .map(getLocationObj);
}

export function getAllCountiesOfState(stateId: string): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county && location.state_code === stateId,
    )
    .map(getLocationObj);
}

// TODO (chelsi) filter-related WIP:
// consolidate location and national MSA utils?
export function getAllMetroCounties(): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county &&
        location.full_fips_code &&
        getCountyMsaCode(location.full_fips_code),
    )
    .map(getLocationObj);
}

export function getAllNonMetroCounties(): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county &&
        location.full_fips_code &&
        !getCountyMsaCode(location.full_fips_code),
    )
    .map(getLocationObj);
}

export function getNeighboringCounties(
  countyFips: string,
): SummaryForCompare[] {
  const neighboringCountiesFips = getAdjacentCounties(countyFips);
  return locations
    .filter(
      (location: Location) =>
        location.full_fips_code &&
        location.full_fips_code !== countyFips &&
        neighboringCountiesFips.includes(location.full_fips_code),
    )
    .map(getLocationObj);
}

export function getStateMetroCounties(stateId: string): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county &&
        location.full_fips_code &&
        location.state_code === stateId &&
        getCountyMsaCode(location.full_fips_code),
    )
    .map(getLocationObj);
}

export function getStateNonMetroCounties(stateId: string): SummaryForCompare[] {
  return locations
    .filter(
      (location: Location) =>
        location.county &&
        location.full_fips_code &&
        location.state_code === stateId &&
        !getCountyMsaCode(location.full_fips_code),
    )
    .map(getLocationObj);
}

export enum MetroFilter {
  ALL,
  METRO,
  NON_METRO,
}

export const FILTER_LABEL = {
  [MetroFilter.ALL]: 'Metro & Non-metro',
  [MetroFilter.METRO]: 'Metro only',
  [MetroFilter.NON_METRO]: 'Non-metro only',
};

export function getFilterLabel(filter: MetroFilter) {
  return FILTER_LABEL[filter];
}

// For homepage:
export function getAllCountiesSelection(countyTypeToView: MetroFilter) {
  switch (countyTypeToView) {
    case MetroFilter.ALL:
      return getAllCounties();
    case MetroFilter.METRO:
      return getAllMetroCounties();
    case MetroFilter.NON_METRO:
      return getAllNonMetroCounties();
    default:
      return getAllCounties();
  }
}

export enum GeoScopeFilter {
  NEARBY,
  STATE,
  COUNTRY,
}

export function getLocationPageCountiesSelection(
  countyTypeToView: MetroFilter,
  stateId: string,
) {
  switch (countyTypeToView) {
    case MetroFilter.ALL:
      return getAllCountiesOfState(stateId);
    case MetroFilter.METRO:
      return getStateMetroCounties(stateId);
    case MetroFilter.NON_METRO:
      return getStateNonMetroCounties(stateId);
    default:
      return getAllCountiesOfState(stateId);
  }
}

export function getColumnLocationName(location: Location) {
  if (!location.county) return location.state;
  else return getAbbreviatedCounty(location.county);
}

export function getAbbreviatedCounty(county: string) {
  if (county.includes('Parish')) return county.replace('Parish', 'Par.');
  else return county.replace('County', 'Co.');
}

const metroFooterCopy = {
  [MetroFilter.ALL]: '',
  [MetroFilter.METRO]: 'metro',
  [MetroFilter.NON_METRO]: 'non-metro',
};

export function getLocationPageViewMoreCopy(
  geoscope: GeoScopeFilter,
  countyTypeToView: MetroFilter,
  stateName: string,
) {
  if (geoscope === GeoScopeFilter.COUNTRY) {
    return `View top 50 ${metroFooterCopy[countyTypeToView]} counties`;
  } else if (geoscope === GeoScopeFilter.NEARBY) {
    return 'View all nearby counties';
  } else {
    return `View all ${metroFooterCopy[countyTypeToView]} counties in ${stateName}`;
  }
}

export function getHomePageViewMoreCopy(
  viewAllCounties: boolean,
  countyTypeToView: MetroFilter,
) {
  if (!viewAllCounties) return 'View all states';
  else return `View top 50 ${metroFooterCopy[countyTypeToView]} counties`;
}
