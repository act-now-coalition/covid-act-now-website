import regions, { RegionType, County } from 'common/regions';
import { sortBy, partition } from 'lodash';
import { countyFipsToZips } from 'components/MapSelectors/datasets';

function getCountyZips(countyFips: string): string[] {
  return countyFipsToZips[countyFips];
}

export function getSearchAutocompleteLocations(region?: any) {
  const allStates = regions.states;
  const allCounties = regions.counties;

  const sortedStates = sortBy(allStates, state => state.name);
  const sortedCounties = sortBy(allCounties, county => county.name);

  // Adds 'zip_codes' property to county obj (containing array of zip codes within county fips)
  const sortedCountiesWithZips = sortedCounties.map((county: any) => {
    return {
      ...county,
      zip_codes: getCountyZips(county.fipsCode),
    };
  });

  if (!region) {
    return [...sortedStates, ...sortedCountiesWithZips];
  }

  // make util:
  function belongsToState(county: County, stateFips: any) {
    return county.state.fipsCode === stateFips;
  }

  const stateFips =
    region.regionType === RegionType.COUNTY
      ? region.state.fipsCode
      : region.fipsCode;
  const [stateCounties, otherCounties] = partition(
    sortedCountiesWithZips,
    county => belongsToState(county, stateFips),
  );

  return [...stateCounties, ...sortedStates, ...otherCounties];
}

/* 
  Determines amount of locations that show in dropdown menu when clicking into searchbar.
  If on homepage, should only show states.
  If on location page, should only show counties within state.
*/

export function getFilterLimit(region?: any) {
  if (region) {
    const stateFips = region.state?.fipsCode || region.fipsCode;
    const countiesInState = regions.counties.filter(
      county => county.state.fipsCode === stateFips,
    );
    return countiesInState.length;
  }
  return regions.states.length;
}
