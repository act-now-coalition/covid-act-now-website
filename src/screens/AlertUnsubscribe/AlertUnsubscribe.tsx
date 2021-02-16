import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFirestore, getFirestoreFieldValue } from 'common/firebase';
import {
  Wrapper,
  UnsubscribeHeader,
  UpdateAlertsButton,
  UnsubscribeButton,
  BodyCopy,
  UpdatePreferencesFormWrapper,
} from 'screens/AlertUnsubscribe/AlertUnsubscribe.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import AutocompleteRegions from 'components/AutocompleteRegions';
import regions, { Region } from 'common/regions';

const unsubscribedCopy =
  'You are now unsubscribed and will no longer receive alerts.';
const resubscribedCopy = 'Your COVID alert preferences have been updated.';

async function getAlertsSubscriptions(): Promise<
  firebase.firestore.CollectionReference
> {
  const firestore = await getFirestore();
  return firestore.collection('alerts-subscriptions');
}

const AlertUnsubscribe = () => {
  const router = useRouter();
  //  const params = new URLSearchParams(window.location.search);
  // fixme: remove coercion?
  const email = (router.query.email ?? '') as string; //params.get('email') || '';

  const [selectedLocations, setSelectedLocations] = useState<Region[]>([]);
  const [formSubmittedCopy, setFormSubmittedCopy] = useState('');

  useEffect(() => {
    async function onPageload() {
      if (!email) {
        return;
      }
      const subscriptions = await getAlertsSubscriptions();
      const fipsList: string[] = await subscriptions
        .doc(email)
        .get()
        .then(function (doc) {
          const data = doc.data() || {};
          return data.locations || [];
        });

      const defaultValues: Region[] = fipsList
        .map((fipsCode: string) => regions.findByFipsCode(fipsCode))
        .filter((region): region is Region => region !== null);

      setSelectedLocations(defaultValues);
    }

    onPageload();
  }, [email]);

  async function unsubscribeFromAll() {
    trackEvent(EventCategory.ENGAGEMENT, EventAction.ALERTS_UNSUBSCRIBE);
    const subscriptions = await getAlertsSubscriptions();
    await subscriptions.doc(email).delete();
    setFormSubmittedCopy(unsubscribedCopy);
  }

  function handleSelectChange(selectedLocation: any) {
    setSelectedLocations(selectedLocation);
  }

  async function subscribeToAlerts() {
    const locations = selectedLocations.map(region => region.fipsCode);
    const subscriptions = await getAlertsSubscriptions();
    const FieldValue = await getFirestoreFieldValue();
    await subscriptions.doc(email).set({
      locations,
      subscribedAt: FieldValue.serverTimestamp(),
    });
    setFormSubmittedCopy(resubscribedCopy);
  }

  return (
    <Wrapper>
      {!formSubmittedCopy && (
        <Fragment>
          <UnsubscribeHeader>
            Update your COVID Alert Preferences
          </UnsubscribeHeader>
          <BodyCopy>To update preferences for {email}:</BodyCopy>
          <UpdatePreferencesFormWrapper>
            <div style={{ width: '100%' }}>
              <AutocompleteRegions
                regions={regions.all()}
                selectedRegions={selectedLocations}
                onChangeRegions={(e, newRegions) =>
                  handleSelectChange(newRegions)
                }
              />
            </div>
            <UpdateAlertsButton type="submit" onClick={subscribeToAlerts}>
              Update Preferences
            </UpdateAlertsButton>
          </UpdatePreferencesFormWrapper>
          <BodyCopy>To unsubscribe {email} from all COVID alerts:</BodyCopy>
          <UnsubscribeButton onClick={unsubscribeFromAll}>
            Unsubscribe
          </UnsubscribeButton>
        </Fragment>
      )}
      {formSubmittedCopy && <BodyCopy>{formSubmittedCopy}</BodyCopy>}
    </Wrapper>
  );
};

export default AlertUnsubscribe;
