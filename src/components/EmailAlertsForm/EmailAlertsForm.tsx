import React, {
  Fragment,
  useState,
  createRef,
  ChangeEvent,
  FormEvent,
} from 'react';
import { AutocompleteGetTagProps } from '@material-ui/lab/Autocomplete';
import { isValidEmail } from 'common/utils';
import { Region } from 'common/regions';
import AutocompleteRegions from 'components/AutocompleteRegions';
import {
  subscribeToLocations,
  subscribeToDailyDownload,
  CREATESEND_DATA_ID,
} from './utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
  StyledFormGroup,
  StyledCheckbox,
  StyledCheckboxLabel,
  StyledFormControlLabel,
  LocationChip,
} from './EmailAlertsForm.style';

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
  const [defaultInitialized, setDefaultInitialized] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = createRef<HTMLFormElement>();

  // The default (geolocated) regions are updated asynchronously, so once we
  // get the default regions we set them as selected initially
  if (defaultRegions.length > 0 && !defaultInitialized) {
    setDefaultInitialized(true);
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

  const onChangeRegions = (
    event: ChangeEvent<{}>,
    newRegions: (string | Region)[],
  ) => {
    setSelectedRegions(newRegions as Region[]);
  };

  const emailInputLabel = emailError
    ? 'Invalid email'
    : 'Enter your email address';

  const renderTags = (
    regionItems: Region[],
    getTagProps?: AutocompleteGetTagProps,
  ): React.ReactNode | undefined => {
    return (
      <Fragment>
        {regionItems.map((region: Region, index: number) => {
          const tagProps = getTagProps ? getTagProps({ index }) : {};
          return (
            <LocationChip
              key={region.fipsCode}
              label={region.fullName}
              {...tagProps}
            />
          );
        })}
      </Fragment>
    );
  };

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
          placeholder="+ Add alert locations"
          renderTags={renderTags}
          placeholderMinWidth="100%"
        />
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
            placeholder={emailInputLabel}
            type="email"
            name="cm-wurhhh-wurhhh"
            autoComplete="email"
            aria-invalid={!isValidEmail(email)}
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
              Also send me <strong>daily news</strong> with the latest data and
              scientific findings.
            </StyledCheckboxLabel>
          }
        />
      </StyledFormGroup>
    </StyledForm>
  );
};

export default EmailAlertsForm;
