import React from 'react';
import {
  DonateButtonWrapper,
  StyledDonateButtonA,
  StyledDonateButtonB,
} from './DonateButton.style';
import { EventAction, EventCategory } from 'components/Analytics';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const trackingProps = {
  trackingCategory: EventCategory.DONATE,
  trackingAction: EventAction.CLICK,
  trackingLabel: 'AppBar donate button',
};

export const DonateButton = () => (
  <DonateButtonWrapper>
    <Experiment id={ExperimentID.DONATE_BTN_COLOR}>
      <Variant id={VariantID.A}>
        <StyledDonateButtonA to="/donate" {...trackingProps}>
          Donate
        </StyledDonateButtonA>
      </Variant>
      <Variant id={VariantID.B}>
        <StyledDonateButtonB to="/donate" {...trackingProps}>
          Donate
        </StyledDonateButtonB>
      </Variant>
    </Experiment>
  </DonateButtonWrapper>
);
