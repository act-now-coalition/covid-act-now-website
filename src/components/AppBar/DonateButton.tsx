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

const DonateButton = (props: {
  isLocationPage: boolean;
  isMobile: boolean;
}) => {
  // uses https://www.npmjs.com/package/@react-hook/window-scroll :
  const scrollY = useScrollPosition(5);
  // 170 approximates the height of the donation banner:
  const isPassedBanner = scrollY > 170;
  const noFadeDelay = props.isLocationPage || !props.isMobile;

  /*
  Fade functionality is only applied on mobile to the homepage
  where the donate button doesnt appear on load (it appears
  only once scrollY has passed 175px / banner is scrolled away)
  */
  const fadeIn = noFadeDelay || isPassedBanner;
  const timeout = noFadeDelay ? 0 : 150;

  return (
    <Fade in={fadeIn} timeout={timeout}>
      <DonateButtonWrapper>
        <ButtonContent />
      </DonateButtonWrapper>
    </Fade>
  );
};

export default DonateButton;
