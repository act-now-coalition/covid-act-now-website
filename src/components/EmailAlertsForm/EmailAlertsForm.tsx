import React, { useState, ChangeEvent, FormEvent } from 'react';
import { isValidEmail } from 'common/utils';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
  StyledFormGroup,
  StyledCheckbox,
  StyledCheckboxLabel,
  StyledFormControlLabel,
} from './EmailAlertsForm.style';

const EmailAlertsForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [checkDailyDownload, setCheckDailyDownload] = useState(true);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!isValidEmail(value) && value !== '');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeDailyDownload = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckDailyDownload(event.target.checked);
  };

  const emailInputLabel = emailError ? 'Invalid email' : 'Email';

  return (
    <StyledForm onSubmit={onSubmit}>
      {/* Search Locations */}
      {/* Info Box */}
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
