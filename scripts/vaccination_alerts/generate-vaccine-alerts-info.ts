import path from 'path';
import fs from 'fs';
import {
  getCmsVaccinationInfo,
  getFirebaseVaccinationInfo,
  getUpdatedVaccinationInfo,
  DEFAULT_ALERTS_FILE_PATH,
} from './utils';

import * as yargs from 'yargs';

/**
 * Generates the `vaccination-alerts.json` file with a map of locations that
 * have updated vaccination information.
 *
 * Run via: yarn vaccinations-generate-alerts
 */

async function main(alertsFilePath: string) {
  console.log('Loading latest alerts from cms data');
  const cmsInfo = getCmsVaccinationInfo();

  console.log('Reading latest alerts sent from Firebase');
  const firebaseInfo = await getFirebaseVaccinationInfo();

  console.log('Getting snapshot of alerts to send');
  const vaccinationAlertUpdates = getUpdatedVaccinationInfo(
    cmsInfo,
    firebaseInfo,
  );

  for (const fips of Object.keys(vaccinationAlertUpdates)) {
    const previous = firebaseInfo[fips];
    const current = vaccinationAlertUpdates[fips];
    console.log(
      `New alert for ${current.locationName}: ${
        previous?.emailAlertVersion ?? 'None'
      } -> ${current.emailAlertVersion}`,
    );
  }
  console.log(`Saving alert snapshot to ${alertsFilePath}`);
  fs.writeFileSync(
    alertsFilePath,
    JSON.stringify(vaccinationAlertUpdates, null, 2),
  );
}

if (require.main === module) {
  const argv = yargs.options({
    path: {
      default: DEFAULT_ALERTS_FILE_PATH,
      description: 'Output path.',
    },
  }).argv;

  main(argv.path)
    .then(() => {
      console.log(`Done. Generated `);
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(-1);
    });
}
