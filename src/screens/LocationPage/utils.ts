import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate } from 'common/utils';
import { Region, State, County, MetroArea } from 'common/regions';
import { replace } from 'lodash';
import { LocationSummariesByFIPS } from 'common/location_summaries';

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
  return `${locationName(region)} - COVID Data & Key Metrics`;
}

export function getPageDescription(region: Region): string {
  const date = formatMetatagDate();
  const { l: alarmLevel } = LocationSummariesByFIPS[region.fipsCode];
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  return `${date} COVID RISK LEVEL: ${levelInfo.detail(locationName(region))}`;
}
