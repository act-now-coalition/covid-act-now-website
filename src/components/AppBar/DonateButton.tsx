import React from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '@react-hook/window-scroll';
import { Fade } from '@material-ui/core';
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

export const DonateButtonWithFade = () => {
  // uses https://www.npmjs.com/package/@react-hook/window-scroll :
  const scrollY = useScrollPosition();
  // 170 approximates the height of the donation banner:
  const isPassedBanner = scrollY > 170;

  return (
    <Fade in={isPassedBanner} timeout={150}>
      <DonateButtonWrapper>
        <StyledDonateButtonA to="/donate" {...trackingProps}>
          Donate
        </StyledDonateButtonA>
      </DonateButtonWrapper>
    </Fade>
  );
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
