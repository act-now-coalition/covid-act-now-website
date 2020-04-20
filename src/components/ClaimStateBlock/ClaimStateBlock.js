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
      <ClaimStateHeader>Do your work for {headerName}?</ClaimStateHeader>
      <ClaimStateBody>
        Let us know how we can make our model more useful for you and {bodyName}{' '}
        residents. Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </ClaimStateBody>
      <ClaimStateButtonWrapper>
        <a href={`mailto:${EMAIL}`}>
          <ClaimStateButton disableElevation variant="contained">
            Claim this page
          </ClaimStateButton>
        </a>
      </ClaimStateButtonWrapper>
    </ClaimStateContainer>
  );
};
export default ClaimStateBlock;
