import _ from 'lodash';
import { fetchAllAlertSubscriptions } from '../alert_emails/firestore';
import { getFirestore } from '../common/firebase';

async function main() {
  const db = getFirestore();
  const subscriptions = await fetchAllAlertSubscriptions(db);
  const fs = require('fs');
  const output = subscriptions.map(s => s.email).join(',');
  fs.writeFileSync('subscriber-emails.csv', output);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
