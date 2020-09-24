import React from 'react';
import Banner from './Banner';
import { SurveyButton } from './Banner.style';
import { Link } from 'react-router-dom';

const renderDonationButton = () => (
  <Link to="/donate">
    <SurveyButton
      variant="contained"
      color="primary"
      disableRipple
      disableFocusRipple
    >
      Donate Now
    </SurveyButton>
  </Link>
);

const DONATION_MESSAGE =
  'We are a tiny non-profit working relentlessly since March to bring you the most important COVID information. Help make our work sustainable by donating today.';

export const DonationBanner: React.FC = () => (
  <Banner message={DONATION_MESSAGE} renderButton={renderDonationButton} />
);

export default DonationBanner;
