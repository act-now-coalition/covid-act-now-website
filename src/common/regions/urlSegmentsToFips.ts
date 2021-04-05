import stateCodesToFipsJSON from 'common/data/regions/state_codes_to_fips.json';
import stateUrlSegmentsToFipsJSON from 'common/data/regions/state_url_segments_to_fips.json';
import countyUrlSegmentsToFipsJSON from 'common/data/regions/county_url_segments_to_fips.json';
import metroAreaUrlSegmentsToFipsJSON from 'common/data/regions/metro_area_url_segments_to_fips.json';

interface FipsLookup {
  [index: string]: string;
}

export const stateCodesToFips = stateCodesToFipsJSON as FipsLookup;
export const stateUrlSegmentsToFips = stateUrlSegmentsToFipsJSON as FipsLookup;
export const countyUrlSegmentsToFips = countyUrlSegmentsToFipsJSON as FipsLookup;
export const metroAreaUrlSegmentsToFips = metroAreaUrlSegmentsToFipsJSON as FipsLookup;
