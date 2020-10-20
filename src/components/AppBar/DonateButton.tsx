import React from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '@react-hook/window-scroll';
import { Fade } from '@material-ui/core';
import { StyledDonateButton, DonateButtonWrapper } from './DonateButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const ButtonContent = () => {
  const trackLabel = 'AppBar donate button';

  return (
    <Link to="/donate">
      <StyledDonateButton
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
        onClick={() => {
          trackEvent(EventCategory.DONATE, EventAction.CLICK, trackLabel);
        }}
      >
        Donate
      </StyledDonateButton>
    </Link>
  );
};

/*
Splits donate button into 2 separate components (with/without fade)
so that the useScrollPosition hook is only called when necessary
*/

export const DonateButtonWithoutFade = (props: {}) => {
  return (
    <DonateButtonWrapper>
      <ButtonContent />
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
