import moment from 'moment';
import { Projections } from 'common/models/Projections';
import { findLocationForFips, findStateByFips } from 'common/locations';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

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
  return `${locationName} - America’s COVID Warning System`;
}

export function getPageDescription(projections: Projections): string {
  const dateToday = moment().format('MMM DD, YYYY');
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const locationName = getLocationName(projections.fips);
  return `${dateToday} Risk Level: ${levelInfo.detail(locationName)}`;
}
