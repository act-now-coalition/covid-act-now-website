import path from 'path';
import fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import { Alert } from './interfaces';
import { Level } from '../../src/common/level';

const UNSUBSCRIBE_URL = 'https://covidactnow.org/alert_unsubscribe';
const THERMOMETER_BASE_URL =
  'https://data.covidactnow.org/thermometer_screenshot';

const emailTemplate = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
);

export interface AlertEmailTemplateData {
  change: string;
  location_name: string;
  img_alt: string;
  img_url: string;
  last_updated: string;
  location_url: string;
  unsubscribe_link: string;
  feedback_subject_line: string;
}

const generateAlertEmailContent = (data: AlertEmailTemplateData) =>
  emailTemplate(data);

export const getSubjectLine = (locationAlert: Alert) =>
  `${locationAlert.locationName}'s Risk Level Has Changed`;

export const getEmailContent = (emailAddress: string, locationAlert: Alert) => {
  const {
    locationName,
    newLevel,
    oldLevel,
    lastUpdated,
    locationURL,
  } = locationAlert;

  const data = {
    change: newLevel < oldLevel ? 'risk decreased' : 'risk increased',
    location_name: locationName,
    img_alt: `Image depicting that ${locationName} went from from level ${Level[oldLevel]} to ${Level[newLevel]}`,
    img_url: `${THERMOMETER_BASE_URL}/therm-${newLevel}-${oldLevel}.png`,
    last_updated: lastUpdated,
    location_url: locationURL,
    unsubscribe_link: `${UNSUBSCRIBE_URL}?email=${encodeURI(emailAddress)}`,
    feedback_subject_line: `[Alert Feedback] Alert for ${locationName} on ${lastUpdated}`,
  };

  return generateAlertEmailContent(data);
};

export const generateAlertEmailData = (
  emailTo: string,
  subject: string,
  htmlContent: string,
) => {
  return {
    Subject: subject,
    To: [emailTo],
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
    Group: null,
    ConsentToTrack: 'Unchanged',
  };
};
