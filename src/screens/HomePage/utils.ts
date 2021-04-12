import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import take from 'lodash/take';
import { FipsCode, RegionDB } from 'common/regions';

import largestMetroFipsForExploreJson from 'common/data/largest_metro_fips_for_explore.json';

const largestMetroFipsForExplore = largestMetroFipsForExploreJson as FipsCode[];

// This is used to compute data at build time, because it governs a fixed list
// we can precompute.  So if you need to change this value,
// re-run `yarn prepare-regions-data` and check in the updated files.
export const DEFAULT_EXPLORE_GEOLOCATION_COUNT = 5;

/* Gets fips of 5 largest metro areas to set as homepage explore presets */
export function getLargestMetroFipsForExplore(numRegions: number) {
  return take(largestMetroFipsForExplore, numRegions);
}

export function computeLargestMetroFipsForExplore(
  regions: RegionDB,
  numRegions: number,
) {
  const sortedMetros = reverse(
    sortBy(regions.metroAreas, metro => metro.population),
  );

  return take(sortedMetros, numRegions).map(
    locationInfo => locationInfo.fipsCode,
  );
}
