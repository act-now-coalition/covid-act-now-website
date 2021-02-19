import { Environment, getEnvironment } from './utils/environment';

const ENV_CONFIG: { [env in Environment]: object } = {
  [Environment.DEV]: {
    apiKey: 'AIzaSyAVXpij-SHmn4ax49eE4c4-ArukSdeWXT4',
    authDomain: 'covidactnow-dev.firebaseapp.com',
    databaseURL: 'https://covidactnow-dev.firebaseio.com',
    projectId: 'covidactnow-dev',
    storageBucket: 'covidactnow-dev.appspot.com',
    messagingSenderId: '806080802312',
    appId: '1:806080802312:web:2c5450586dc4160d1babbd',
  },
  [Environment.STAGING]: {
    apiKey: 'AIzaSyALVafHX9LvAvhUFFLO4BWOCtaDV-iGr0Q',
    authDomain: 'covidactnow-staging.firebaseapp.com',
    databaseURL: 'https://covidactnow-staging.firebaseio.com',
    projectId: 'covidactnow-staging',
    storageBucket: 'covidactnow-staging.appspot.com',
    messagingSenderId: '435415023896',
    appId: '1:435415023896:web:cfb18cf373f40606f01e6d',
  },
  [Environment.PROD]: {
    apiKey: 'AIzaSyCKSkEkpoegqzosrFev3V0kVT4diti1GvA',
    authDomain: 'covidactnow-prod.firebaseapp.com',
    databaseURL: 'https://covidactnow-prod.firebaseio.com',
    projectId: 'covidactnow-prod',
    storageBucket: 'covidactnow-prod.appspot.com',
    messagingSenderId: '850795849376',
    appId: '1:850795849376:web:865cba0a94dd726f768bc5',
  },
};

/** Dynamically imports the firebase modules. */
async function firebaseModule(): Promise<typeof firebase> {
  // We have to load firestore too even though we only use it indirectly through
  // the firebase/app module.
  const [firebase] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ]);
  return firebase;
}

let firebaseApp: Promise<firebase.app.App> | null = null;
async function getFirebase(): Promise<firebase.app.App> {
  if (!firebaseApp) {
    const config = ENV_CONFIG[getEnvironment()];
    firebaseApp = firebaseModule().then(firebase => {
      firebase.initializeApp(config);
      return firebase.app();
    });
  }
  return firebaseApp;
}

export async function getFirestore(): Promise<firebase.firestore.Firestore> {
  const firebase = await getFirebase();
  return firebase.firestore();
}

export async function getFirestoreFieldValue(): Promise<
  typeof firebase.firestore.FieldValue
> {
  const firebase = await firebaseModule();
  return firebase.firestore.FieldValue;
}
