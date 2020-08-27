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

function isCounty(location: Location) {
  return location.county;
}

function isState(location: Location) {
  return !location.county;
}

function isCountyOfState(location: Location, stateId: string) {
  return location.state_code === stateId;
}

function isMetroCounty(location: Location) {
  return location.full_fips_code && getCountyMsaCode(location.full_fips_code);
}

function isNonMetroCounty(location: Location) {
  return location.full_fips_code && !getCountyMsaCode(location.full_fips_code);
}

export function getAllStates(): SummaryForCompare[] {
  return locations.filter(isState).map(getLocationObj);
}

export function getAllCounties(): SummaryForCompare[] {
  return locations.filter(isCounty).map(getLocationObj);
}

export function getAllCountiesOfState(stateId: string): SummaryForCompare[] {
  return locations
    .filter(isCounty)
    .filter((location: Location) => isCountyOfState(location, stateId))
    .map(getLocationObj);
}

export function getAllMetroCounties(): SummaryForCompare[] {
  return locations
    .filter(isCounty)
    .filter((location: Location) => isMetroCounty(location))
    .map(getLocationObj);
}

export function getAllNonMetroCounties(): SummaryForCompare[] {
  return locations
    .filter(isCounty)
    .filter((location: Location) => isNonMetroCounty(location))
    .map(getLocationObj);
}

export function getStateMetroCounties(stateId: string): SummaryForCompare[] {
  return locations
    .filter(isCounty)
    .filter((location: Location) => isCountyOfState(location, stateId))
    .filter((location: Location) => isMetroCounty(location))
    .map(getLocationObj);
}

export function getStateNonMetroCounties(stateId: string): SummaryForCompare[] {
  return locations
    .filter(isCounty)
    .filter((location: Location) => isCountyOfState(location, stateId))
    .filter((location: Location) => isNonMetroCounty(location))
    .map(getLocationObj);
}

function getCountyObj(countyFips: string) {
  return locations
    .filter(isCounty)
    .filter((location: Location) => location.full_fips_code === countyFips)
    .map(getLocationObj);
}

function isNeighboringCounty(location: Location, countyFips: string) {
  const neighboringCountiesFips = getAdjacentCounties(countyFips);
  return (
    location.full_fips_code &&
    neighboringCountiesFips.includes(location.full_fips_code)
  );
}

export function getNeighboringCounties(
  countyFips: string,
): SummaryForCompare[] {
  const adjacentCounties = locations
    .filter((location: Location) => isNeighboringCounty(location, countyFips))
    .map(getLocationObj);
  const currentCounty = getCountyObj(countyFips);
  return [...adjacentCounties, ...currentCounty];
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

export enum GeoScopeFilter {
  NEARBY,
  STATE,
  COUNTRY,
}

export const metroPrefixCopy = {
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
    return `View top 100 ${metroPrefixCopy[countyTypeToView]} counties`;
  } else if (geoscope === GeoScopeFilter.NEARBY) {
    return 'View all nearby counties';
  } else {
    return `View all ${metroPrefixCopy[countyTypeToView]} counties in ${stateName}`;
  }
}

export function getHomePageViewMoreCopy(
  viewAllCounties: boolean,
  countyTypeToView: MetroFilter,
) {
  if (!viewAllCounties) return 'View all states';
  else return `View top 100 ${metroPrefixCopy[countyTypeToView]} counties`;
}

// For formatting and abbreviating location names:

export function getAbbreviatedCounty(county: string) {
  if (county.includes('Parish')) return county.replace('Parish', 'Par.');
  if (county.includes('Borough')) return county.replace('Borough', 'Bor.');
  if (county.includes('Census Area'))
    return county.replace('Census Area', 'C.A.');
  if (county.includes('Municipality'))
    return county.replace('Municipality', 'Mun.');
  if (county.includes('Municipio')) return county.replace('Municipio', 'Mun.');
  else return county.replace('County', 'Co.');
}

function splitCountyName(countyName: string) {
  const splitCounty = countyName.split(' ');
  const suffix = splitCounty.pop();
  const withoutSuffix = splitCounty;
  return [withoutSuffix.join(' '), suffix];
}

export function getColumnLocationName(location: Location) {
  if (!location.county) {
    return [location.state];
  } else {
    const countyWithAbbreviatedSuffix = getAbbreviatedCounty(location.county);
    return splitCountyName(countyWithAbbreviatedSuffix);
  }
}
