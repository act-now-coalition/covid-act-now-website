import { getFirebase, firebase } from 'common/firebase';
import { Region, County } from 'common/regions';
import { getGeolocatedRegions } from 'common/regions/utils';

export function getDefaultRegions(region: Region): Region[] {
  if (region instanceof County) {
    return [region, region.state];
  } else {
    return [region];
  }
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

const CREATESEND_DATA_ID =
  '2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446E';

export async function subscribeToDailyDownload(emailAddress: string) {
  let url = new URL('https://createsend.com/t/getsecuresubscribelink');
  url.searchParams.append('email', emailAddress);
  url.searchParams.append('data', CREATESEND_DATA_ID);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });

  return response.text();
}

// // Since we didn't use the Campaign Monitor signup form we need to show our
// // own confirmation UI (just change the button text/color for 3sec).
// this.setState({ showConfirmationText: true });
// setTimeout(() => {
//   this.setState({ showConfirmationText: false });
// }, 3000);
