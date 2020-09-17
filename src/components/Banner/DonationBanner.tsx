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
      Donate
    </SurveyButton>
  </Link>
);

const DONATION_MESSAGE = `Help serve communities with life-saving covid data.`;
const DONATION_SUBMESSAGE =
  'Your support helps public health officials receive free, local, and accessible data.';
export const DonationBanner: React.FC = () => (
  <Banner
    message={DONATION_MESSAGE}
    subMessage={DONATION_SUBMESSAGE}
    renderButton={renderDonationButton}
  />
);

export default DonationBanner;
