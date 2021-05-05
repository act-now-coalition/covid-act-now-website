import { Region, State, County, MetroArea } from 'common/regions';

const regionSuffixes = ['metro', 'city', 'county', 'parish', 'area', 'borough'];

/**
 * Common indicators of regions with multiple-word suffixes
 * include region names with 'and' and 'census'
 * (e.g. 'City and Borough', 'Census Area').
 */
const multipleWordSuffixIndicator = ['and', 'census'];

export function isMultiStateMetro(region: MetroArea): boolean {
  return region.stateCodes.includes('-');
}

export function getSplitRegionName(region: Region) {
  if (region instanceof State) {
    return [region.name];
  } else if (region instanceof County) {
    return splitRegionName(region.name);
  } else {
    return splitRegionName(region.shortName);
  }
}

function splitRegionName(regionName: string) {
  let suffix;
  const splitRegion = regionName.split(' ');
  // Don't separate name from suffix for regions with multiple-word suffix.
  // Example: "Valdez-Cordova Census Area", "Yakutat City and Borough"
  if (
    multipleWordSuffixIndicator.includes(
      splitRegion[splitRegion.length - 2].toLowerCase(),
    )
  ) {
    suffix = null;
  } else if (
    regionSuffixes.includes(splitRegion[splitRegion.length - 1].toLowerCase())
  ) {
    suffix = splitRegion.pop();
  } else suffix = null;
  const regionNameMain = splitRegion.join(' ');
  return [regionNameMain, suffix];
}
