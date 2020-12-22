/** Helpers for compare, getting location arrays for each filter/pagetype **/
import { getCountyMsaCode, getColleges } from 'common/locations';
import { LocationSummary, getSummaryFromFips } from 'common/location_summaries';
import { Metric, getMetricNameForCompare } from 'common/metric';
import { isNumber } from 'lodash';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import regions, {
  County,
  Region,
  State,
  MetroArea,
  getStateName,
  getStateCode,
} from 'common/regions';
import { fail } from 'assert';

export function trackCompareEvent(
  action: EventAction,
  label: string,
  value?: number,
) {
  trackEvent(EventCategory.COMPARE, action, label, value);
}

export interface SummaryForCompare {
  region: Region;
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

function getLocationObj(region: Region): SummaryForCompare {
  return {
    region: region,
    metricsInfo: getSummaryFromFips(region.fipsCode)!,
  };
}

function isMetroCounty(region: Region) {
  return getCountyMsaCode(region.fipsCode);
}

function isNonMetroCounty(region: Region) {
  return !isMetroCounty(region);
}

export function getAllStates(): SummaryForCompare[] {
  return regions.states.map(getLocationObj);
}

export function getAllCounties(): SummaryForCompare[] {
  return regions.counties.map(getLocationObj);
}

export function getAllMetroAreas(): SummaryForCompare[] {
  return regions.metroAreas.map(getLocationObj);
}

export function getAllCountiesOfMetroArea(
  region: MetroArea,
): SummaryForCompare[] {
  return region.counties.map(getLocationObj);
}

export function getAllCountiesOfState(stateCode: string): SummaryForCompare[] {
  return regions.counties
    .filter((region: County) => region.state.stateCode === stateCode)
    .map(getLocationObj);
}

export function getAllMetroCounties(): SummaryForCompare[] {
  return regions.counties.filter(isMetroCounty).map(getLocationObj);
}

export function getAllNonMetroCounties(): SummaryForCompare[] {
  return regions.counties.filter(isNonMetroCounty).map(getLocationObj);
}

export function getStateMetroCounties(stateCode: string): SummaryForCompare[] {
  return regions.counties
    .filter((region: County) => region.state.stateCode === stateCode)
    .filter(isMetroCounty)
    .map(getLocationObj);
}

export function getStateNonMetroCounties(
  stateCode: string,
): SummaryForCompare[] {
  return regions.counties
    .filter((region: County) => region.state.stateCode === stateCode)
    .filter(isNonMetroCounty)
    .map(getLocationObj);
}

export function getNeighboringCounties(
  countyFips: string,
): SummaryForCompare[] {
  const county = regions.findByFipsCodeStrict(countyFips) as County;
  const adjacentCounties = county.adjacentCountyFips.map(fips => {
    const region = regions.findByFipsCodeStrict(fips);
    return getLocationObj(region);
  });

  return [...adjacentCounties, ...[getLocationObj(county)]];
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
  stateCode: string,
  countyTypeToView: MetroFilter,
) {
  switch (countyTypeToView) {
    case MetroFilter.ALL:
      return getAllCountiesOfState(stateCode);
    case MetroFilter.METRO:
      return getStateMetroCounties(stateCode);
    case MetroFilter.NON_METRO:
      return getStateNonMetroCounties(stateCode);
    default:
      return getAllCountiesOfState(stateCode);
  }
}

export enum GeoScopeFilter {
  NEARBY,
  STATE,
  COUNTRY,
}

export function getMetroPrefixCopy(filter: MetroFilter, useAll?: boolean) {
  if (filter === MetroFilter.METRO) {
    return 'metro';
  } else if (filter === MetroFilter.NON_METRO) {
    return 'non-metro';
  } else if (useAll) {
    return 'all';
  }
  return '';
}

export function getLocationPageViewMoreCopy(
  geoscope: GeoScopeFilter,
  countyTypeToView: MetroFilter,
  region: Region,
) {
  if (region instanceof MetroArea) {
    return `View all counties in ${region.shortName}`;
  } else if (geoscope === GeoScopeFilter.COUNTRY) {
    return `View top 100 ${getMetroPrefixCopy(countyTypeToView)} counties`;
  } else if (geoscope === GeoScopeFilter.NEARBY) {
    return 'View all nearby counties';
  } else {
    return `View all ${getMetroPrefixCopy(
      countyTypeToView,
    )} counties in ${getStateName(region)}`;
  }
}

export enum HomepageLocationScope {
  COUNTY,
  MSA,
  STATE,
}

interface LabelItem {
  singular: string;
  plural: string;
}

export const homepageLabelMap: { [key in HomepageLocationScope]: LabelItem } = {
  [HomepageLocationScope.MSA]: {
    singular: 'Metro area',
    plural: 'Metro areas',
  },
  [HomepageLocationScope.COUNTY]: {
    singular: 'County',
    plural: 'Counties',
  },
  [HomepageLocationScope.STATE]: {
    singular: 'State',
    plural: 'States',
  },
};

export function getHomePageViewMoreCopy(
  homepageScope: HomepageLocationScope,
  countyTypeToView: MetroFilter,
) {
  if (homepageScope === HomepageLocationScope.STATE) {
    return 'View all states';
  } else if (homepageScope === HomepageLocationScope.MSA) {
    return 'View top 100 metro areas';
  } else if (homepageScope === HomepageLocationScope.COUNTY) {
    return `View top 100 ${getMetroPrefixCopy(countyTypeToView)} counties`;
  } else {
    return `View more`;
  }
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

export function getColumnLocationName(region: Region) {
  if (region instanceof State) {
    return [region.fullName];
  } else if (region instanceof County) {
    const countyWithAbbreviatedSuffix = region.abbreviation;
    return splitCountyName(countyWithAbbreviatedSuffix);
  } else if (region instanceof MetroArea) {
    return [region.shortName];
  } else {
    fail('dont support other regions');
  }
}

// For college tag:

function getSummedEnrollment(region: Region) {
  return (
    getColleges(region.fipsCode).length > 0 &&
    getColleges(region.fipsCode).reduce(
      (acc, current) => acc + current.ft_enroll,
      0,
    )
  );
}

export function isCollegeCounty(region: Region) {
  const threshold = 0.05;
  const ftEnrollment = getSummedEnrollment(region);
  const countyPopulation = region.population;
  return ftEnrollment && ftEnrollment / countyPopulation > threshold;
}

export function getShareQuote(
  sorter: Metric,
  countyTypeToView: MetroFilter,
  sliderValue: GeoScopeFilter,
  totalLocations: number,
  sortDescending: boolean,
  homepageScope: HomepageLocationScope,
  currentLocation?: RankedLocationSummary,
  sortByPopulation?: boolean,
  stateName?: string,
  region?: Region,
): string {
  const geoScopeShareCopy: any = {
    [GeoScopeFilter.NEARBY]: 'nearby',
    [GeoScopeFilter.STATE]: stateName,
    [GeoScopeFilter.COUNTRY]: 'USA',
  };

  const homepageShareCopy = `Compare all USA ${
    homepageScope === HomepageLocationScope.COUNTY
      ? `${getMetroPrefixCopy(countyTypeToView)} counties`
      : `${homepageLabelMap[homepageScope].plural.toLowerCase()}`
  } by their local COVID metrics with @CovidActNow.`;

  const stateShareCopy = `Compare COVID metrics between ${getMetroPrefixCopy(
    countyTypeToView,
    true,
  )} counties in ${stateName} with @CovidActNow.`;

  const hasValidRank =
    currentLocation &&
    currentLocation.rank !== 0 &&
    isNumber(currentLocation.metricsInfo.metrics[sorter]?.value);

  const ascendingCopy =
    sorter && sorter === (Metric.HOSPITAL_USAGE || Metric.CONTACT_TRACING)
      ? 'least'
      : 'lowest';
  const descendingCopy =
    sorter && sorter === (Metric.HOSPITAL_USAGE || Metric.CONTACT_TRACING)
      ? 'most'
      : 'highest';

  const countyShareCopy =
    currentLocation &&
    hasValidRank &&
    `${currentLocation.region.name} ranks #${
      currentLocation.rank
    } out of ${totalLocations} total ${geoScopeShareCopy[sliderValue]}${
      countyTypeToView === MetroFilter.ALL ? '' : ' '
    }${getMetroPrefixCopy(countyTypeToView)} counties when sorted by ${
      sortDescending ? descendingCopy : ascendingCopy
    } ${
      sortByPopulation
        ? 'population'
        : sorter === Metric.HOSPITAL_USAGE
        ? getMetricNameForCompare(sorter)
        : getMetricNameForCompare(sorter).toLowerCase()
    }, according to @CovidActNow. See how your county compares.`;

  if (!region) {
    return homepageShareCopy;
  } else {
    if (region instanceof MetroArea) {
      return `Compare COVID metrics between counties in ${region.name} with @CovidActNow.`;
    } else if (!currentLocation && stateName) {
      return stateShareCopy;
    } else if (currentLocation) {
      return countyShareCopy || stateShareCopy;
    } else {
      return stateShareCopy;
    }
  }
}

// Determines which location field is shown under the main Compare feature header + formats it
export const getCompareSubheader = (region: Region): string => {
  if (region instanceof County) {
    return `${getAbbreviatedCounty(region.name)}, ${getStateCode(
      region,
    )} to other counties`;
  } else if (region instanceof MetroArea || region instanceof State) {
    return `Counties in ${region.fullName}`;
  } else {
    return 'Compare counties';
  }
};
