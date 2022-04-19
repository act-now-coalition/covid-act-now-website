/**
 * Generates a CSV file with the email addresses of all the subscribers to
 * the alert emails.
 *
 * In order to run the script, you need to have a valid Google service account
 * file in the `scripts/common/firebase` directory. Make sure that the file
 * corresponds to the environment that you want to use to run the script.
 *
 * Usage:
 *
 *    yarn generate-subscriber-emails-file
 */
import fs from 'fs';
import _ from 'lodash';
import { fetchAllAlertSubscriptions } from '../alert_emails/firestore';
import { getFirestore } from '../common/firebase';
import { isValidEmail } from '../../src/common/utils';

async function main() {
  const db = getFirestore();
  const subscriptions = await fetchAllAlertSubscriptions(db);
  const emailsCsvColumn = subscriptions
    .map(s => s.email)
    .filter(isValidEmail)
    .join('\n');

  fs.writeFileSync('subscriber-emails.csv', emailsCsvColumn);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
