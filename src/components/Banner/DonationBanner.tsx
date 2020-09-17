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
