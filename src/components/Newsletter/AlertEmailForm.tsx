import React, { useState, createRef } from 'react';
import { StyledNewsletter, InputHolder, InputError } from './Newsletter.style';
import { getFirebase, firebase } from 'common/firebase';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import regions, { Region, getStateCode } from 'common/regions';
import { AutocompleteRegions } from 'components/AutocompleteLocations';
import { isValidEmail } from 'common/utils';

const allRegions = [...regions.all(), ...regions.metroAreas];

const CREATESEND_FORM_ID =
  '2BE4EF332AA2E32596E38B640E905619E90CD5DAC48A878CDEBFFE3B420D8CD24E4AEABAB52A4CE3526219C7A966AE965B84F99C823C89EFF1F01B28DE4F975E';

const AlertEmailForm: React.FC<{ region?: Region }> = ({ region }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [subscribeToDailyDownload, setSubscribeToDailyDownload] = useState(
    true,
  );
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(
    region ? [region] : [],
  );

  const stateCode = region ? getStateCode(region) : null;
  const errMessageOpen = errorMessage.length > 0;

  const formRef = createRef<HTMLFormElement>();

  const onChangeRegions = (newRegions: Region[]) => {
    setSelectedRegions(newRegions);
  };

  const onChangeEmail = (email: string) => {
    if (isValidEmail(email)) {
      setEmailAddress(email);
      setErrorMessage('');
    }
  };

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const fipsCodeList = selectedRegions.map(region => region.fipsCode);
    if (!isValidEmail(emailAddress) || fipsCodeList.length === 0) {
      setErrorMessage('Must supply a valid email address');
      return;
    }

    // can't submit the form without the email entered and email that is valid
    await updateFirebaseSubscriptions(emailAddress, fipsCodeList);
    trackEvent(EventCategory.ENGAGEMENT, EventAction.SUBSCRIBE);
    let url = new URL('https://createsend.com/t/getsecuresubscribelink');
    url.searchParams.append('email', emailAddress);
    url.searchParams.append('data', CREATESEND_FORM_ID);
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.text().then(text => {
          console.log(text);
          formRef.current?.submit();
        });
      })
      .then(data => {
        console.log(data);
      });
  }

  return (
    <StyledNewsletter>
      {/* This form comes from the signup form builder
        (https://covidactnow.createsend.com/subscribers/signupformbuilder/<listid>) within the subscribers page
        From there choose the option where you add code to your website without css.
        To update grab the data-id, classNames, ids and names for each of the inputs in order to subscribe users.
        We hide some of the information users don't need to enter and add some form fields that the api doesn't
        require (i.e the alert-loctions autocomplete).
         */}
      <form
        ref={formRef}
        className="js-cm-form"
        id="subForm"
        method="post"
        data-id={CREATESEND_FORM_ID}
      >
        <input
          hidden
          readOnly
          aria-label="state"
          value={stateCode || ''}
          id="fieldjrdtwi"
          maxLength={200}
          name="cm-f-jrdtwi"
        />
        <input
          hidden
          readOnly
          aria-label="county"
          id="fieldjrdtwd"
          maxLength={200}
          name="cm-f-jrdtwd"
          value={region?.name || ''}
        />
        {/* TODO(pablo): Add a label for this input */}
        <AutocompleteRegions
          regions={allRegions}
          selectedRegions={selectedRegions}
          onChangeRegions={(_, selectedRegions) => {
            onChangeRegions(selectedRegions);
          }}
          ariaLabelledBy="subscribe-to-alerts"
        />
        <InputHolder>
          <input
            // ref={i => (this.emailInput = i)}
            autoComplete="Email"
            aria-label="Email"
            placeholder="Enter your email address"
            className="js-cm-email-input qa-input-email"
            id="fieldEmail"
            maxLength={200}
            name="cm-yddtsd-yddtsd"
            required={true}
            type="email"
            onChange={e => onChangeEmail(e.target.value)}
          />
          <button type="submit" onClick={onSubmit}>
            Sign up
          </button>
        </InputHolder>
        {errorMessage && <InputError>{errorMessage}</InputError>}
        <InputHolder errMessageOpen={errMessageOpen}>
          <input
            type="checkbox"
            value="wurhhh"
            id="wurhhh"
            name="cm-ol-wurhhh"
            onChange={() =>
              setSubscribeToDailyDownload(!subscribeToDailyDownload)
            }
            checked={subscribeToDailyDownload}
          />
          <label htmlFor="checkbox">
            Also send me <b>daily news</b> with the latest data and scientific
            findings on COVID
          </label>
        </InputHolder>
      </form>
      <script
        type="text/javascript"
        src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
      />
    </StyledNewsletter>
  );
};

async function updateFirebaseSubscriptions(
  emailAddress: string,
  fipsCodeList: string[],
) {
  const db = getFirebase().firestore();
  // Merge the locations with any existing ones since that's _probably_ what the user wants.
  await db
    .collection('alerts-subscriptions')
    .doc(emailAddress.toLocaleLowerCase())
    .set(
      {
        locations: firebase.firestore.FieldValue.arrayUnion(...fipsCodeList),
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}

export default AlertEmailForm;
