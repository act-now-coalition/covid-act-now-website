import React, { useState } from 'react';
import {
  StyledForm,
  EmailTextField,
  StyledButton,
  EmailFieldGroup,
} from './EmailAlertsForm.style';
import { isValidEmail } from 'common/utils';

const EmailAlertsForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!isValidEmail(value) && value !== '');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      {/* Daily Download */}
    </StyledForm>
  );
};

export default EmailAlertsForm;
