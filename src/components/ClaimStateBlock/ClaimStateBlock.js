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

const ClaimStateBlock = ({ location, countyName }) => {
  const locationName = location && STATES[location];
  const headerName = countyName
    ? `${countyName}`
    : `the state of ${locationName}`;
  const bodyName = countyName ? `${countyName}` : `${locationName}`;
  return (
    <ClaimStateContainer>
      <ClaimStateHeader>Do you work for {headerName}?</ClaimStateHeader>
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
