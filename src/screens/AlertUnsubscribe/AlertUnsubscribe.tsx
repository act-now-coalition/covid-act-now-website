import React, { useState, useEffect, Fragment } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { getFirebase, firebase } from 'common/firebase';
import {
  Wrapper,
  UnsubscribeHeader,
  UpdateAlertsButton,
  UnsubscribeButton,
  BodyCopy,
  UpdatePreferencesFormWrapper,
} from 'screens/AlertUnsubscribe/AlertUnsubscribe.style';
import { getAllLocations } from 'common/locations';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const unsubscribedCopy =
  'You are now unsubscribed and will no longer receive alerts.';
const resubscribedCopy = 'Your COVID alert preferences have been updated.';

const locations: any = getAllLocations();

const AlertUnsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';

  const [selectedLocations, setSelectedLocations] = useState([] as any);
  const [formSubmittedCopy, setFormSubmittedCopy] = useState('');

  useEffect(() => {
    async function onPageload() {
      let fipsArr = [] as any;
      const db = getFirebase().firestore();

      await db
        .collection('alerts-subscriptions')
        .doc(email)
        .get()
        .then(function (doc) {
          const data = doc.data() || {};
          fipsArr = data.locations || [];
        });

      const defaultValues = [] as any;

      fipsArr.forEach((fips: string) => {
        const subscribedLocation = locations.filter(
          (location: any) => fips === location.full_fips_code,
        );
        defaultValues.push(subscribedLocation[0]);
      });
      setSelectedLocations(defaultValues);
    }

    onPageload();
  }, [email]);

  async function unsubscribeFromAll() {
    trackEvent(EventCategory.ENGAGEMENT, EventAction.ALERTS_UNSUBSCRIBE);
    const db = getFirebase().firestore();
    await db.collection('alerts-subscriptions').doc(email).delete();
    setFormSubmittedCopy(unsubscribedCopy);
  }

  function handleSelectChange(selectedLocation: any) {
    setSelectedLocations(selectedLocation);
  }

  async function subscribeToAlerts() {
    const locations = selectedLocations.map((item: any) => item.full_fips_code);
    const db = getFirebase().firestore();
    await db.collection('alerts-subscriptions').doc(email).set({
      locations: locations,
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
            <Autocomplete
              fullWidth
              multiple
              id="alert-locations"
              value={selectedLocations}
              getOptionSelected={(option, value) =>
                option.full_fips_code === value.full_fips_code
              }
              onChange={(event, newValue) => {
                handleSelectChange(newValue);
              }}
              options={locations}
              getOptionLabel={option =>
                option.county
                  ? `${option.county}, ${option.state_code}`
                  : option.state
              }
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={
                      option.county
                        ? `${option.county}, ${option.state_code}`
                        : option.state
                    }
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={params => (
                <TextField {...params} placeholder="Enter alert locations" />
              )}
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
