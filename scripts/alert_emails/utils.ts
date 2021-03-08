import path from 'path';
import fs from 'fs-extra';
import moment from 'moment';
import * as Handlebars from 'handlebars';
import { Alert } from './interfaces';
import { Level } from '../../src/common/level';
import regions from '../../src/common/regions';
import { LOCATION_SUMMARY_LEVELS } from '../../src/common/metrics/location_summary';
import { fetchMainSnapshotNumber } from '../../src/common/utils/snapshots';

export const ALERT_EMAIL_GROUP_PREFIX = 'alert-email';

const thermometerBaseURL =
  'https://data.covidactnow.org/thermometer_screenshot';
const unsubscribeURL = 'https://covidactnow.org/alert_unsubscribe';

export function toISO8601(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
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
  unsubscribe_link: string;
  feedback_subject_line: string;
  disclaimer: Disclaimer | null;
}

const texasFipsCodes = [
  '48',
  ...regions
    .findCountiesAndMetrosByStateCode('TX')
    .map(region => region.fipsCode),
];
function getDisclaimerText(fips: string): Disclaimer | null {
  /* Add any necessary disclaimers here, e.g.:
  if (texasFipsCodes.includes(fips)) {
    return {
      name: 'NOTICE: Texas Winter Weather',
      text:
        'In February 2021, Texas experienced extreme winter weather that impacted many ' +
        'aspects of daily life, including COVID testing. We expect it to take some time for ' +
        'testing to recover. In the meantime, our metrics and risk levels should be ' +
        'treated with caution.',
    };
  }
  */

  return null;
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
  const data: AlertTemplateData = {
    change: changeText(oldLevel, newLevel),
    location_name: locationName,
    img_alt: `Image depicting that ${locationName} went from "${oldLevelText}" to "${newLevelText}"`,
    img_url: `${thermometerBaseURL}/therm-${newLevel}-${oldLevel}.png`,
    last_updated: lastUpdated,
    location_url: locationURL,
    unsubscribe_link: `${unsubscribeURL}?email=${encodeURI(emailAddress)}`, // would be nice to know dev/staging/prod
    feedback_subject_line: encodeURI(
      `[Alert Feedback] Alert for ${locationName} on ${lastUpdated}`,
    ),
    disclaimer,
  };

  return alertTemplate(data);
}

function changeText(oldLevel: Level, newLevel: Level) {
  if (oldLevel === Level.UNKNOWN) {
    return 'new risk score';
  } else if (oldLevel < newLevel) {
    return 'risk increased';
  } else {
    return 'risk decreased';
  }
}

export function generateAlertEmailData(
  emailAddress: string,
  locationAlert: Alert,
) {
  const { locationName } = locationAlert;
  const htmlContent = generateAlertEmailContent(emailAddress, locationAlert);
  const subjectLine = `${locationName}'s Risk Level Has Changed`;

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
