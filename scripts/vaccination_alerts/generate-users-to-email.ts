import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { getFirestore } from '../common/firebase';

/**
 *
 */
const alertsFilePath = path.join(__dirname, 'vaccination-alerts.json');

async function main() {
  // get locations from file
  // Check for the file
  const vaccineAlerts = fs.readFileSync(alertsFilePath, 'utf8');
  const vaccineAlertsInfo = JSON.parse(vaccineAlerts);

  const fipsUpdated = _.keys(vaccineAlertsInfo);

  console.log(vaccineAlertsInfo);

  // query subscriptions using streaming
  // if the user is part of locations to update, save the document
  // process documents to create (user, state) pairs
  // update Firestore collection
  const db = await getFirestore();

  const docList: [] = [];

  db.collection('alerts-subscriptions')
    .limit(10)
    .stream()
    .on('data', docSnapshot => {
      const { locations } = docSnapshot.data();
      const email = docSnapshot.id;
      console.log(`${email}: ${locations.join(', ')}`);

      // should we email?
      // fipsCode in vaccine-alerts.json
    })
    .on('end', () => {
      console.log('Done');
    });
}

if (require.main === module) {
  main();
}
