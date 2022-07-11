import path from 'path';
import fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import { Alert } from './interfaces';
import { Level } from '../../src/common/level';
import { LOCATION_SUMMARY_LEVELS } from '../../src/common/metrics/location_summary';
import { fetchMainSnapshotNumber } from '../../src/common/utils/snapshots';
import { DateFormat, formatDateTime } from '@actnowcoalition/time-utils';

export const ALERT_EMAIL_GROUP_PREFIX = 'alert-email';

const thermometerBaseURL = 'https://covidactnow.org/images/email_alerts';
const unsubscribeURL = 'https://covidactnow.org/alert_unsubscribe';

export function toISO8601(date: Date): string {
  return formatDateTime(date, DateFormat.YYYY_MM_DD);
}

const alertTemplate = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
);

interface Disclaimer {
  name: string;
  text: string;
}

interface AlertTemplateData {
  change: string;
  location_name: string;
  img_alt: string;
  img_url: string;
  last_updated: string;
  location_url: string;
  subscribe_link: string;
  unsubscribe_link: string;
  feedback_subject_line: string;
  disclaimer: Disclaimer | null;
  donationUrl: string;
  donationText: string;
}

/* EXAMPLE of an alert disclaimer.
const texasFipsCodes = [
  '48',
  ...regions
    .findCountiesAndMetrosByStateCode('TX')
    .map(region => region.fipsCode),
];
function getDisclaimerText(fips: string): Disclaimer | null {
  if (texasFipsCodes.includes(fips)) {
    return {
      name: 'NOTICE: Texas Winter Weather',
      text:
        'In February 2021, Texas experienced extreme winter weather that impacted many ' +
        'aspects of daily life, including COVID testing. We expect it to take some time for ' +
        'testing to recover. In the meantime, our metrics and risk levels should be ' +
        'treated with caution.',
    };
  } else {
    return null;
  }
}
*/
function getDisclaimerText(fips: string): Disclaimer | null {
  // See above for an example of how to specify an alert disclaimer.
  return null;
}

interface DonationContent {
  donationUrl: string;
  donationText: string;
}

/**
 * Generate a hash from an email address to aid in
 * splitting email recipients into two groups of roughly equal size.
 *
 * Source: https://stackoverflow.com/a/7616484
 */
function getEmailAddressHash(emailAddress: string): number {
  var hash = 0,
    i,
    chr;
  if (emailAddress.length === 0) return hash;
  for (i = 0; i < emailAddress.length; i++) {
    chr = emailAddress.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Split email recipients into two groups.
 * Email addresses with even hash receive content linking to GiveButter donation page.
 * Email addresses with odd hash receive content linking to GiveMomentum donation page.
 */
function getDonationContent(emailAddress: string): DonationContent {
  return getEmailAddressHash(emailAddress) % 2 === 0
    ? {
        donationUrl: 'https://covidactnow.org/donate',
        donationText: '',
      }
    : {
        donationUrl: 'https://covidactnow.org/give_momentum_donate',
        donationText: '',
      };
}

function generateAlertEmailContent(
  emailAddress: string,
  locationAlert: Alert,
): string {
  const {
    newLevel,
    oldLevel,
    locationName,
    lastUpdated,
    locationURL,
  } = locationAlert;

  const oldLevelText = LOCATION_SUMMARY_LEVELS[oldLevel].summary;
  const newLevelText = LOCATION_SUMMARY_LEVELS[newLevel].summary;
  const disclaimer = getDisclaimerText(locationAlert.fips);
  const donationContent = getDonationContent(emailAddress);
  const data: AlertTemplateData = {
    change: changeText(oldLevel, newLevel),
    location_name: locationName,
    img_alt: `Image depicting that ${locationName} went from ${oldLevelText} to ${newLevelText}`,
    img_url: `${thermometerBaseURL}/therm-${newLevel}-${oldLevel}.png`,
    last_updated: lastUpdated,
    location_url: `${locationURL}?utm_source=risk_alerts&utm_medium=email`,
    subscribe_link: `https://covidactnow.org/alert_signup?utm_campaign=risk_alert_forward_subscribe&utm_source=risk_alerts&utm_medium=email`,
    unsubscribe_link: `${unsubscribeURL}?email=${encodeURIComponent(
      emailAddress,
    )}`, // would be nice to know dev/staging/prod
    feedback_subject_line: encodeURIComponent(
      `[Alert Feedback] Alert for ${locationName} on ${lastUpdated}`,
    ),
    disclaimer,
    donationUrl: donationContent.donationUrl,
    donationText: donationContent.donationText,
  };

  return alertTemplate(data);
}

function changeText(oldLevel: Level, newLevel: Level) {
  if (oldLevel === Level.UNKNOWN) {
    return 'new community risk level';
  } else if (oldLevel < newLevel) {
    return 'community risk level increased';
  } else {
    return 'community risk level decreased';
  }
}

export function generateAlertEmailData(
  emailAddress: string,
  locationAlert: Alert,
) {
  const { locationName } = locationAlert;
  const htmlContent = generateAlertEmailContent(emailAddress, locationAlert);
  const subjectLine = `${locationName}'s Community Risk Level Has Changed`;

  return {
    Subject: subjectLine,
    To: [emailAddress],
    Html: htmlContent,
    From: 'Covid Act Now Alerts <noreply@covidactnow.org>',
    ReplyTo: 'noreply@covidactnow.org',
    Group: `${ALERT_EMAIL_GROUP_PREFIX}_${toISO8601(new Date())}`,
  };
}

export function readAlerts(filePath: string): { [fips: string]: Alert } {
  const rawdata = fs.readFileSync(filePath, 'utf8');
  const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);
  return locationsWithAlerts;
}

export async function resolveSnapshot(snapshotId: string): Promise<number> {
  if (snapshotId === 'auto') {
    const snap = await fetchMainSnapshotNumber();
    console.log(`Resolved 'auto' snapshot to ${snap}.`);
    return snap;
  } else {
    const snap = parseInt(snapshotId);
    if (Number.isFinite(snap)) {
      return snap;
    } else {
      throw new Error('Invalid snapshot ID: ' + snapshotId);
    }
  }
}
