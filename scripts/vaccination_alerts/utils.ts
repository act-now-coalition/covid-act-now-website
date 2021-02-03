import _ from 'lodash';
import { getFirestore } from '../common/firebase';
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

const VACCINATION_VERSIONS_COLLECTION = 'info/vaccinationInfoUpdates/locations';

export function getCmsVaccinationInfo(): RegionVaccinePhaseInfoMap {
  return _.chain(stateVaccinationPhases)
    .map(stateInfo => [stateInfo.fips, stateInfo])
    .fromPairs()
    .value();
}

export async function getFirebaseVaccinationInfo(): Promise<
  RegionVaccineVersionMap
> {
  const collection = await getFirestore()
    .collection(VACCINATION_VERSIONS_COLLECTION)
    .get();

  const versionsByFips = await collection.docs.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.data() };
  }, {});

  return versionsByFips;
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
