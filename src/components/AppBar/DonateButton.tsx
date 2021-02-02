import React from 'react';
import { DonateButtonWrapper, StyledDonateButton } from './DonateButton.style';
import { EventAction, EventCategory } from 'components/Analytics';

const trackingProps = {
  trackingCategory: EventCategory.DONATE,
  trackingAction: EventAction.CLICK,
  trackingLabel: 'AppBar donate button',
};

export const DonateButton = () => (
  <DonateButtonWrapper>
    <StyledDonateButton to="/donate" {...trackingProps}>
      Donate
    </StyledDonateButton>
  </DonateButtonWrapper>
);
