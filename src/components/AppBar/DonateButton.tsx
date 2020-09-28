import React from 'react';
import { Link } from 'react-router-dom';
import { StyledDonateButton, DonateButtonWrapper } from './AppBar.style';
import { trackClick } from 'components/Analytics';

const DonateButton = () => {
  const trackLabel = 'AppBar donate button';
  return (
    <DonateButtonWrapper>
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
    </DonateButtonWrapper>
  );
};

export default DonateButton;
