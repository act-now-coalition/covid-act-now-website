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
