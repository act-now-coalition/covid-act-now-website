import transform from 'lodash/transform';

import countyUrlSegmentsToFipsJson from 'common/data/county_url_segments_to_fips.json';
import metroAreaUrlSegmentsToFipsJson from 'common/data/metro_area_url_segments_to_fips.json';
import {
  countyUrlParamsToUrlKey,
  FipsCode,
  statesByFips,
  findStateByStateCode,
} from './types';

/**
 * Functions to get FIPS codes from URL params, which will allow separating
 * the lookup of region data from the routing decisions
 */
// transform the statesByFips map into an appropriate urlSegment -> FipsCode map
const stateUrlSegmentsToFips = transform(
  statesByFips,
  (result: { [urlSegment: string]: FipsCode }, value, _) => {
    result[value.urlSegment] = value.fipsCode;
  },
);

const countyUrlSegmentsToFips = countyUrlSegmentsToFipsJson as {
  [urlSegment: string]: FipsCode;
};
const metroAreaUrlSegmentsToFips = metroAreaUrlSegmentsToFipsJson as {
  [urlSegment: string]: FipsCode;
};

export function findStateFipsByUrlParams(urlSegment: string): FipsCode | null {
  const fips = stateUrlSegmentsToFips[urlSegment] ?? null;

  // The second condition is added to support legacy URLs with the 2-letter
  // state code (`/us/wa`)
  if (Boolean(fips)) {
    return fips;
  } else {
    return findStateByStateCode(urlSegment)?.fipsCode ?? null;
  }
}

export function findCountyFipsByUrlParams(
  stateUrlSegment: string,
  countyUrlSegment: string,
): FipsCode | null {
  // There's an old style link we want to redirect from which has the 2-character state code
  // instead of the full state urlSegment.  Detect that here, so we can get the right FIPS code,
  // but we'll redirect away from it in the calling function.
  // If it's an invalid state code, that's fine, we'll get null for the fips and just redirect to /
  const correctStateUrlSegment =
    stateUrlSegment.length === 2
      ? findStateByStateCode(stateUrlSegment)?.urlSegment
      : stateUrlSegment;

  if (!correctStateUrlSegment) {
    return null;
  }
  const key = countyUrlParamsToUrlKey(correctStateUrlSegment, countyUrlSegment);
  return countyUrlSegmentsToFips[key] ?? null;
}

export function findMetroAreaFipsByUrlParams(
  urlSegment: string,
): FipsCode | null {
  return metroAreaUrlSegmentsToFips[urlSegment] ?? null;
}
