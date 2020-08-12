import path from 'path';
import fs from 'fs-extra';
import moment from 'moment';
import * as Handlebars from 'handlebars';
import moment from 'moment';
import { Alert } from './interfaces';
import { Level } from '../../src/common/level';

export const ALERT_EMAIL_GROUP_PREFIX = 'Alert Email';

const thermometerBaseURL =
  'https://data.covidactnow.org/thermometer_screenshot';
const unsubscribeURL = 'https://covidactnow.org/alert_unsubscribe';

export function toISO8601(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
}

const alertTemplate = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
);

interface AlertTemplateData {
  change: string;
  location_name: string;
  img_alt: string;
  img_url: string;
  last_updated: string;
  location_url: string;
  unsubscribe_link: string;
  feedback_subject_line: string;
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

  const data: AlertTemplateData = {
    change: changeText(oldLevel, newLevel),
    location_name: locationName,
    img_alt: `Image depicting that ${locationName} went from level ${Level[oldLevel]} to ${Level[newLevel]}`,
    img_url: `${thermometerBaseURL}/therm-${newLevel}-${oldLevel}.png`,
    last_updated: lastUpdated,
    location_url: locationURL,
    unsubscribe_link: `${unsubscribeURL}?email=${encodeURI(emailAddress)}`, // would be nice to know dev/staging/prod
    feedback_subject_line: encodeURI(
      `[Alert Feedback] Alert for ${locationName} on ${lastUpdated}`,
    ),
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
    CC: null,
    BCC: null,
    Attachments: null,
    Html: htmlContent,
    Text: htmlContent,
    AddRecipientsToList: null,
    From: 'Covid Act Now Alerts <noreply@covidactnow.org>',
    ReplyTo: 'noreply@covidactnow.org',
    TrackOpens: true,
    TrackClicks: true,
    InlineCSS: true,
    Group: `${ALERT_EMAIL_GROUP_PREFIX} - ${toISO8601(new Date())}`,
    ConsentToTrack: 'Unchanged',
  };
}

export function readAlerts(filePath: string): { [fips: string]: Alert } {
  const rawdata = fs.readFileSync(filePath, 'utf8');
  const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);
  return locationsWithAlerts;
}
