import React from 'react';
import {
  ClaimStateContainer,
  ClaimStateHeader,
  ClaimStateBody,
  ClaimStateButton,
  ClaimStateButtonWrapper,
} from './ClaimStateBlock.style';
import { STATES } from 'enums';

const EMAIL = 'gov@covidactnow.org';

const ClaimStateBlock = ({ stateId, countyName }) => {
  const stateName = stateId && STATES[stateId];
  const headerName = countyName ? `${countyName}` : `the state of ${stateName}`;
  const bodyName = countyName ? `${countyName}` : `${stateName}`;
  return (
    <ClaimStateContainer>
      <ClaimStateHeader>Do you work for {headerName}?</ClaimStateHeader>
      <ClaimStateBody>
        We’d love to know how you’re using our model. Email us at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </ClaimStateBody>
      <ClaimStateButtonWrapper>
        <a href={`mailto:${EMAIL}`}>
          <ClaimStateButton disableElevation variant="contained">
            Connect with us
          </ClaimStateButton>
        </a>
      </ClaimStateButtonWrapper>
    </ClaimStateContainer>
  );
};
export default ClaimStateBlock;
