import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { Region } from 'common/regions';

export function getPageTitle(region: Region): string {
  return `${region.shortName} - COVID Risk Map & Key Metrics`;
}

export function getPageDescription(
  region: Region,
  projections: Projections,
): string {
  const date = formatMetatagDate();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  return `${date} COVID RISK LEVEL: ${levelInfo.detail(region.shortName)}`;
}
