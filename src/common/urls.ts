import ShareImageUrlJSON from 'assets/data/share_images_url.json';
import { assert } from 'common/utils';
import { County } from './locations';
import urlJoin from 'url-join';

/**
 * We append a short unique string corresponding to the currently published
 * sharing preview images to the URL so that if it gets shared, it's unique
 * enough that Facebook/Twitter/whoever will fetch a recent version of the page
 * and the up-to-date sharing image.
 */
const SHARING_ID_QUERY_PARAM = 's';
const SHARING_ID = sharingId();
const SHARING_ID_QUERYSTRING = `?${SHARING_ID_QUERY_PARAM}=${SHARING_ID}`;

/**
 * Generates the URL for the homepage or a (state / county) location page.
 *
 * Notes:
 * - Does not include the sharing ID (?s=...)
 * - Uses window.origin to determine the base URL, so it should match localhost / staging / prod / etc.
 */
function getPageBaseUrl(
  stateId: string | undefined,
  county: County | undefined,
): string {
  const origin = window.location.origin;
  let shareURL = origin; // home page
  if (stateId && county) {
    // county page
    shareURL = `${origin}/us/${stateId.toLowerCase()}/county/${
      county.county_url_name
    }`;
  } else if (stateId) {
    // state page
    shareURL = `${origin}/us/${stateId.toLowerCase()}`;
  }

  return shareURL;
}

function getShareImageBaseUrl(
  stateId: string | undefined,
  county: County | undefined,
): string {
  const imageBaseUrl = ShareImageUrlJSON.share_image_url;
  if (county) {
    return urlJoin(imageBaseUrl, 'counties', county.full_fips_code);
  } else if (stateId) {
    return urlJoin(imageBaseUrl, 'states', stateId);
  } else {
    return imageBaseUrl;
  }
}

// TODO(michael): Move existing code over to use this method.
export function getPageUrl(
  stateId: string | undefined,
  county: County | undefined,
): string {
  return addSharingId(getPageBaseUrl(stateId, county));
}

export function getComparePageUrl(
  stateId: string | undefined,
  county: County | undefined,
  sharingId: string,
): string {
  return addSharingId(
    urlJoin(getPageBaseUrl(stateId, county), 'compare', sharingId),
  );
}

export function getCompareShareImageUrl(
  stateId: string | undefined,
  county: County | undefined,
  sharingId: string,
): string {
  return urlJoin(
    getShareImageBaseUrl(stateId, county),
    'compare',
    `${sharingId}.png`,
  );
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

/**
 * Extracts the numeric part of the share images URL and removes the dash.
 * E.g.: https://content.covidactnow.org/share/373-27/  ==>  37327
 */
function sharingId() {
  const url = ShareImageUrlJSON.share_image_url;
  const match = /\/([\d-]+)\/?$/.exec(url);
  assert(match, `${url} did not match share images URL regex.`);
  return match[1].replace('-', '');
}
