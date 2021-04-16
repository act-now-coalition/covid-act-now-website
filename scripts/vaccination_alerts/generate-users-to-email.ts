import * as yargs from 'yargs';
import regions, { FipsCode } from '../../src/common/regions';
import { RegionVaccinePhaseInfo } from '../../src/cms-content/vaccines/phases';
import {
  EmailFips,
  getLocationsToAlert,
  readVaccinationAlerts,
  groupByFips,
  DEFAULT_ALERTS_FILE_PATH,
  getStateFipsCodesSet,
} from './utils';
import FirestoreSubscriptions from './firestore-subscriptions';

const buildEmailsToAlertByFips = (
  fipsCodesToAlert: FipsCode[],
  alertSubscriptions: FirebaseFirestore.QuerySnapshot<
    FirebaseFirestore.DocumentData
  >,
) => {
  const emailFipsList: EmailFips[] = [];

  alertSubscriptions.forEach(emailLocationsDoc => {
    const email = emailLocationsDoc.id;
    const { locations } = emailLocationsDoc.data();

    // Currently only alerting on states, so pull state fips codes from subscribed locations.
    const subscribedStateFips = getStateFipsCodesSet(locations);

    const userFipsToAlert = subscribedStateFips
      .intersection(fipsCodesToAlert)
      .value();

    emailFipsList.push(
      ...userFipsToAlert.map(fips => [email, fips] as EmailFips),
    );
  });

  // Once we have a list of all the [email, fipsCode] pairs to email, we group them
  // by fipsCode and update the collection with vaccination alerts.
  return groupByFips(emailFipsList);
};

// Adds blank sent records for each email for given alert to Firebase
const markEmailAlertsToSend = async (
  firestoreSubscriptions: FirestoreSubscriptions,
  alert: RegionVaccinePhaseInfo,
  emails: string[],
) => {
  const { fips, emailAlertVersion } = alert;
  await Promise.all(
    emails.map(async (email: string) => {
      await firestoreSubscriptions.markEmailToSend(
        fips,
        emailAlertVersion,
        email,
      );
    }),
  );
};

/**
 * Given a `vaccination-alerts.json` file, determines the locations and users
 * subscribed to alerts on those locations that will need to be notified of
 * vaccination information updates.
 *
 * 1. Determine the list of states with updated vaccination information using the
 *    information in `vaccination-alerts.json`.
 *
 * 2. For each user, determine the list of states that cover the locations that
 *    the user is subscribed to and that have vaccination updates.
 *
 * 3. Update the Firebase collection that contains the list of users to email for
 *    each state and vaccination information version.
 */

async function main(alertsFilePath: string) {
  const firestoreSubscriptions = new FirestoreSubscriptions();

  const vaccinationAlertsInfo = readVaccinationAlerts(alertsFilePath);
  const locationsToAlert = getLocationsToAlert(vaccinationAlertsInfo);
  const alertSubscriptions = await firestoreSubscriptions.getAlertSubscriptions();

  const emailsToAlertByFips = buildEmailsToAlertByFips(
    locationsToAlert,
    alertSubscriptions,
  );

  console.info(
    `Locations to alert: ${locationsToAlert
      .map(fips => regions.findByFipsCode(fips)?.name ?? fips)
      .join(', ')}`,
  );

  let totalEmailsToSend = 0;
  for (const [fipsCode, emails] of Object.entries(emailsToAlertByFips)) {
    const updatedAlert = vaccinationAlertsInfo[fipsCode];
    try {
      totalEmailsToSend += emails.length;
      await markEmailAlertsToSend(firestoreSubscriptions, updatedAlert, emails);
    } catch (err) {
      console.error(`Error updating emails for location ${fipsCode}`, err);
      process.exit(1);
    }
  }

  console.info(
    `Recorded ${totalEmailsToSend} total emails to be sent in Firebase.`,
  );
}

if (require.main === module) {
  const argv = yargs.options({
    input: {
      default: DEFAULT_ALERTS_FILE_PATH,
      description: 'Updated alerts input path.',
    },
  }).argv;

  main(argv.input)
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
