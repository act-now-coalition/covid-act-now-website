import ShareImageUrlJSON from 'assets/data/share_images_url.json';
import { assert } from 'common/utils';
import urlJoin from 'url-join';
import * as QueryString from 'query-string';
import { Region } from './regions';
import { DateFormat, formatDateTime } from 'common/utils/time-utils';

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
function getPageBaseUrl(): string {
  return window.location.origin;
}

function getShareImageBaseUrl(): string {
  return ShareImageUrlJSON.share_image_url;
}

export function getMapImageUrl(): string {
  const date = formatDateTime(new Date(), DateFormat.YYYY_MM_DD);
  return urlJoin(
    getShareImageBaseUrl(),
    `${date}-image-covid-us-map-cases.png`,
  );
}

// TODO(michael): Move existing code over to use this method.
export function getPageUrl(region: Region): string {
  return addSharingId(region.canonicalUrl);
}

/*
  Generates URL for sharing CAN Recommends via
  social/copy-link button in Recommends footer
*/
export function getRecommendationsShareUrl(region: Region): string {
  return addSharingId(urlJoin(region.canonicalUrl, '#recommendations'));
}

export function getComparePageUrl(
  compareShareId: string,
  region?: Region,
): string {
  // Shared Compare URLs are of the form https://covidactnow.org/compare/<id>
  // in order to have predictable IDs (so we can pre-generate index.html pages
  // with meta tags). But this routes to the homepage instead of the appropriate
  // location page, so we add on a ?redirectTo= query param to redirect to the
  // right place.

  let url = urlJoin(getPageBaseUrl(), 'share', compareShareId);
  let params: { [key: string]: unknown } = {};
  ensureSharingIdInQueryParams(params);
  const pageParam = region ? region.relativeUrl : '/';
  params['redirectTo'] = urlJoin(pageParam, 'compare', compareShareId);

  // NOTE: Trailing '/' is significant so we hit the index.html page with correct meta tags and
  // so we don't get redirected and lose the query params.
  return url + '/?' + QueryString.stringify(params);
}

export function getCompareShareImageUrl(compareShareId: string): string {
  return urlJoin(getShareImageBaseUrl(), 'share', `${compareShareId}.png`);
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
