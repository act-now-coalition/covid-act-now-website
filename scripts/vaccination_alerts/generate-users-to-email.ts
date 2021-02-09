import _ from 'lodash';
import { getFirestore } from '../common/firebase';
import { GrpcStatus as FirestoreErrorCode } from '@google-cloud/firestore';
import {
  EmailFips,
  getLocationsToAlert,
  readVaccinationAlerts,
  getUserLocationsToAlert,
  groupByFips,
} from './utils';

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

async function main() {
  const vaccinationAlertsInfo = readVaccinationAlerts();

  // Deterime the list of locations with updated vaccination infromation.
  const locationsToAlert = getLocationsToAlert(vaccinationAlertsInfo);

  const db = await getFirestore();
  const alertSubscriptions = await db.collection('alerts-subscriptions').get();

  const emailFipsList: EmailFips[] = [];
  alertSubscriptions.forEach(emailLocationsDoc => {
    const { locations } = emailLocationsDoc.data();

    // We get the list of all the locations for each user, get the state of
    // each location and find which states have updated vaccination information.
    const userFipsToAlert = getUserLocationsToAlert(
      locations,
      locationsToAlert,
    );

    // If the user is subscribed to locations with updates, we add a pair with
    // [email, fipsCode] to `emailFipsList` for each state.
    userFipsToAlert.forEach(fipsCode => {
      emailFipsList.push([emailLocationsDoc.id, fipsCode]);
    });
  });

  // Once we have a list of all the [email, fipsCode] pairs to email, we group them
  // by fipsCode and update the collection with vaccination alerts.
  const groupedByFips = groupByFips(emailFipsList);

  for (const [fipsCode, emailList] of Object.entries(groupedByFips)) {
    const { emailAlertVersion } = vaccinationAlertsInfo[fipsCode];

    try {
      await Promise.all(
        emailList.map(async (email: string) => {
          try {
            const docPath = `${fipsCode}/emailVersions/${emailAlertVersion}/emails/${email}`;
            await db
              .collection('vaccination-alerts')
              .doc(docPath)
              .create({ sentAt: null });
          } catch (updateError) {
            // We don't want to overwrite existing emails for a location to avoid double-sending
            // alerts, in case this is a re-run of the vaccination alerts workflow
            if (updateError.code !== FirestoreErrorCode.ALREADY_EXISTS) {
              throw updateError;
            }
          }
        }),
      );
    } catch (err) {
      console.error(`Error updating emails for location ${fipsCode}`, err);
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
