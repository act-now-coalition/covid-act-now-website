import React, { useState, createRef, ChangeEvent, FormEvent } from 'react';
import { isValidEmail } from 'common/utils';
import { Region } from 'common/regions';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
  StyledFormGroup,
  StyledCheckbox,
  StyledCheckboxLabel,
  StyledFormControlLabel,
  AlertsInfoBox,
  AlertsInfoBoxIcon,
  AlertsInfoBoxCopy,
} from './EmailAlertsForm.style';
import AutocompleteRegions from 'components/AutocompleteRegions';
import {
  subscribeToLocations,
  subscribeToDailyDownload,
  CREATESEND_DATA_ID,
} from './utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

function trackSubscription(label: string, numLocations: number) {
  trackEvent(
    EventCategory.ENGAGEMENT,
    EventAction.SUBSCRIBE,
    label,
    numLocations,
  );
}

const EmailAlertsForm: React.FC<{
  autocompleteRegions: Region[];
  defaultRegions: Region[];
}> = ({ autocompleteRegions, defaultRegions }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [checkDailyDownload, setCheckDailyDownload] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(
    defaultRegions,
  );
  const formRef = createRef<HTMLFormElement>();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!isValidEmail(value) && value !== '');
  };

  async function subscribeToAlerts() {
    if (!isValidEmail(email)) {
      return;
    }

    const numLocations = selectedRegions.length;
    const subscribeToAlerts = numLocations > 0;

    if (subscribeToAlerts) {
      const fipsCodeList = selectedRegions.map(region => region.fipsCode);
      await subscribeToLocations(email, fipsCodeList);
    }

    if (checkDailyDownload && subscribeToAlerts) {
      trackSubscription('Email Alerts & Daily Downloads', numLocations);
    } else if (subscribeToAlerts) {
      trackSubscription('Email Alerts Only', numLocations);
    } else {
      trackSubscription('Daily Download Only', numLocations);
    }

    if (checkDailyDownload) {
      const secureUrl = await subscribeToDailyDownload(email);
      if (formRef?.current?.action) {
        formRef.current.action = secureUrl;
        formRef.current.submit();
      }
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    subscribeToAlerts();
    event.preventDefault();
  };

  const onChangeDailyDownload = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckDailyDownload(event.target.checked);
  };

  const onChangeRegions = (event: ChangeEvent<{}>, newRegions: Region[]) => {
    setSelectedRegions(newRegions);
  };

  const emailInputLabel = emailError ? 'Invalid email' : 'Email';

  return (
    <StyledForm
      onSubmit={onSubmit}
      ref={formRef}
      method="post"
      data-id={CREATESEND_DATA_ID}
    >
      <StyledFormGroup>
        <AutocompleteRegions
          regions={autocompleteRegions}
          selectedRegions={selectedRegions}
          onChangeRegions={onChangeRegions}
          placeholder="Add location +"
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <AlertsInfoBox>
          <AlertsInfoBoxIcon />
          <AlertsInfoBoxCopy>
            Alerts for vaccine eligibility are available for these locations.
            Learn about our alerts.
          </AlertsInfoBoxCopy>
        </AlertsInfoBox>
      </StyledFormGroup>
      <StyledFormGroup>
        <EmailFieldGroup>
          <EmailTextField
            id="fieldEmail"
            className="js-cm-email-input qa-input-email fs-exclude"
            label={emailInputLabel}
            error={emailError}
            onChange={onChangeEmail}
            value={email}
            placeholder="Enter your email address"
            type="email"
            name="cm-wurhhh-wurhhh"
          />
          <StyledButton onClick={() => subscribeToAlerts()}>
            Sign up
          </StyledButton>
        </EmailFieldGroup>
      </StyledFormGroup>
      <StyledFormGroup>
        <StyledFormControlLabel
          labelPlacement="end"
          control={
            <StyledCheckbox
              checked={checkDailyDownload}
              onChange={onChangeDailyDownload}
              name="check-daily-download"
            />
          }
          label={
            <StyledCheckboxLabel>
              Also send me <strong>daily news</strong> with the latest data and
              scientific findings
            </StyledCheckboxLabel>
          }
        />
      </StyledFormGroup>
    </StyledForm>
  );
};

export default EmailAlertsForm;
