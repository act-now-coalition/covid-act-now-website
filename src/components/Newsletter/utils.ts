import { getFirebase, firebase } from 'common/firebase';
import { Region, County } from 'common/regions';

export function getDefaultRegions(region: Region): Region[] {
  return region instanceof County ? [region, region.state] : [region];
}

export function subscribeToLocations(emailAddress: string, fipsList: string[]) {
  // Merge the locations with any existing ones since that's _probably_ what the user wants.
  return getFirebase()
    .firestore()
    .collection('alerts-subscriptions')
    .doc(emailAddress.toLocaleLowerCase())
    .set(
      {
        locations: firebase.firestore.FieldValue.arrayUnion(...fipsList),
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}
