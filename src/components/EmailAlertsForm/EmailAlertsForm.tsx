import React, { useState, ChangeEvent, FormEvent } from 'react';
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

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!isValidEmail(value) && value !== '');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // TODO: Get regions + email + checked and subscribe
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
    <StyledForm onSubmit={onSubmit}>
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
            id="user-email"
            label={emailInputLabel}
            error={emailError}
            onChange={onChangeEmail}
            value={email}
            placeholder="Enter your email address"
            type="email"
          />
          <StyledButton>Sign up</StyledButton>
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
