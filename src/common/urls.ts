import ShareImageUrlJSON from 'assets/data/share_images_url.json';
import { assert } from 'common/utils';

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
