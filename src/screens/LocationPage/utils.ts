import replace from 'lodash/replace';
import { formatMetatagDate } from 'common/utils';
import { Region, State, County, MetroArea } from 'common/regions';

function locationName(region: Region) {
  if (region instanceof State) {
    return `${region.name} (${region.stateCode})`;
  } else if (region instanceof County) {
    return `${region.fullName} (${region.state.stateCode})`;
  } else if (region instanceof MetroArea) {
    return replace(region.name, /-/g, ', ');
  } else {
    return region.fullName;
  }
}

export function getPageTitle(region: Region): string {
  const location = locationName(region);
  return `${location} - U.S. COVID Tracker`;
}

export function getPageDescription(region: Region): string {
  const date = formatMetatagDate();
  const location = locationName(region);
  return `${date}: Covid Act Now has real-time tracking of your community's COVID risk level. Explore how ${location} is doing.`;
}
