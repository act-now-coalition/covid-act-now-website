import some from 'lodash/some';
import { State, County, Region, MetroArea } from 'common/regions';

const EXPOSURE_NOTIFICATIONS_STATE_FIPS = [
  '01', // Alabama,
  '06', // California,
  '08', // Colorado,
  '09', // Connecticut,
  '10', // Delaware,
  '15', // Hawaii
  '22', // Louisiana,
  '24', // Maryland,
  '26', // Michigan,
  '27', // Minnesota,
  '32', // Nevada,
  '34', // New Jersey,
  '36', // New York,
  '37', // North Carolina,
  '38', // North Dakota,
  '42', // Pennsylvania,
  '51', // Virginia,
  '53', // Washington,
  '11', // Washington DC,
  '56', // Wyoming
];

export function showExposureNotifications(region: Region) {
  if (region instanceof County) {
    return EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(region.state.fipsCode);
  } else if (region instanceof State) {
    return EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(region.fipsCode);
  } else if (region instanceof MetroArea) {
    return some(region.states, state =>
      EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(state.fipsCode),
    );
  } else {
    return false;
  }
}

export function getStateName(region: Region) {
  if (region instanceof State) {
    return region.fullName;
  } else if (region instanceof County) {
    return region.state.fullName;
  } else if (region instanceof MetroArea) {
    return region.states.length === 1
      ? region.states[0].fullName
      : 'your state';
  } else {
    return '';
  }
}
