//@ts-ignore createsend has no types and throws an error
import * as Handlebars from 'handlebars';
import admin from 'firebase-admin';
import fs from 'fs-extra';
import path from 'path';
import { Alert } from './interfaces';
import { getFirestore } from './firestore';
import { Level } from '../../src/common/level';
import CreateSend, { EmailSendData } from './createsend';

interface CampaignMonitorError {
  Code: number;
  Message: string;
}

const CM_INVALID_EMAIL_MESSAGE = 'A valid recipient address is required';
const CM_INVALID_EMAIL_ERROR_CODE = 1;

const alertTemplate = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
);

function generateSendData(
  userToEmail: string,
  alertForLocation: Alert,
): EmailSendData {
  const base_url = 'https://data.covidactnow.org/thermometer_screenshot';
  const html = alertTemplate({
    change:
      alertForLocation.newLevel < alertForLocation.oldLevel
        ? 'risk decreased'
        : 'risk increased',
    location_name: alertForLocation.locationName,
    img_alt: `Image depicting that the state went from from state ${
      Level[alertForLocation.oldLevel]
    } to ${Level[alertForLocation.newLevel]}`,
    img_url: `${base_url}/therm-${alertForLocation.newLevel}-${alertForLocation.oldLevel}.png`,
    last_updated: alertForLocation.lastUpdated,
    location_url: alertForLocation.locationURL,
    unsubscribe_link: `https://covidactnow.org/alert_unsubscribe?email=${encodeURI(
      userToEmail,
    )}`, // would be nice to know dev/staging/prod
    feedback_subject_line: encodeURI(
      `[Alert Feedback] Alert for ${alertForLocation.locationName} on ${alertForLocation.lastUpdated}`,
    ),
  });
  const subject = `${alertForLocation.locationName}'s Risk Level Has Changed`;

  return {
    Subject: subject,
    To: [userToEmail],
    CC: null,
    BCC: null,
    Attachments: null,
    Html: html,
    Text: html,
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

async function setLastSnapshotNumber(
  firestore: FirebaseFirestore.Firestore,
  snapshot: string,
) {
  await firestore.doc('info/alerts').set({
    lastSnapshot: snapshot,
  });
  console.log(`Set lastsnapshot to be ${snapshot}`);
}

/**
 * Given a list of users to email and a list of locations, email those
 * users with alert information about those locations.
 *
 * Takes in a file with {[fips: string]: {...data}} and file like {[fips: string]: [emails]}
 *
 * Also takes in a parameter to actual send the email. Otherwise will just generate the files
 *
 * You can run via `yarn send-emails fipsToAlertFilename currentSnapshot [send]`
 */
(async () => {
  const outputFolder = path.join(__dirname);
  await fs.ensureDir(outputFolder);

  const {
    fipsToAlertFilename,
    currentSnapshot,
    dryRun,
    sendAllToEmail,
  } = await parseArgs();
  const alertPath = path.join(outputFolder, fipsToAlertFilename);

  const rawdata = fs.readFileSync(alertPath, 'utf8');
  const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);

  // TODO: maybe oauth here and add secrets into github.
  const createSend = new CreateSend(process.env.CREATE_SEND_TOKEN);
  let emailSent = 0;
  let errorCount = 0;
  let invalidEmailCount = 0;
  const uniqueEmailAddress: { [email: string]: number } = {};
  const locationsWithEmails: { [fips: string]: number } = {};

  const db = getFirestore();
  for (const fips of Object.keys(locationsWithAlerts)) {
    await db
      .collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`)
      .where('sentAt', '==', null)
      .get()
      .then(async querySnapshot => {
        for (const doc of querySnapshot.docs) {
          const userToEmail = sendAllToEmail ? sendAllToEmail : doc.id;
          const locationAlert = locationsWithAlerts[fips];
          const emailData = generateSendData(userToEmail, locationAlert);
          await createSend
            .sendClassicEmail(emailData)
            .then(async result => {
              emailSent += 1;
              uniqueEmailAddress[doc.id] =
                (uniqueEmailAddress[doc.id] || 0) + 1;
              locationsWithEmails[fips] = (locationsWithEmails[fips] || 0) + 1;
              if (dryRun) return;
              // Comment out this code if you are developing locally
              await db
                .collection(
                  `snapshots/${currentSnapshot}/locations/${fips}/emails/`,
                )
                .doc(doc.id)
                .set({
                  sentAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            })
            .catch(async (err: CampaignMonitorError) => {
              // if the email is invalid, move the document to the invalid collection
              if (
                err.Code === CM_INVALID_EMAIL_ERROR_CODE &&
                err.Message === CM_INVALID_EMAIL_MESSAGE
              ) {
                invalidEmailCount += 1;
                const currentData = (
                  await db.collection('alerts-subscriptions').doc(doc.id).get()
                ).data();
                if (currentData) {
                  await db
                    .collection('invalid-alerts-subscriptions')
                    .doc(doc.id)
                    .set(currentData);
                  await db
                    .collection('alerts-subscriptions')
                    .doc(doc.id)
                    .delete();
                }
              } else {
                errorCount += 1;
              }
            });
        }
      });
  }
  console.log(
    `Total Emails to be sent: ${emailSent}. Total locations with emails: ${
      Object.keys(locationsWithEmails).length
    }. Unique Email addresses: ${
      Object.keys(uniqueEmailAddress).length
    }. Invalid emails removed: ${invalidEmailCount}`,
  );

  if (!dryRun) {
    setLastSnapshotNumber(db, currentSnapshot);
    // If we aren't in a dry run but there's clearly some non trivial errors exit with error
    if (emailSent < 1 || errorCount > 1) {
      console.log(
        `Error count: ${errorCount}. Emails sent: ${emailSent}. Invalid emails removed: ${invalidEmailCount}`,
      );
      process.exit(-1);
    }
  }
  console.log(`Done.`);
})();

async function parseArgs(): Promise<{
  fipsToAlertFilename: string;
  currentSnapshot: string;
  dryRun: boolean;
  sendAllToEmail?: string;
}> {
  const args = process.argv.slice(2);

  if (args.length < 2 || args.length > 4) {
    exitWithUsage();
  } else {
    const fipsToAlertFilename = args[0];
    const currentSnapshot = args[1];
    const isSend = (args[2] || 'false') === 'true';
    const sendAllToEmail = args[3] || undefined;
    return {
      fipsToAlertFilename,
      currentSnapshot,
      dryRun: !isSend,
      sendAllToEmail,
    };
  }
}

function exitWithUsage(): never {
  console.log(
    'Usage: yarn send-emails fipsToAlertFilename currentSnapshot [send] [sendAllToEmail]',
  );
  process.exit(-1);
}
