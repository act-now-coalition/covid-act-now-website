import _ from 'lodash';
import {
  RegionVaccinePhaseInfo,
  stateVaccinationPhases,
} from '../../src/cms-content/vaccines/phases';

export interface RegionVaccinePhaseInfoMap {
  [fipsCode: string]: RegionVaccinePhaseInfo;
}

export interface RegionVaccineVersion {
  emailAlertVersion: number;
}

export interface RegionVaccineVersionMap {
  [fipsCode: string]: RegionVaccineVersion;
}

export function getCmsVaccinationInfo(): RegionVaccinePhaseInfoMap {
  return _.chain(stateVaccinationPhases)
    .map(stateInfo => [stateInfo.fips, stateInfo])
    .fromPairs()
    .value();
}

// TODO: Fetch this from Firebase, return an empty object if Firebase
// doesn't have any data.
export function getFirebaseVaccinationInfo(): RegionVaccineVersionMap {
  return {
    // '29': {
    //   emailAlertVersion: 0,
    // },
  };
}

export function getUpdatedVaccinationInfo(
  currentInfoByFips: RegionVaccinePhaseInfoMap,
  lastVersionByFips: RegionVaccineVersionMap,
): RegionVaccinePhaseInfoMap {
  const updatedInfoByFips: RegionVaccinePhaseInfoMap = {};
  for (const fipsCode in currentInfoByFips) {
    const lastVersionInfo = lastVersionByFips[fipsCode];
    const currentPhaseInfo = currentInfoByFips[fipsCode];

    if (
      !lastVersionInfo ||
      lastVersionInfo.emailAlertVersion !== currentPhaseInfo.emailAlertVersion
    ) {
      updatedInfoByFips[fipsCode] = currentPhaseInfo;
    }
  }
  return updatedInfoByFips;
}
