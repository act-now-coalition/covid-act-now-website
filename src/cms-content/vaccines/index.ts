import { useState, useEffect } from 'react';
import { Region, RegionType } from 'common/regions';
import STATE_VACCINE_DATA from './state.json';
import { fromPairs } from 'lodash';

export interface RegionVaccinationInfo {
  hidden: boolean;
  fips: string;
  locationName: string;
  stateCode: string;
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
};

export const getVaccinationDataByRegion = (
  region: Region,
): RegionVaccinationInfo | null => {
  return VACCINATION_DATA_BY_FIPS[region.fipsCode] || null;
};
