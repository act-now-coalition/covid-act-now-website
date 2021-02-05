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
  LearnMoreCopy,
} from './EmailAlertsForm.style';
import AutocompleteRegions from 'components/AutocompleteRegions';
import SignupsModal from 'components/SignupsModal/SignupsModal';
import { CenteredContentModal } from 'components/Compare/Compare.style';
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
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = createRef<HTMLFormElement>();

  // Set the inital state if the user hasn't selected anything yet
  if (defaultRegions.length > 0 && selectedRegions.length === 0) {
    setSelectedRegions(defaultRegions);
  }

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
    } else {
      // Since we didn't use the Campaign Monitor signup form we need to show our
      // own confirmation UI (just change the button text/color for 3sec).
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
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

  const onClickLearnMore = () => {
    setShowModal(true);
    trackEvent(
      EventCategory.ENGAGEMENT,
      EventAction.CLICK,
      'Email Alerts: Learn More',
    );
  };

  const emailInputLabel = emailError ? 'Invalid email' : 'Email';

  return (
    <>
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
              Alerts for vaccine eligibility are available for these locations.{' '}
              <LearnMoreCopy
                tabIndex={0}
                role="button"
                onClick={onClickLearnMore}
              >
                Learn about our alerts
              </LearnMoreCopy>
              .
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
            <StyledButton
              onClick={() => subscribeToAlerts()}
              $success={showConfirmation}
            >
              {showConfirmation ? 'Subscribed!' : 'Sign up'}
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
                Also send me <strong>daily news</strong> with the latest data
                and scientific findings
              </StyledCheckboxLabel>
            }
          />
        </StyledFormGroup>
      </StyledForm>
      <CenteredContentModal open={showModal} onClose={handleCloseModal}>
        <SignupsModal handleCloseModal={handleCloseModal} />
      </CenteredContentModal>
    </>
  );
};

export default EmailAlertsForm;
