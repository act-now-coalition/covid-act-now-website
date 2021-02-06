import path from 'path';
import fs from 'fs';
import admin from 'firebase-admin';

export function getFirestore(): FirebaseFirestore.Firestore {
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
