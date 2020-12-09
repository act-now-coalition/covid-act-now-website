import { Projections } from 'common/models/Projections';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate } from 'common/utils';
import { Region } from 'common/regions';

export function getPageTitle(projections: Projections): string {
  return `${projections.locationName} - COVID Risk Map & Key Metrics`;
}

export function getPageTitleRegion(region: Region): string {
  return `${region.fullName} - COVID Risk Map & Key Metrics`;
}

export function getPageDescription(
  region: Region,
  projections: Projections,
): string {
  const date = formatMetatagDate();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const locationName = region.fullName;
  return `${date} COVID RISK LEVEL: ${levelInfo.detail(locationName)}`;
}
