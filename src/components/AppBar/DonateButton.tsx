import React from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '@react-hook/window-scroll';
import { Fade } from '@material-ui/core';
import {
  StyledDonateButton as StyledDonateButtonA,
  DonateButtonWrapper,
  StyledDonateButtonB,
} from './DonateButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

function trackClickDonate() {
  const trackLabel = 'AppBar donate button';
  trackEvent(EventCategory.DONATE, EventAction.CLICK, trackLabel);
}

export const DonateButtonWithFade = () => {
  // uses https://www.npmjs.com/package/@react-hook/window-scroll :
  const scrollY = useScrollPosition();
  // 170 approximates the height of the donation banner:
  const isPassedBanner = scrollY > 170;

  return (
    <Fade in={isPassedBanner} timeout={150}>
      <DonateButtonWrapper>
        <Link to="/donate">
          <StyledDonateButtonA onClick={trackClickDonate}>
            Donate
          </StyledDonateButtonA>
        </Link>
      </DonateButtonWrapper>
    </Fade>
  );
};

export const DonateButton = () => (
  <DonateButtonWrapper>
    <Link to="/donate">
      <Experiment id={ExperimentID.DONATE_BTN_COLOR}>
        <Variant id={VariantID.A}>
          <StyledDonateButtonA onClick={trackClickDonate}>
            Donate
          </StyledDonateButtonA>
        </Variant>
        <Variant id={VariantID.B}>
          <StyledDonateButtonB onClick={trackClickDonate}>
            Donate
          </StyledDonateButtonB>
        </Variant>
      </Experiment>
    </Link>
  </DonateButtonWrapper>
);
