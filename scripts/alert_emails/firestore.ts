import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const ALERTS_SUBSCRIPTIONS = 'alerts-subscriptions';

export function getFirestore(): FirebaseFirestore.Firestore {
  // NOTE: An appropriate service account key should automatically exist when
  // running in the github actions workflow.
  const serviceAccountFile = path.join(
    __dirname,
    'google-service-account.json',
  );
  if (!fs.existsSync(serviceAccountFile)) {
    console.error(`File not found: ${serviceAccountFile}`);
    console.error(
      'If you are testing locally, you can use the covidactnow-dev service account found here:',
    );
    console.error(
      'https://docs.google.com/document/d/1YoZUzmy6rYXwO1VSMrHklcD7pdCCLaOkGG-1kLwZpsg/edit',
    );
    process.exit(-1);
  }
  let serviceAccount = require(serviceAccountFile);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return admin.firestore();
}

export interface FipsEmail {
  fips: string;
  email: string;
}

export async function fetchAllAlertSubscriptions(
  db: FirebaseFirestore.Firestore,
): Promise<FipsEmail[]> {
  return new Promise(function (resolve, reject) {
    const subscriptions: FipsEmail[] = [];
    db.collection(ALERTS_SUBSCRIPTIONS)
      .stream()
      .on('data', emailDoc => {
        const { locations } = emailDoc.data();
        locations.forEach((fips: string) => {
          subscriptions.push({ fips, email: emailDoc.id });
        });
      })
      .on('end', () => {
        resolve(subscriptions);
      })
      .on('error', reject);
  });
}
