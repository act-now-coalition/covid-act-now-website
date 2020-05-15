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
import { STATES } from 'common';
import { getFormattedCountyName } from 'common/utils';

const EMAIL = 'gov@covidactnow.org';

const ClaimStateBlock = ({ stateId, countyId }) => {
  const headerName = countyId
    ? getFormattedCountyName(stateId, countyId)
    : `the state of ${STATES[stateId]}`;
  return (
    <ClaimStateWrapper>
      <ClaimStateContainer>
        <ClaimStateText>
          <ClaimStateHeader>Do you work for {headerName}?</ClaimStateHeader>
          <ClaimStateBody>
            We’d love to know how you’re using our model.
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
