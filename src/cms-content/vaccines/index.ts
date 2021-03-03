import { keyBy } from 'lodash';
import { Region } from 'common/regions';
import METRO_VACCINE_DATA from './msa.json';
import COUNTY_VACCINE_DATA from './county.json';
import { stateVaccinationPhases } from './phases';

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

/**
 * Note: We are deprecating the vaccination links for states because the `state-vaccine-phases.json`
 * file contains eligibility and signup URLs
 */
const STATE_VACCINE_DATA: RegionVaccinationInfo[] = stateVaccinationPhases.map(
  vaccinationInfo => ({
    hidden: false,
    fips: vaccinationInfo.fips,
    locationName: vaccinationInfo.locationName,
    eligibilityInfoUrl: vaccinationInfo.eligibilityInfoUrl,
    vaccinationSignupUrl: vaccinationInfo.vaccinationSignupUrl,
  }),
);

const VACCINATION_DATA_BY_FIPS: { [fips: string]: RegionVaccinationInfo } = {
  ...keyBy(STATE_VACCINE_DATA, item => item.fips),
  ...keyBy(
    (METRO_VACCINE_DATA as RegionTypeVaccinationInfo).regions,
    item => item.fips,
  ),
  ...keyBy(
    (COUNTY_VACCINE_DATA as RegionTypeVaccinationInfo).regions,
    item => item.fips,
  ),
};

export const getVaccinationDataByRegion = (
  region: Region,
): RegionVaccinationInfo | null => {
  return VACCINATION_DATA_BY_FIPS[region.fipsCode] || null;
};
