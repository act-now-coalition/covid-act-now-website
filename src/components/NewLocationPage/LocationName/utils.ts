import { Region, State, County, MetroArea } from 'common/regions';

const regionSuffixes = [
  'metro',
  'city',
  'municipality',
  'municipio',
  'mun.',
  'county',
  'co.',
  'parish',
  'par.',
  'area',
  'c.a.',
  'borough',
  'bor.',
];

/**
 * Common indicators of regions with multiple-word suffixes
 * include region names with 'and' and 'census' as the second-last word of the region name.
 * Examples: 'Census Area', 'City and Borough'
 */
const multipleWordSuffixIndicator = ['and', 'census'];

export function isMultiStateMetro(region: MetroArea): boolean {
  return region.stateCodes.includes('-');
}

export function getSplitRegionName(region: Region, condensed?: boolean) {
  if (region instanceof State) {
    return [region.name];
  } else if (region instanceof County) {
    return condensed
      ? splitRegionName(region.abbreviation)
      : splitRegionName(region.name);
  } else {
    return splitRegionName(region.shortName);
  }
}

function splitRegionName(regionName: string) {
  let suffix;
  const splitRegion = regionName.split(' ');
  /**
   * Don't separate name from suffix for regions with multiple-word suffix,
   * as it is unknown how many words exactly make up a multiple-word suffix.
   * Example: 'Valdez-Cordova Census Area', 'Yakutat City and Borough'
   */
  if (
    multipleWordSuffixIndicator.includes(
      splitRegion[splitRegion.length - 2].toLowerCase(),
    )
  ) {
    suffix = null;
    /**
     * Separate suffix from the region name if the suffix is a recognizable one-word suffix (most common case).
     */
  } else if (
    regionSuffixes.includes(splitRegion[splitRegion.length - 1].toLowerCase())
  ) {
    suffix = splitRegion.pop();
    /**
     * Cases where it is unknown whether the region name contains a suffix.
     */
  } else suffix = null;
  const regionNameMain = splitRegion.join(' ');
  return [regionNameMain, suffix];
}
