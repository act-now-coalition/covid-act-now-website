import { isEqual, pickBy } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { assert } from './utils';
import { getFirestore } from './firebase';

const SHARED_COMPONENT_PARAMS_COLLECTION = 'shared-component-params';
const NEXT_ID_DOC = '__nextId';

type Params = { [key: string]: any };

export enum SharedComponent {
  Any = 'any',
  Compare = 'compare',
  Explore = 'explore',
}

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
 * specified component).
 *
 * Returns an assigned component share ID that will correspond to the stored
 * params going forward.
 */
export async function storeSharedComponentParams(
  component: SharedComponent,
  params: Params,
): Promise<string> {
  assert(component !== SharedComponent.Any, 'Must specify a valid component');

  // Add the component name and filter out any undefined values, since Firestore
  // doesn't allow them to be written.
  params = pickBy(
    {
      component: component,
      ...params,
    },
    v => v !== undefined,
  );
  let cachedParams = storedComponentParams.find(cached =>
    isEqual(cached.params, params),
  );
  if (!cachedParams) {
    const firestore = await getFirestore();
    const collection = firestore.collection(SHARED_COMPONENT_PARAMS_COLLECTION);
    const nextIdDocRef = collection.doc(NEXT_ID_DOC);

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
 * Returns the params if they match the specified component, else returns undefined.
 */
async function fetchSharedComponentParams(
  component: SharedComponent,
  sharedComponentId: string,
): Promise<Params | undefined> {
  let cachedParams = fetchedComponentParams[sharedComponentId];
  if (!cachedParams) {
    const fetch = async () => {
      const firestore = await getFirestore();
      const collection = firestore.collection(
        SHARED_COMPONENT_PARAMS_COLLECTION,
      );
      const doc = await collection.doc(sharedComponentId).get();
      const params = doc.data();
      return params;
    };
    cachedParams = fetch();
    fetchedComponentParams[sharedComponentId] = cachedParams;
  }

  const params = await cachedParams;
  // Only return the params if they're for the requested component.
  if (component !== SharedComponent.Any && component !== params?.component) {
    return undefined;
  } else {
    return params;
  }
}

/**
 * React Hook to fetch and return the previously-stored component params for a
 * particular component share ID.
 *
 * Returns the params if they match the specified component, else returns undefined.
 */
export function useSharedComponentParams(
  component: SharedComponent,
): Params | undefined {
  const { sharedComponentId } = useParams<{ sharedComponentId?: string }>();

  const [componentParams, setComponentParams] = useState<Params | undefined>(
    undefined,
  );
  useEffect(() => {
    let cancelled = false;
    if (sharedComponentId) {
      const fetchParams = async () => {
        const params = await fetchSharedComponentParams(
          component,
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
  }, [component, sharedComponentId]);
  return componentParams;
}

export async function getNextSharedComponentId(): Promise<number> {
  const firestore = await getFirestore();
  const nextIdDocRef = firestore
    .collection(SHARED_COMPONENT_PARAMS_COLLECTION)
    .doc(NEXT_ID_DOC);
  const doc = await nextIdDocRef.get();
  return doc.get('id') || 0;
}
