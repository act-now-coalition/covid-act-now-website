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
  'c.a.',
  'borough',
  'bor.',
];

const multiSuffixIndicator = ['and', 'census'];

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

/**
 * We only split the region name into [main, suffix] and apply unique
 * styles to each if it is a single word suffix (ie. 'County').
 *
 * We don't split the region name for regions with multiple-word suffix (ie. 'Census Area', 'City and Borough'),
 * as it is unknown how many words exactly make up a multiple-word suffix.
 * In this case, we style the whole region name the same.
 */
function splitRegionName(regionName: string) {
  const splitRegion = regionName.split(' ');
  if (
    regionSuffixes.includes(
      splitRegion[splitRegion.length - 1].toLowerCase(),
    ) &&
    !multiSuffixIndicator.includes(
      splitRegion[splitRegion.length - 2].toLowerCase(),
    )
  ) {
    const suffix = splitRegion.pop();
    const regionNameMain = splitRegion.join(' ');
    return [regionNameMain, suffix];
  } else {
    const regionNameMain = splitRegion.join(' ');
    return [regionNameMain];
  }
}
