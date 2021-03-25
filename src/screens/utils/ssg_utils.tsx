/**
 * common stuff to make the many places we render locationPage based on route
 * simpler
 */
import React from 'react';
import moment from 'moment';

import { Api } from 'api';
import { COLOR_MAP } from 'common/colors';
import { importFipsToCcviMap, RegionCcviItem } from 'common/data';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { getPageTitle, getPageDescription } from 'screens/LocationPage/utils';
import regions from 'common/regions';
import type { Region, RegionObject } from 'common/regions';
import { LocationSummary, getSummaryFromFips } from 'common/location_summaries';
import { summaryToStats } from 'common/utils/chart';

const NOT_FOUND = {
  notFound: true,
};

/**
 * get*PathParams functions generate the valid path Ids for the corresponding region types
 */

// Northern Islands Municipality doesn't have a timeseries data from the API
// so we can't generate the page.  Find a better solution (like making that optional?)
const skipRegions = ['69085', '69100'];
// a quick-and-easy way to reduce build time by only building CA counties / regions.
const caOnly = (region: any) => region.stateCode === 'CA';
const allRegions = (region: any) => true;
// used on all county and fips-based routes only
const regionFilter = caOnly;

export const getStatePathParams = async () => {
  const pathParams = regions.states.map(state => {
    return {
      params: {
        stateId: state.urlSegment,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

export const getCountyPathParams = async () => {
  const pathParams = regions.counties
    .filter(regionFilter)
    .filter(county => !skipRegions.includes(county.fipsCode))
    .map(county => {
      return {
        params: {
          stateId: county.state.urlSegment,
          countyId: county.urlSegment,
        },
      };
    });
  return {
    paths: pathParams,
    fallback: false,
  };
};

export const getMetroAreaPathParams = async () => {
  const pathParams = regions.metroAreas.map(metro => {
    return {
      params: {
        metroAreaUrlSegment: metro.urlSegment,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

export const getCountyFipsPathParams = async () => {
  const pathParams = regions.counties
    .filter(regionFilter)
    .filter(county => !skipRegions.includes(county.fipsCode))
    .map(county => {
      return {
        params: {
          countyFipsId: county.fipsCode,
        },
      };
    });
  return {
    paths: pathParams,
    fallback: false,
  };
};

export const getFipsPathParams = async () => {
  const pathParams = regions
    .all()
    .filter(regionFilter)
    .filter(region => !skipRegions.includes(region.fipsCode))
    .map(region => {
      return {
        params: {
          fipsCode: region.fipsCode,
        },
      };
    });
  return {
    paths: pathParams,
    fallback: false,
  };
};

export const getMetroAreaFipsPathParams = async () => {
  const pathParams = regions.metroAreas.map(metro => {
    return {
      params: {
        fipsCode: metro.fipsCode,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

/**
 *  *ParamsToRegion functions take corresponding route params and find
 * the corresponding Region object, e.g., /us/:stateId -> the state
 * /embed/us/:stateId/county/:countyId -> the county
 */

export const stateParamsToRegion = (params: any) => {
  const stateId = (params?.stateId ?? '') as string;
  const region = stateId ? regions.findStateByUrlParams(stateId) : null;
  return region;
};

export const countyParamsToRegion = (params: any) => {
  const stateId = (params?.stateId ?? '') as string;
  const countyId = (params?.countyId ?? '') as string;
  const county =
    stateId && countyId
      ? regions.findCountyByUrlParams(stateId, countyId)
      : null;
  return county;
};

export const metroAreaParamsToRegion = (params: any) => {
  const metroAreaUrlSegment = (params?.metroAreaUrlSegment ?? '') as string;
  return metroAreaUrlSegment
    ? regions.findMetroAreaByUrlParams(metroAreaUrlSegment)
    : null;
};

export const countyFipsIdParamsToRegion = (params: any) => {
  const countyFipsId = (params?.countyFipsId ?? '') as string;
  return countyFipsId ? regions.findByFipsCode(countyFipsId) : null;
};

export const fipsCodeParamsToRegion = (params: any) => {
  const fipsCode = (params?.fipsCode ?? '') as string;
  return fipsCode ? regions.findByFipsCode(fipsCode) : null;
};

// A memoized version of the date string, so we don't refetch each time
let lastUpdatedDateString: string | null = null;

export const getLastUpdatedDateString = async () => {
  if (!lastUpdatedDateString) {
    const lastUpdatedDate = await new Api()
      .fetchVersionInfo()
      .then(version => {
        // NOTE: "new Date(version.timestamp)" on safari fails due to pickiness about the
        // date formatting, so just use moment to parse.
        return moment.utc(version.timestamp).toDate();
      })
      .catch(() => {
        return new Date();
      });
    lastUpdatedDateString =
      lastUpdatedDate && lastUpdatedDate.toLocaleDateString();
  }
  return lastUpdatedDateString;
};

export interface LocationPageWrapperProps {
  regionObject: RegionObject;
  locationSummary: LocationSummary;
  title: string;
  description: string;
  ccviScores: RegionCcviItem | null;
}

export const makeLocationPageGetStaticProps = ({
  paramsToRegion,
}: {
  paramsToRegion: (params: any) => Region | null;
}) => {
  const getStaticProps = async ({ params }: any): Promise<any> => {
    const region = paramsToRegion(params);
    if (!region) {
      return NOT_FOUND;
    }

    const locationSummary = getSummaryFromFips(region.fipsCode);
    const regionObject = region.toObject();
    const title = getPageTitle(region);
    const description = getPageDescription(region);

    const fipsToCcviMap = await importFipsToCcviMap();
    const ccviScores = fipsToCcviMap[region.fipsCode] ?? null;

    const props = {
      regionObject,
      locationSummary,
      title,
      description,
      ccviScores,
    };

    if (!(locationSummary && title && description)) {
      console.error('Missing data:', props);
      return NOT_FOUND;
    }
    return {
      props,
    };
  };
  return getStaticProps;
};

export const makeEmbedRegionGetStaticProps = ({
  paramsToRegion,
}: {
  paramsToRegion: (params: any) => Region | null;
}) => {
  const getStaticProps = async ({ params }: any): Promise<any> => {
    const region = paramsToRegion(params);
    if (!region) {
      return NOT_FOUND;
    }

    const locationSummary = getSummaryFromFips(region.fipsCode);
    if (!locationSummary) {
      console.error('Missing data:', region.name);
      return NOT_FOUND;
    }

    const stats = summaryToStats(locationSummary);
    const alarmLevel = locationSummary.level;
    const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
    const fillColor =
      alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

    const embedOnClickBaseURL = region.canonicalUrl;

    const lastUpdatedDateString = await getLastUpdatedDateString();
    const props = {
      regionName: region.fullName,
      fillColor,
      levelName: levelInfo.name,
      stats,
      embedOnClickBaseURL,
      lastUpdatedDateString,
    };
    return {
      props,
    };
  };
  return getStaticProps;
};
