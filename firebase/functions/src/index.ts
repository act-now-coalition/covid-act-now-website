import * as functions from 'firebase-functions';
import firestore from '@google-cloud/firestore';
import * as https from 'https';
import { dynamicWebContentHandler } from './dynamic_web_content';

const client = new firestore.v1.FirestoreAdminClient();

const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
const bucket = `gs://firestore-backups-${projectId}`;

/** Scheduled Firestore Backup. */
exports.scheduledFirestoreExport = functions.pubsub
  .schedule('every 24 hours')
  .onRun(context => {
    const databaseName = client.databasePath(projectId, '(default)');

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
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

/**
 * Firebase Function to handle dynamic requests, in particular (for now) the
 * /share/ image requests.
 */
exports.dynamicWebContent = functions
  .runWith({
    timeoutSeconds: 60,
    memory: '1GB',
  })
  .https.onRequest(dynamicWebContentHandler);

/**
 * Schedule a request for a share image every 4 minutes to try to help keep
 * the function "warm" and avoid slow cold start times.
 */
exports.scheduledScreenshotRequest = functions.pubsub
  .schedule('every 4 minutes')
  .onRun(context => {
    // Fetch an arbitrary share image (CA case growth). Note snapshot id "0"
    // will just use the current snapshot, which is fine.
    const options = {
      hostname: `${projectId}.web.app`,
      port: 443,
      path: '/share/0-123/states/ca/chart/0/export.png?no-cache=true',
      method: 'GET',
    };

    console.log('Triggering scheduled screenshot request.');
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        console.log('Completed. statusCode:', res.statusCode);
        resolve();
      });

      req.on('error', e => {
        console.error(e);
        reject();
      });

      req.end();
    });
  });
