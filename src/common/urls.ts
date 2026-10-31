import { assert } from '@actnowcoalition/assert';
import { Region } from './regions';

/**
 * We append a short unique string corresponding to the currently published
 * sharing preview images to the URL so that if it gets shared, it's unique
 * enough that Facebook/Twitter/whoever will fetch a recent version of the page
 * and the up-to-date sharing image.
 */
const SHARING_ID_QUERY_PARAM = 's';
// Frozen with the final data snapshot (5008, share images 3753).
const SHARING_ID = '50083753';
const SHARING_ID_QUERYSTRING = `?${SHARING_ID_QUERY_PARAM}=${SHARING_ID}`;

/** The site's default social card, used for every page. */
export function getMapImageUrl(): string {
  return 'https://covidactnow.org/covidactnow.png';
}

// TODO(michael): Move existing code over to use this method.
export function getPageUrl(region: Region): string {
  return addSharingId(region.canonicalUrl);
}

/**
 * Adds unique sharing querystring to the URL.
 *
 * TODO(michael): Remove this and instead have dedicated functions for
 * generating URLs to the home page / location pages, etc. and use those
 * everywhere rather than building up URLs piecemeal from strings.
 *
 */
export function addSharingId(url: string) {
  assert(!url.includes('?'), `Url "${url}" has existing query params.`);
  return url + SHARING_ID_QUERYSTRING;
}

/**
 * Adds/Updates the unique sharing ID to the provided query params as necessary,
 * returning true if they were modified.
 */
export function ensureSharingIdInQueryParams(params: {
  [key: string]: unknown;
}): boolean {
  if (params[SHARING_ID_QUERY_PARAM] !== SHARING_ID) {
    params[SHARING_ID_QUERY_PARAM] = SHARING_ID;
    return true;
  }
  return false;
}
