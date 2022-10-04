import _ from 'lodash';
import { getFirestore } from '../common/firebase';
import FirebaseFirestore from '@google-cloud/firestore';
import * as fs from 'fs';
import * as path from 'path';

const RECIPIENTS_FILE = path.join(__dirname, 'recipients.json');
const BATCH_SIZE = 50000;

async function main() {
  let emailsSent = 0;
  //const recipientsList = JSON.parse(fs.readFileSync(RECIPIENTS_FILE).toString());
  const recipientsList: string[] = [];
  let recipients = new Set(recipientsList);

  const db = getFirestore();

  let startAfter: string | undefined = undefined;
  let foundDocs = true;
  while (foundDocs) {
    foundDocs = false;
    let query = db
      .collectionGroup('emails')
      .orderBy(FirebaseFirestore.FieldPath.documentId());
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    query = query.limit(BATCH_SIZE);

    await new Promise((resolve, reject) => {
      query
        .stream()
        .on('data', (doc: FirebaseFirestore.DocumentSnapshot) => {
          startAfter = doc.ref.path;
          foundDocs = true;
          if (doc.get('sentAt') === null) {
            return;
          }
          emailsSent++;
          const email = doc.id;
          recipients.add(email);
        })
        .on('end', () => {
          console.log(
            `${startAfter}: Counted ${emailsSent} emails to ${recipients.size} recipients.`,
          );
          fs.writeFileSync(
            RECIPIENTS_FILE,
            JSON.stringify(Array.from(recipients)),
          );
          resolve(undefined);
        })
        .on('error', e => {
          console.error(e);
          reject(e);
        });
    });
  }

  console.info(`Done.`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
