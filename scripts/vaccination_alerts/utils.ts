import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as Handlebars from 'handlebars';
import { COLOR_MAP } from '../../src/common/colors';
import regions, { getStateFips } from '../../src/common/regions';
import {
  RegionVaccinePhaseInfo,
  stateVaccinationPhases,
} from '../../src/cms-content/vaccines/phases';
import {
  getEmailAlertData,
  VaccinationEmailAlertData,
} from '../../src/cms-content/vaccines/email-alerts';
import { toISO8601 } from '../alert_emails/utils';

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

export const DEFAULT_ALERTS_FILE_PATH = path.join(
  __dirname,
  'vaccination-alerts.json',
);

const emailTemplatePath = path.join(
  __dirname,
  'vaccination-alert-template.html',
);

const emailTemplate = Handlebars.compile(
  fs.readFileSync(emailTemplatePath, 'utf8'),
);

export function getCmsVaccinationInfo(): RegionVaccinePhaseInfoMap {
  return _.chain(stateVaccinationPhases)
    .map(stateInfo => [stateInfo.fips, stateInfo])
    .fromPairs()
    .value();
}

export function getUpdatedVaccinationInfo(
  cmsInfoByFips: RegionVaccinePhaseInfoMap,
  firestoreVersionByFips: RegionVaccineVersionMap,
): RegionVaccinePhaseInfoMap {
  const updatedInfoByFips: RegionVaccinePhaseInfoMap = {};
  for (const fipsCode in cmsInfoByFips) {
    const firestoreVersionInfo = firestoreVersionByFips[fipsCode];
    const cmsPhaseInfo = cmsInfoByFips[fipsCode];

    // Only generate the alert if there isn't a version stored in Firestore
    // or when the version number from the CMS is higher than the latest version
    // stored in Firestore.
    const cmsEmailAlertVersion = cmsPhaseInfo.emailAlertVersion;
    const hasNewVaccinationInfo =
      !firestoreVersionInfo ||
      firestoreVersionInfo.emailAlertVersion < cmsEmailAlertVersion;

    // Only send email alerts when the version is 1 or greater as a mechanism to
    // allow sending emails state by state.
    if (hasNewVaccinationInfo && cmsEmailAlertVersion >= 1) {
      updatedInfoByFips[fipsCode] = cmsPhaseInfo;
    }
  }
  return updatedInfoByFips;
}

export function readVaccinationAlerts(
  alertsFilePath: string,
): RegionVaccinePhaseInfoMap {
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
export function getStateFipsCodesSet(fipsCodes: FipsCode[]) {
  // All state fips codes that a user is subscribed to.
  return _.chain(fipsCodes)
    .map(fipsCode => {
      const region = regions.findByFipsCode(fipsCode);
      const stateFips = region ? getStateFips(region) : null;
      return stateFips ? stateFips : '';
    })
    .filter(stateFips => stateFips.length > 0)
    .uniq();
}

/**
 * Return a HTML string with the content of the email
 */
function renderEmail(data: VaccinationEmailAlertData) {
  return emailTemplate({ ...data, colors: COLOR_MAP });
}

/**
 * Generates the information that the email service needs to send the email
 */
export function generateEmailData(emailAddress: string, fipsCode: string) {
  const emailData = getEmailAlertData(emailAddress, fipsCode);
  const emailHtmlContent = renderEmail(emailData);

  // Writing the file locally is useful while styling
  // fs.writeFileSync('alert.html', emailHtmlContent);

  return {
    Subject: emailData.emailSubjectLine,
    To: [emailAddress],
    Html: emailHtmlContent,
    From: 'Covid Act Now Alerts <noreply@covidactnow.org>',
    ReplyTo: 'noreply@covidactnow.org',
    Group: `vaccination-alerts_${toISO8601(new Date())}`,
  };
}

export function projectRelativePath(absPath: string) {
  return path.relative(path.join(__dirname, '../..'), absPath);
}
