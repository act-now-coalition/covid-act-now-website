import { getFirebase } from 'common/firebase';
import { isEqual, pickBy } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const firestore = getFirebase().firestore();
const collection = firestore.collection('shared-component-params');
const nextIdDocRef = collection.doc('__nextId');

type Params = { [key: string]: any };

type ComponentName = 'compare' | 'explore';

// A cache of component params that we have (or are) storing to Firestore. This
// allows components to be a bit sloppy and call storeSharedComponentParams()
// multiple times for the same params without triggering extra Firestore
// requests and multiple share IDs generated.
const storedComponentParams: Array<{
  id: Promise<string>;
  params: Params;
}> = [];

/**
 * Stores the provided params to Firestore (and associates them with the
 * specific componentName).
 *
 * Returns an assigned component share ID that will correspond to the stored
 * params going forward.
 */
export async function storeSharedComponentParams(
  componentName: ComponentName,
  params: Params,
): Promise<string> {
  // Add the componentName and filter out any undefined values, since Firestore
  // doesn't allow them to be written.
  params = pickBy(
    {
      componentName,
      ...params,
    },
    v => v !== undefined,
  );
  let cachedParams = storedComponentParams.find(cached =>
    isEqual(cached.params, params),
  );
  if (!cachedParams) {
    const id = firestore.runTransaction<string>(async txn => {
      const nextIdDoc = await txn.get(nextIdDocRef);

      // Get the next available ID and increment it for the next share.
      const id = nextIdDoc.data()?.id || 0;
      nextIdDocRef.set({ id: id + 1 });
      const idString = id.toString();

      // Write the params under the ID we got.
      collection.doc(idString).set(params);

      return idString;
    });
    cachedParams = { id, params };
    storedComponentParams.push(cachedParams);
  }
  return cachedParams.id;
}

// A cache of component params that we have read from Firestore. Ensures that we
// don't re-fetch the same params multiple times (causing extra delays).
const fetchedComponentParams: {
  [id: string]: Promise<Params | undefined>;
} = {};

/**
 * Fetches previously stored component params for a particular component share ID.
 *
 * Returns the params if they match the specified componentName (or
 * componentName is undefined), else returns undefined.
 */
async function fetchSharedComponentParams(
  componentName: ComponentName | undefined,
  sharedComponentId: string,
): Promise<Params | undefined> {
  let cachedParams = fetchedComponentParams[sharedComponentId];
  if (!cachedParams) {
    const fetch = async () => {
      const doc = await collection.doc(sharedComponentId).get();
      const params = doc.data();
      return params;
    };
    cachedParams = fetch();
    fetchedComponentParams[sharedComponentId] = cachedParams;
  }

  const params = await cachedParams;
  // Only return the params if they're for the requested component.
  if (componentName && componentName !== params?.componentName) {
    return undefined;
  } else {
    return params;
  }
}

/**
 * React Hook to fetch and return the previously-stored component params for a
 * particular component share ID.
 *
 * Returns the params if they match the specified componentName (or
 * componentName is undefined), else returns undefined.
 */
export function useSharedComponentParams(
  componentName: ComponentName | undefined,
): Params | undefined {
  const { sharedComponentId } = useParams();

  const [componentParams, setComponentParams] = useState<Params | undefined>(
    undefined,
  );
  useEffect(() => {
    let cancelled = false;
    if (sharedComponentId) {
      const fetchParams = async () => {
        const params = await fetchSharedComponentParams(
          componentName,
          sharedComponentId,
        );
        if (params && !cancelled) {
          setComponentParams(params);
        }
      };
      fetchParams();
      return () => {
        cancelled = true;
      };
    }
  }, [componentName, sharedComponentId]);
  return componentParams;
}

export async function getNextSharedComponentId(): Promise<number> {
  const doc = await nextIdDocRef.get();
  return doc.get('id') || 0;
}
