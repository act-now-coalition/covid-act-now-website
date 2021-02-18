import { getFirestore, getFirestoreFieldValue } from 'common/firebase';
import { Region, County, MetroArea } from 'common/regions';

export function getDefaultRegions(region: Region): Region[] {
  if (region instanceof MetroArea) {
    return [region, ...region.states];
  }
  if (region instanceof County) {
    return [region, region.state];
  } else {
    return [region];
  }
}

export async function subscribeToLocations(
  emailAddress: string,
  fipsList: string[],
) {
  // Merge the locations with any existing ones since that's _probably_ what the user wants.
  const firestore = await getFirestore();
  const FieldValue = await getFirestoreFieldValue();
  return firestore
    .collection('alerts-subscriptions')
    .doc(emailAddress.toLocaleLowerCase())
    .set(
      {
        locations: FieldValue.arrayUnion(...fipsList),
        subscribedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}

export const CREATESEND_DATA_ID =
  '2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446E';

export async function subscribeToDailyDownload(emailAddress: string) {
  let url = new URL('https://createsend.com/t/getsecuresubscribelink');
  url.searchParams.append('email', encodeURIComponent(emailAddress));
  url.searchParams.append('data', CREATESEND_DATA_ID);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });

  return response.text();
}
