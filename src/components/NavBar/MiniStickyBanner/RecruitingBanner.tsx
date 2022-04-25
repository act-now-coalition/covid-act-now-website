import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import ExternalLink from 'components/ExternalLink';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

const BannerText = styled(Typography)`
  font-size: 0.75rem;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0;
`;

enum OpenPosition {
  SR_FE_ENGINEER = 'Senior Front-end Engineer',
  SR_UX_DESIGNER = 'Senior UX Designer',
}

function trackRecruitingBannerClick(position: OpenPosition) {
  trackEvent(
    EventCategory.RECRUITING,
    EventAction.CLICK_LINK,
    `Recruiting: ${position}`,
  );
}

const RecruitingBanner: React.FC = () => {
  return (
    <Box bgcolor={COLOR_MAP.GREEN.BASE} py={0.75} px={1}>
      <BannerText>
        We're hiring a{' '}
        <ExternalLink
          href="https://docs.google.com/document/d/19i6aWbMcAHPImWGwY1KoGlkCBqP-DDSQlDE1PO0QthE/"
          style={{ color: 'inherit' }}
          onClick={() =>
            trackRecruitingBannerClick(OpenPosition.SR_FE_ENGINEER)
          }
        >
          Front-end Engineer
        </ExternalLink>{' '}
        and a{' '}
        <ExternalLink
          href="https://docs.google.com/document/d/1umyoQTKSXkQt7meRKyZ7nLlyneeyYjTYpAhUgQRxxkE/"
          style={{ color: 'inherit' }}
          onClick={() =>
            trackRecruitingBannerClick(OpenPosition.SR_UX_DESIGNER)
          }
        >
          UX Designer
        </ExternalLink>
        . Come work with us!
      </BannerText>
    </Box>
  );
};

export default RecruitingBanner;
