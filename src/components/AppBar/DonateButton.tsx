import React from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '@react-hook/window-scroll';
import { Fade } from '@material-ui/core';
import {
  StyledDonateButton,
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

const ButtonContent = () => {
  return (
    <Link to="/donate">
      <StyledDonateButton color="primary" onClick={trackClickDonate}>
        Donate
      </StyledDonateButton>
    </Link>
  );
};

/*
Splits donate button into 2 separate components (with/without fade)
so that the useScrollPosition hook is only called when necessary
*/

export const DonateButtonVariantA = (props: {}) => {
  return (
    <DonateButtonWrapper>
      <ButtonContent />
    </DonateButtonWrapper>
  );
};

// Donate button on a different color to test A/B testing setup
export const DonateButtonVariantB = (props: {}) => {
  return (
    <DonateButtonWrapper>
      <StyledDonateButtonB onClick={trackClickDonate}>
        Donate
      </StyledDonateButtonB>
    </DonateButtonWrapper>
  );
};

export const DonateButtonWithFade = () => {
  // uses https://www.npmjs.com/package/@react-hook/window-scroll :
  const scrollY = useScrollPosition();
  // 170 approximates the height of the donation banner:
  const isPassedBanner = scrollY > 170;

  return (
    <Fade in={isPassedBanner} timeout={150}>
      <DonateButtonWrapper>
        <ButtonContent />
      </DonateButtonWrapper>
    </Fade>
  );
};

export const DonateButton = () => (
  <Experiment id={ExperimentID.DONATE_BTN_COLOR}>
    <Variant id={VariantID.A}>
      <DonateButtonVariantA />
    </Variant>
    <Variant id={VariantID.B}>
      <DonateButtonVariantB />
    </Variant>
  </Experiment>
);
