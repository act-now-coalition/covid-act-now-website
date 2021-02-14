import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirebase, firebase } from 'common/firebase';
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

const AlertUnsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';

  const [selectedLocations, setSelectedLocations] = useState<Region[]>([]);
  const [formSubmittedCopy, setFormSubmittedCopy] = useState('');

  useEffect(() => {
    async function onPageload() {
      const fipsList: string[] = await getFirebase()
        .firestore()
        .collection('alerts-subscriptions')
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
    await getFirebase()
      .firestore()
      .collection('alerts-subscriptions')
      .doc(email)
      .delete();
    setFormSubmittedCopy(unsubscribedCopy);
  }

  function handleSelectChange(selectedLocation: any) {
    setSelectedLocations(selectedLocation);
  }

  async function subscribeToAlerts() {
    const locations = selectedLocations.map(region => region.fipsCode);
    await getFirebase()
      .firestore()
      .collection('alerts-subscriptions')
      .doc(email)
      .set({
        locations,
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
            <AutocompleteRegions
              regions={regions.all()}
              selectedRegions={selectedLocations}
              onChangeRegions={(e, newRegions) =>
                handleSelectChange(newRegions)
              }
            />
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
