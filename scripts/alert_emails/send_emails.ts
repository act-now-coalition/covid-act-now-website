//@ts-ignore createsend has no types and throws an error
import _ from 'lodash';
import admin from 'firebase-admin';
import path from 'path';
import { getFirestore } from './firestore';
import CampaignMonitor, { CampaignMonitorError } from './campaign-monitor';
import { generateAlertEmailData, readAlerts } from './utils';

interface SendEmailResult {
  MessageID: string;
  Recipient: string;
  Status: string;
  headers: { [key: string]: string };
}

const CM_INVALID_EMAIL_MESSAGE = 'A valid recipient address is required';
const CM_INVALID_EMAIL_ERROR_CODE = 1;

// TODO(michael): Put back to 20.
const BATCH_SIZE = 3;

function isInvalidEmailError(err: CampaignMonitorError) {
  return (
    err.Code === CM_INVALID_EMAIL_ERROR_CODE &&
    err.Message === CM_INVALID_EMAIL_MESSAGE
  );
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
  const {
    fipsToAlertFilename,
    currentSnapshot,
    dryRun,
    sendAllToEmail,
  } = await parseArgs();

  const alertPath = path.join(__dirname, fipsToAlertFilename);
  const alertsByLocation = readAlerts(alertPath);

  let emailSent = 0;
  let errorCount = 0;
  let invalidEmailCount = 0;
  const uniqueEmailAddress: { [email: string]: number } = {};
  const locationsWithEmails: { [fips: string]: number } = {};

  const createSend = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);

  const db = getFirestore();
  const locations = Object.keys(alertsByLocation);

  async function fetchSubscriptionsForLocation(fips: string) {
    const querySnapshot = await db
      .collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`)
      .where('sentAt', '==', null)
      .get();
    return querySnapshot.docs.map(emailDoc => emailDoc.id);
  }

  async function onInvalidEmail(email: string) {
    invalidEmailCount += 1;
    const querySnapshot = await db
      .collection('alerts-subscriptions')
      .doc(email)
      .get();
    const currentData = querySnapshot.data();
    if (currentData) {
      await db
        .collection('invalid-alerts-subscriptions')
        .doc(email)
        .set(currentData);
      await db.collection('alerts-subscriptions').doc(email).delete();
    }
  }

  function updateSentEmailCounters(email: string, fips: string) {
    emailSent += 1;
    uniqueEmailAddress[email] = (uniqueEmailAddress[email] || 0) + 1;
    locationsWithEmails[fips] = (locationsWithEmails[fips] || 0) + 1;
  }

  async function onEmailSent(email: string, fips: string) {
    updateSentEmailCounters(email, fips);
    return db
      .collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`)
      .doc(email)
      .set({ sentAt: admin.firestore.FieldValue.serverTimestamp() });
  }

  async function sendAlertEmail(email: string, fips: string): Promise<void> {
    const locationAlert = alertsByLocation[fips];
    const sendData = generateAlertEmailData(email, locationAlert);

    if (dryRun) {
      updateSentEmailCounters(email, fips);
      return;
    }

    try {
      await createSend.sendClassicEmail(sendData);
      await onEmailSent(email, fips);
    } catch (err) {
      if (isInvalidEmailError(err)) {
        await onInvalidEmail(email);
      } else {
        console.error(`Error sending email ${email}, ${fips}.`, err);
        errorCount += 1;
      }
    }
  }

  const emailFipsTuples = _.flatten(
    await Promise.all(
      locations.map(async fips => {
        const emails = await fetchSubscriptionsForLocation(fips);
        return emails.map(email => [email, fips]);
      }),
    ),
  );

  const emailBatches = _.chunk(emailFipsTuples, BATCH_SIZE);
  for (const batch of emailBatches) {
    await Promise.all(
      batch.map(([email, fips]) => sendAlertEmail(email, fips)),
    );
  }

  console.log(
    `Total Emails to be sent: ${emailSent}.) Total locations with emails: ${
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
      process.exit(1);
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
  process.exit(1);
}
