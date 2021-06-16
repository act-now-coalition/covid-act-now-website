/** Helpers for compare, getting location arrays for each filter/pagetype **/
import isNumber from 'lodash/isNumber';
import { LocationSummary, getSummaryFromFips } from 'common/location_summaries';
import { getMetricNameForCompare } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import regions, {
  County,
  Region,
  State,
  MetroArea,
  getStateName,
} from 'common/regions';
import { fail } from 'assert';
import { importCountyAdjacency } from 'common/data';

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

function getLocationObj(region: Region): SummaryForCompare {
  return {
    region: region,
    metricsInfo: getSummaryFromFips(region.fipsCode)!,
  };
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
  return region.countiesFips
    .map(fips => regions.findByFipsCodeStrict(fips))
    .map(getLocationObj);
}

export function getAllCountiesOfState(stateCode: string): SummaryForCompare[] {
  return regions.counties
    .filter((region: County) => region.state.stateCode === stateCode)
    .map(getLocationObj);
}

export async function getNeighboringCounties(
  countyFips: string,
): Promise<SummaryForCompare[]> {
  const county = regions.findByFipsCodeStrict(countyFips) as County;
  const countyAdjacency = await importCountyAdjacency();
  const adjacentCounties = countyAdjacency.counties[
    countyFips
  ].adjacent_counties.map(fips => {
    const region = regions.findByFipsCodeStrict(fips);
    return getLocationObj(region);
  });

  return [...adjacentCounties, ...[getLocationObj(county)]];
}

export enum GeoScopeFilter {
  NEARBY,
  STATE,
  COUNTRY,
}

export function getLocationPageViewMoreCopy(
  geoscope: GeoScopeFilter,
  region: Region,
) {
  if (region instanceof MetroArea) {
    return `View all counties in ${region.shortName}`;
  } else if (geoscope === GeoScopeFilter.COUNTRY) {
    return `View top 100 counties`;
  } else if (geoscope === GeoScopeFilter.NEARBY) {
    return 'View all nearby counties';
  } else {
    return `View all counties in ${getStateName(region)}`;
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

export function getHomePageViewMoreCopy(homepageScope: HomepageLocationScope) {
  if (homepageScope === HomepageLocationScope.STATE) {
    return 'View all states';
  } else if (homepageScope === HomepageLocationScope.MSA) {
    return 'View top 100 metro areas';
  } else if (homepageScope === HomepageLocationScope.COUNTY) {
    return `View top 100 counties`;
  } else {
    return `View more`;
  }
}

/*
Used to split region names for county and metro in order to set multiple font weights.
Outputs arr with split name:
  metro ex: ['Boston', 'metro,']
  county ex: ['Fairfield', 'Co.']

(Final format once eventually styled: bold locationName, non-bold suffix):
  ex: [bold] Boston [non-bold] metro
  ex: [bold] Fairfield [non-bold] Co.
*/
function splitRegionName(regionName: string) {
  const splitRegion = regionName.split(' ');
  const suffixUnformatted = splitRegion.pop();
  const regionSuffix = suffixUnformatted?.includes('metro')
    ? `${suffixUnformatted},`
    : suffixUnformatted;
  const regionNameMain = splitRegion.join(' ');
  return [regionNameMain, regionSuffix];
}

export function getRegionNameForRow(region: Region, condensed?: boolean) {
  if (region instanceof State) {
    return [region.fullName];
  } else if (region instanceof County) {
    return condensed
      ? splitRegionName(region.abbreviation)
      : splitRegionName(`${region.name},`);
  } else if (region instanceof MetroArea) {
    return splitRegionName(region.shortName);
  } else {
    fail('dont support other regions');
  }
}

export function getShareQuote(
  sorter: Metric,
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
      ? 'counties'
      : `${homepageLabelMap[homepageScope].plural.toLowerCase()}`
  } by their local COVID metrics with @CovidActNow.`;

  const stateShareCopy = `Compare COVID metrics between counties in ${stateName} with @CovidActNow.`;

  const hasValidRank =
    currentLocation &&
    currentLocation.rank !== 0 &&
    isNumber(currentLocation.metricsInfo.metrics[sorter]?.value);

  const ascendingCopy = [Metric.HOSPITAL_USAGE, Metric.VACCINATIONS].includes(
    sorter,
  )
    ? 'least'
    : 'lowest';
  const descendingCopy = [Metric.HOSPITAL_USAGE, Metric.VACCINATIONS].includes(
    sorter,
  )
    ? 'most'
    : 'highest';

  const countyShareCopy =
    currentLocation &&
    hasValidRank &&
    `${currentLocation.region.shortName} ranks #${
      currentLocation.rank
    } out of ${totalLocations} total ${
      geoScopeShareCopy[sliderValue]
    } counties when sorted by ${
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

// Value maps for filters' slider components (0, 50, and 99 are numerical values required by MUI Slider).
// Maps each numerical slider value to its corresponding scope:

// For location page:
export const sliderNumberToFilterMap: { [val: number]: GeoScopeFilter } = {
  0: GeoScopeFilter.NEARBY,
  50: GeoScopeFilter.STATE,
  99: GeoScopeFilter.COUNTRY,
};

export function locationPageLabelToFilterMap(val: string): GeoScopeFilter {
  switch (val) {
    case 'Nearby':
      return GeoScopeFilter.NEARBY;
    case 'USA':
      return GeoScopeFilter.COUNTRY;
    default:
      return GeoScopeFilter.STATE;
  }
}

export function locationPageScopeToValueMap(
  locationLevel: GeoScopeFilter,
  stateId: string | undefined,
): string {
  switch (locationLevel) {
    case GeoScopeFilter.NEARBY:
      return 'Nearby';
    case GeoScopeFilter.COUNTRY:
      return 'USA';
    default:
      return stateId ? stateId : '';
  }
}

export const scopeValueMap = {
  [GeoScopeFilter.NEARBY]: 0,
  [GeoScopeFilter.STATE]: 50,
  [GeoScopeFilter.COUNTRY]: 99,
};

// For homepage:
export const homepageSliderNumberToFilterMap: {
  [val: number]: HomepageLocationScope;
} = {
  0: HomepageLocationScope.COUNTY,
  50: HomepageLocationScope.MSA,
  99: HomepageLocationScope.STATE,
};

export const homepageLabelToFilterMap: {
  [val: string]: HomepageLocationScope;
} = {
  Counties: HomepageLocationScope.COUNTY,
  'Metro areas': HomepageLocationScope.MSA,
  States: HomepageLocationScope.STATE,
};

export const homepageScopeToValueMap = {
  [HomepageLocationScope.COUNTY]: 'Counties',
  [HomepageLocationScope.MSA]: 'Metro areas',
  [HomepageLocationScope.STATE]: 'States',
};

export const homepageScopeValueMap = {
  [HomepageLocationScope.COUNTY]: 0,
  [HomepageLocationScope.MSA]: 50,
  [HomepageLocationScope.STATE]: 99,
};
