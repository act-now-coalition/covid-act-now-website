import React from 'react';
import {
  ClaimStateWrapper,
  ClaimStateContainer,
  ClaimStateHeader,
  ClaimStateText,
  ClaimStateBody,
  ClaimStateButton,
  ClaimStateButtonWrapper,
} from './ClaimStateBlock.style';
import { STATES } from 'enums';

const EMAIL = 'gov@covidactnow.org';

const ClaimStateBlock = ({ stateId, countyName }) => {
  const stateName = stateId && STATES[stateId];
  const headerName = countyName ? `${countyName}` : `the state of ${stateName}`;
  return (
    <ClaimStateWrapper>
      <ClaimStateContainer>
        <ClaimStateText>
          <ClaimStateHeader>Do you work for {headerName}?</ClaimStateHeader>
          <ClaimStateBody>
            We’d love to know how you’re using our model. Email us at{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </ClaimStateBody>
        </ClaimStateText>
        <ClaimStateButtonWrapper>
          <a href={`mailto:${EMAIL}`}>
            <ClaimStateButton disableElevation variant="contained">
              Connect with us
            </ClaimStateButton>
          </a>
        </ClaimStateButtonWrapper>
      </ClaimStateContainer>
    </ClaimStateWrapper>
  );
};
export default ClaimStateBlock;
