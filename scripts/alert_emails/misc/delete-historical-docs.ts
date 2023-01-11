/**
 * Script to go through all the historical sent emails in Firestore and delete
 * them to save space.
 */

import { getFirestore } from '../../common/firebase';

// Number of documents to read and delete at once (500 is the max batch size in
// Firestore).
const BATCH_SIZE = 500;

async function main() {
  const db = getFirestore();

  let moreToDelete = true;
  let totalDeleted = 0;
  while (moreToDelete) {
    const querySnapshot = await db
      .collectionGroup('emails')
      .limit(BATCH_SIZE)
      .get();

    const batch = db.batch();
    for (const doc of querySnapshot.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();
    const deleted = querySnapshot.docs.length;
    totalDeleted += deleted;
    moreToDelete = deleted > 0;
  }

  console.info(`Done. Deleted ${totalDeleted} documents.`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
