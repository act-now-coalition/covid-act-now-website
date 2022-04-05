import _ from 'lodash';
import { fetchAllAlertSubscriptions } from '../alert_emails/firestore';
import { getFirestore } from '../common/firebase';

async function main() {
  const db = getFirestore();
  const subscriptions = await fetchAllAlertSubscriptions(db);
  const fs = require('fs');
  let output = '';
  subscriptions.map(subscription => {
    output = output.concat(subscription.email, ',');
  });
  fs.writeFileSync('subscriber-emails.txt', output);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
