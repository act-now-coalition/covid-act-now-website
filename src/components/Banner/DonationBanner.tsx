import React from 'react';
import Banner from './Banner';
import { ContainedButton } from './Banner.style';
import { Link } from 'react-router-dom';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const trackClick = () => {
  trackEvent(
    EventCategory.DONATE,
    EventAction.CLICK_LINK,
    'Banner Doante Button',
  );
};

const renderDonationButton = () => (
  <Link to="/donate" id="donate-homepage-banner" onClick={trackClick}>
    <ContainedButton color="primary">Donate Now</ContainedButton>
  </Link>
);

const DONATION_MESSAGE =
  'We are a small non-profit working relentlessly since March 2020 to bring you trustworthy COVID information. Make sure we can continue our work by donating today.';

export const DonationBanner: React.FC = () => (
  <Banner message={DONATION_MESSAGE} renderButton={renderDonationButton} />
);

export default DonationBanner;
