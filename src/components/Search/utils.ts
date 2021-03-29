import regions from 'common/regions/region_db';
import { County, State, getStateFips, Region, MetroArea } from 'common/regions';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';

// Move somewhere more central:
function belongsToState(county: County, stateFips: string | null) {
  return county.state.fipsCode === stateFips;
}

/* To get color of location icon in dropdown menu:  */
export function getLocationIconFillColor(region: Region) {
  const locationSummary = LocationSummariesByFIPS[region.fipsCode];
  if (locationSummary) {
    return LOCATION_SUMMARY_LEVELS[locationSummary.level].color;
  } else return `${COLOR_MAP.GRAY.LIGHT}`;
}

/* 
  Determines amount of locations that show in dropdown menu when clicking into searchbar.
  If on homepage, should only show states.
  If on location page, should only show counties within state.
*/
export function getFilterLimit(region?: Region) {
  if (!region) {
    return regions.states.length;
  }

  if (region instanceof MetroArea) {
    return Math.max(20, region.counties.length);
  } else if (region instanceof State || region instanceof County) {
    const stateFips = getStateFips(region);
    const countiesInState = regions.counties.filter(county =>
      belongsToState(county, stateFips),
    );
    if (countiesInState.length) {
      return countiesInState.length;
    } else {
      return regions.states.length;
    }
  } else {
    return regions.states.length;
  }
}
