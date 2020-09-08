import React from 'react';
import Banner from './Banner';
import { SurveyButton } from './Banner.style';
import ExternalLink from 'components/ExternalLink';

const renderDonationButton = () => (
  <ExternalLink href="https://bit.ly/2F2fCRD">
    <SurveyButton
      variant="contained"
      color="primary"
      disableRipple
      disableFocusRipple
    >
      Donate
    </SurveyButton>
  </ExternalLink>
);

const DONATION_MESSAGE = `We are a tiny non-profit working relentlessly since March to bring you the most important COVID information. Help make our work sustainable by donating today.`;

export const DonationBanner: React.FC = () => (
  <Banner message={DONATION_MESSAGE} renderButton={renderDonationButton} />
);

export default DonationBanner;
