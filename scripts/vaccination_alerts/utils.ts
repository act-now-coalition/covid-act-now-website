import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getFirestore } from '../common/firebase';
import regions, { getStateFips } from '../../src/common/regions';
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

export type FipsCode = string;
export type Email = string;
export type EmailFips = [Email, FipsCode];

const alertsFilePath = path.join(__dirname, 'vaccination-alerts.json');

const VACCINATION_VERSIONS_COLLECTION = 'vaccination-info-updates';

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

export function readVaccinationAlerts(): RegionVaccinePhaseInfoMap {
  const data = fs.readFileSync(alertsFilePath, 'utf8');
  return JSON.parse(data);
}

/**
 * Given a list of [email, fips] pairs, returns a list of emails grouped
 * by FIPS code.
 *
 * Example:
 *
 *   const emailFipsList = [
 *     ['pablo@can.org', '29'],
 *     ['chelsi@can.org', '31'],
 *     ['chris@can.org', '31']
 *   ];
 *
 *   groupByFips(emailFipsList)
 *   {
 *     '29': ['pablo@can.org'],
 *     '31': ['chelsi@can.org', 'chris@can.org']
 *   }
 */
export function groupByFips(
  emailFipsList: EmailFips[],
): { [fipsCode: string]: string[] } {
  return _.chain(emailFipsList)
    .groupBy(([email, fips]) => fips)
    .map((emailFipsList, fips) => {
      return [fips, emailFipsList.map(([email, fips]) => email)];
    })
    .fromPairs()
    .value();
}

/**
 * Returns the list of locations that we need to notify of vaccination information
 * changes. For now, is just the list of keys in the `vaccination-alerts.json` file.
 */
export function getLocationsToAlert(
  vaccinationAlertInfo: RegionVaccinePhaseInfoMap,
): FipsCode[] {
  return _.keys(vaccinationAlertInfo);
}

/**
 * Returns the list of FIPS codes that the user should be notified fors, given a list
 * of locations with vaccination updates. For now, we return the list of states that
 * contain the user subscriptions, even if the user is not subscribed to the state
 * directly.
 *
 * Example: The user is subscribed to ['42001', '29005', '56', '12', '35620'], and we
 * have updates for ['29', '01'], then we will notify the user for the changes in
 * vaccination information for '29', even if the user is not subscribed to alerts for
 * '29' directly.
 *
 * Note: Metro areas are not notified when using this logic.
 */
export function getUserLocationsToAlert(
  userLocations: FipsCode[],
  locationsToAlert: FipsCode[],
): FipsCode[] {
  return _.chain(userLocations)
    .map(fipsCode => {
      const region = regions.findByFipsCode(fipsCode);
      const stateFips = region ? getStateFips(region) : null;
      return stateFips ? stateFips : '';
    })
    .filter(stateFips => stateFips.length > 0)
    .uniq()
    .intersection(locationsToAlert)
    .value();
}
