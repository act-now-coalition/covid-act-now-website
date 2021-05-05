import { Region, State, County, MetroArea } from 'common/regions';

export function isMultiStateMetro(region: MetroArea): boolean {
  return region.stateCodes.includes('-');
}

export function getRegionName(region: Region) {
  if (region instanceof State) {
    return [region.name];
  } else if (region instanceof County) {
    return splitRegionName(region.name);
  } else {
    return splitRegionName(region.shortName);
  }
}

function splitRegionName(regionName: string) {
  const splitRegion = regionName.split(' ');
  const suffix = splitRegion.pop();
  const regionNameMain = splitRegion.join(' ');
  return [regionNameMain, suffix];
}
