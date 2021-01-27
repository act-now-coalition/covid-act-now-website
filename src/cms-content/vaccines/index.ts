import { Region } from 'common/regions';
import STATE_VACCINE_DATA from './state.json';
import METRO_VACCINE_DATA from './msa.json';
import COUNTY_VACCINE_DATA from './county.json';
import { fromPairs } from 'lodash';

export interface RegionVaccinationInfo {
  hidden: boolean;
  fips: string;
  locationName: string;
  eligibilityInfoUrl: string;
  vaccinationSignupUrl?: string;
}

export interface RegionTypeVaccinationInfo {
  regions: RegionVaccinationInfo[];
}

const VACCINATION_DATA_BY_FIPS: { [fips: string]: RegionVaccinationInfo } = {
  ...fromPairs(
    (STATE_VACCINE_DATA as RegionTypeVaccinationInfo).regions.map(item => [
      item.fips,
      item,
    ]),
  ),
  ...fromPairs(
    (METRO_VACCINE_DATA as RegionTypeVaccinationInfo).regions.map(item => [
      item.fips,
      item,
    ]),
  ),
  ...fromPairs(
    (COUNTY_VACCINE_DATA as RegionTypeVaccinationInfo).regions.map(item => [
      item.fips,
      item,
    ]),
  ),
};

export const getVaccinationDataByRegion = (
  region: Region,
): RegionVaccinationInfo | null => {
  return VACCINATION_DATA_BY_FIPS[region.fipsCode] || null;
};
