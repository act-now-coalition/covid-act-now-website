import React, { useState, useEffect, Fragment } from 'react';
import firebase from 'firebase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { getFirebase } from 'common/firebase';
import {
  Wrapper,
  UnsubscribeHeader,
  UpdateAlertsButton,
  UnsubscribeButton,
  BodyCopy,
  UpdatePreferencesFormWrapper,
} from 'screens/AlertUnsubscribe/AlertUnsubscribe.style';
import { getLocationNames } from 'common/locations';
// TODO: check if we still need alertsSelectionList for campaign monitor purposes, delete if not

const unsubscribedCopy =
  'You are now unsubscribed and will no longer receive alerts.';
const resubscribedCopy = 'Your COVID alert preferences have been updated.';

const locations: any = getLocationNames();

const AlertUnsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';

  const [alertsSelectionList, setAlertsSelectionList] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([] as any);
  const [formSubmitted, setFormSubmitted] = useState(false);
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
          const fipsStringsList = fipsArr.join(',');
          setAlertsSelectionList(fipsStringsList);
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
    window.gtag('event', 'alertsUnsubscribe', {
      event_category: 'engagement',
    });
    const db = getFirebase().firestore();
    await db.collection('alerts-subscriptions').doc(email).delete();
    setFormSubmittedCopy(unsubscribedCopy);
    setFormSubmitted(true);
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
    setFormSubmitted(true);
  }

  return (
    <Wrapper>
      {!formSubmitted && (
        <Fragment>
          <UnsubscribeHeader>
            Update your COVID Alert Preferences
          </UnsubscribeHeader>
          <BodyCopy>To update your preferences:</BodyCopy>
          <UpdatePreferencesFormWrapper>
            <input
              hidden
              aria-label="alert_list_csv"
              id="fieldjrdtwy"
              maxLength={200}
              name="cm-f-jrdtwy"
              onChange={value => {}}
              value={alertsSelectionList}
            />
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
          <BodyCopy>To unsubscribe from all COVID alerts:</BodyCopy>
          <UnsubscribeButton onClick={unsubscribeFromAll}>
            Unsubscribe
          </UnsubscribeButton>
        </Fragment>
      )}
      {formSubmitted && <BodyCopy>{formSubmittedCopy}</BodyCopy>}
    </Wrapper>
  );
};

export default AlertUnsubscribe;
