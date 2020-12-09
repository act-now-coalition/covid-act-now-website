import { Projections } from 'common/models/Projections';
import { findLocationForFips, findStateByFips } from 'common/locations';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { formatMetatagDate } from 'common/utils';
import { Region } from 'common/regions';

function getLocationName(fipsCode: string) {
  const location = findLocationForFips(fipsCode);
  const { state: stateName } = findStateByFips(location.state_fips_code);
  const { county: countyName, state_code: stateCode } = location;
  const locationName = location.county
    ? `${countyName}, ${stateName} (${stateCode})`
    : `${stateName} (${stateCode})`;
  return locationName;
}

export function getPageTitle(projections: Projections): string {
  const locationName = getLocationName(projections.fips);
  return `${locationName} - COVID Risk Map & Key Metrics`;
}

export function getPageTitleRegion(region: Region): string {
  return `${region.fullName()} - COVID Risk Map & Key Metrics`;
}

export function getPageDescription(
  region: Region,
  projections: Projections,
): string {
  const date = formatMetatagDate();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const locationName = region.fullName();
  return `${date} COVID RISK LEVEL: ${levelInfo.detail(locationName)}`;
}
