import React, { useState } from 'react';
// import { fail } from 'common/utils';
// import Newsletter from 'components/Newsletter/Newsletter';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
// import Chip from '@material-ui/core/Chip';
// import { assert } from 'common/utils';
import { getFirebase } from 'common/firebase';
import {
  Wrapper,
  UnsubscribeHeader,
  UnsubscribeAllButton,
} from 'screens/AlertUnsubscribe/AlertUnsubscribe.style';
import { getLocationNames } from 'common/locations';

// unsubscribe button in email redirects to:
// let url = new URL('https://covidactnow.org/alert_unsubscribe');
// url.searchParams.append('email', //users email)
//arrives on https://covidactnow.org/alert_unsubscribe/?email=chelsiasulin@gmail.com

/*
1. Get email from query string
2. Get email's subscribed locations from firestore
3. Prefill locations input (alertsSelectionArray) with subscribed locations

4. If user choses to update locations and not 'unsubscribe
   from all', set email's location key with new values

5. If user unsubscribes from all alerts, delete their email document

*/

//TODO(chelsi)- handle no email more elegantly
//TODO(chelsi)- fix 'any' types

const AlertUnsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';

  const autocompleteOptions = getLocationNames();
  console.log('autocompleteOptions', autocompleteOptions);

  const [alertsSelectionArray, setAlertsSelectionArray] = useState([]);
  const [alertSignUps, setAlertSignUps] = useState('');

  async function getSubscribedLocations() {
    const db = getFirebase().firestore();
    await db
      .collection('alerts-subscriptions')
      .doc(email)
      .get()
      .then(function (doc) {
        console.log('data', doc.data());
        const data = doc.data() || {};
        const fipsArr = data.locations || []; // ["53033", "53", "17031", "06"]
        setAlertsSelectionArray(fipsArr);
        console.log('fipsArr', fipsArr);
        const strings = fipsArr.join(','); // "53033,53,17031,06"
        console.log('strings', strings);
      });
  }

  getSubscribedLocations();

  async function unsubscribeFromAll() {
    window.gtag('event', 'alertsUnsubscribe', {
      event_category: 'engagement',
    });
    const db = getFirebase().firestore();
    await db.collection('alerts-subscriptions').doc(email).delete();
  }

  //get list of fips
  //convert to locations
  //set as alertsSelectionArray

  //   async function getSubscribedLocations () {
  //     const db = getFirebase().firestore();
  //     const emailDoc = db.collection('alert-subscriptions').doc(email)

  //     await db.collection('alert-subscriptions').doc(email)

  //   }

  //   async function updateSubscribedLocations() {

  //   }

  //sets selected option as alertsSelectionArray (using setAlertsSelectionArray)
  //creates alertSignUps, comma-separated list of fips of locations in alertsSelectionArray
  //does this every time a new location is added to alertsSelectionArray
  //TODO: fix 'any' types
  function handleSelectChange(selectedOption: any) {
    setAlertsSelectionArray(selectedOption);
    const fipsList = alertsSelectionArray
      .map((item: any) => item.full_fips_code)
      .join(',');
    setAlertSignUps(fipsList);
    console.log('alertSignUps', alertSignUps);
  }

  return (
    <Wrapper>
      <UnsubscribeHeader>COVID Alert Preferences</UnsubscribeHeader>
      {alertsSelectionArray.map(elem => {
        return <UnsubscribeHeader>{elem}</UnsubscribeHeader>;
      })}
      {/* <div>
       <input
            hidden
            aria-label="alert_list_csv"
            id="fieldjrdtwy"
            maxLength={200}
            name="cm-f-jrdtwy"
            onChange={value => {}}
            value={alertSignUps}
          />
          <Autocomplete
            multiple
            id="alert-locations"
            // defaultValue={this.defaultValues}
            getOptionSelected={(option, value) =>
              option.full_fips_code === value.full_fips_code
            }
            onChange={(event, newValue) => {
                handleSelectChange(newValue);
            }}
            options={autocompleteOptions}
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
       </div> */}
      <UnsubscribeAllButton onClick={unsubscribeFromAll}>
        Unsubscribe from all alerts
      </UnsubscribeAllButton>
    </Wrapper>
  );
};
export default AlertUnsubscribe;
