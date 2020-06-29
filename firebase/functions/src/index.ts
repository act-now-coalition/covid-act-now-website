import * as functions from 'firebase-functions';
import * as firestore from '@google-cloud/firestore';


const client = new firestore.v1.FirestoreAdminClient();

const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
const bucket = `gs://firestore-backups-${projectId}`;

exports.scheduledFirestoreExport = functions.pubsub
                                            .schedule('every 24 hours')
                                            .onRun((context) => {

  const databaseName =
    client.databasePath(projectId, '(default)');

  return client.exportDocuments({
    name: databaseName,
    outputUriPrefix: bucket,
    // Leave collectionIds empty to export all collections
    // or set to a list of collection IDs to export,
    // collectionIds: ['users', 'posts']
    collectionIds: []
    })
  .then((responses: any) => {
    const response = responses[0];
    console.log(`Operation Name: ${response['name']}`);
  })
  .catch((err: any) => {
    console.error(err);
    throw new Error('Export operation failed');
  });
});
