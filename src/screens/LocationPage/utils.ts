import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { Region, State, County } from 'common/regions';

function locationName(region: Region) {
  if (region instanceof State) {
    return `${region.name} (${region.stateCode})`;
  } else if (region instanceof County) {
    return `${region.fullName}, (${region.state.stateCode})`;
  } else {
    return region.fullName;
  }
}

export function getPageTitle(region: Region): string {
  return `${locationName(region)} - COVID Risk Map & Key Metrics`;
}

export function getPageDescription(
  region: Region,
  projections: Projections,
): string {
  const date = formatMetatagDate();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  return `${date} COVID RISK LEVEL: ${levelInfo.detail(locationName(region))}`;
}
