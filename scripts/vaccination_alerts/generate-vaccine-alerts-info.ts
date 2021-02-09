import path from 'path';
import fs from 'fs';
import {
  getCmsVaccinationInfo,
  getFirebaseVaccinationInfo,
  getUpdatedVaccinationInfo,
} from './utils';

/**
 * Generates the `vaccination-alerts.json` file with a map of locations that
 * have updated vaccination information.
 *
 * Run via: yarn vaccinations-generate-alerts
 */

const alertsFilePath = path.join(__dirname, 'vaccination-alerts.json');

async function main() {
  const cmsInfo = getCmsVaccinationInfo();
  const firebaseInfo = await getFirebaseVaccinationInfo();

  const vaccinationAlertUpdates = getUpdatedVaccinationInfo(
    cmsInfo,
    firebaseInfo,
  );

  fs.writeFileSync(alertsFilePath, JSON.stringify(vaccinationAlertUpdates));
}

if (require.main === module) {
  main()
    .then(() => {
      console.log(`Done. Generated ${alertsFilePath}`);
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(-1);
    });
}
