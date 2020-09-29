import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDonateButton, DonateButtonWrapper } from './AppBar.style';
import { trackClick } from 'components/Analytics';
import useScrollPosition from '@react-hook/window-scroll';
import { Fade } from '@material-ui/core';

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
          trackClick(trackLabel);
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
  const scrollY = useScrollPosition(5);
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
