import React, { useState, createRef, ChangeEvent, FormEvent } from 'react';
import AlertsIcon from 'assets/images/AlertsIcon';
import DailyDownloadCheckbox from './DailyDownloadCheckbox';
import SuccessNote from './SuccessNote';
import {
  subscribeToLocations,
  subscribeToDailyDownload,
  CREATESEND_DATA_ID,
} from 'components/EmailAlertsForm/utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
  StyledFormGroup,
  Intro,
} from './EmailForm.style';
import { GrayBodyCopy } from 'components/NewLocationPage/Shared/Shared.style';
import { isValidEmail } from 'common/utils';
import { Region } from 'common/regions';

function trackSubscription(label: string, numLocations: number) {
  trackEvent(
    EventCategory.ENGAGEMENT,
    EventAction.SUBSCRIBE,
    label,
    numLocations,
  );
}

const EmailForm: React.FC<{
  region: Region;
}> = ({ region }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [checkDailyDownload, setCheckDailyDownload] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = createRef<HTMLFormElement>();
  const [isFocused, setIsFocused] = useState(false);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!isValidEmail(value) && value !== '');
  };

  async function subscribeToAlerts() {
    if (!isValidEmail(email)) {
      return;
    }
    await subscribeToLocations(email, [region.fipsCode]);
    if (checkDailyDownload) {
      trackSubscription('Email Alerts & Daily Downloads', 1);
    } else {
      trackSubscription('Email Alerts Only', 1);
    }

    if (checkDailyDownload) {
      const secureUrl = await subscribeToDailyDownload(email);
      if (formRef?.current?.action) {
        formRef.current.action = secureUrl;
        formRef.current.submit();
      }
    } else {
      setShowConfirmation(true);
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    subscribeToAlerts();
    event.preventDefault();
  };

  const onChangeDailyDownload = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckDailyDownload(event.target.checked);
  };

  const emailInputLabel = emailError ? 'Invalid email' : 'Email address';

  return (
    <>
      {showConfirmation ? (
        <SuccessNote />
      ) : (
        <>
          <Intro>
            <AlertsIcon />
            <GrayBodyCopy>
              Get the latest news and alerts about this location.
            </GrayBodyCopy>
          </Intro>
          <StyledForm
            onSubmit={onSubmit}
            ref={formRef}
            method="post"
            data-id={CREATESEND_DATA_ID}
          >
            <StyledFormGroup>
              <EmailFieldGroup>
                <EmailTextField
                  id="fieldEmail"
                  className="js-cm-email-input qa-input-email fs-exclude"
                  label={emailInputLabel}
                  error={emailError}
                  onChange={onChangeEmail}
                  value={email}
                  placeholder={emailInputLabel}
                  type="email"
                  name="cm-wurhhh-wurhhh"
                  autoComplete="email"
                  aria-invalid={!isValidEmail(email)}
                  inputProps={{
                    onFocus: () => {
                      setIsFocused(true);
                    },
                  }}
                />
                <StyledButton
                  onClick={() => subscribeToAlerts()}
                  $success={showConfirmation}
                >
                  {showConfirmation ? 'Subscribed!' : 'Get alerts'}
                </StyledButton>
              </EmailFieldGroup>
            </StyledFormGroup>
            {isFocused && (
              <DailyDownloadCheckbox
                checkDailyDownload={checkDailyDownload}
                onChangeDailyDownload={onChangeDailyDownload}
              />
            )}
          </StyledForm>
        </>
      )}
    </>
  );
};

export default EmailForm;
