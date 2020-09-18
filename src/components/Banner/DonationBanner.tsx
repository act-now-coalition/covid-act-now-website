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

const DONATION_MESSAGE = `Help us continue serving communities with life-saving COVID data`;

export const DonationBanner: React.FC = () => (
  <Banner message={DONATION_MESSAGE} renderButton={renderDonationButton} />
);

export default DonationBanner;
