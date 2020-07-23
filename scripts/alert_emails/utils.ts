import path from 'path';
import fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import { Alert } from './interfaces';
import { Level } from '../../src/common/level';

const thermometerBaseURL =
  'https://data.covidactnow.org/thermometer_screenshot';
const unsubscribeURL = 'https://covidactnow.org/alert_unsubscribe';

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
    change: 'new risk score',
    location_name: locationName,
    img_alt: `Image depicting that ${locationName} went from from level ${Level[oldLevel]} to ${Level[newLevel]}`,
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
    Group: 'Alert Email',
    ConsentToTrack: 'Unchanged',
  };
}

export function readAlerts(filePath: string): { [fips: string]: Alert } {
  const rawdata = fs.readFileSync(filePath, 'utf8');
  const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);
  return locationsWithAlerts;
}
