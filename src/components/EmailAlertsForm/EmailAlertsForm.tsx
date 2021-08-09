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
import { useBreakpoint } from 'common/hooks';
import AutocompleteRegions from 'components/AutocompleteRegions';
import { subscribeToLocations, CREATESEND_DATA_ID } from './utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
  StyledFormGroup,
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
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [defaultInitialized, setDefaultInitialized] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = createRef<HTMLFormElement>();

  const isSmallMobile = useBreakpoint(360);

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

      trackSubscription('Email Alerts Only', numLocations);
    }

    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    subscribeToAlerts();
    event.preventDefault();
  };

  const onChangeRegions = (event: ChangeEvent<{}>, newRegions: Region[]) => {
    setSelectedRegions(newRegions);
  };

  const validInputLabel = isSmallMobile
    ? 'Enter your email'
    : 'Enter your email address';
  const emailInputLabel = emailError ? 'Invalid email' : validInputLabel;

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
    </StyledForm>
  );
};

export default EmailAlertsForm;
