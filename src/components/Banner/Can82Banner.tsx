import React from 'react';
import {
  CondensedBanner,
  CondensedBannerWrapperHomepage,
  CondensedBannerWrapperLocationPage,
} from './Banner.style';
import ExternalLink from 'components/ExternalLink';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const trackClick = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.CLICK_LINK,
    'Banner Learn More Link',
  );
};

const Can82Banner: React.FC = () => (
  <CondensedBanner role="banner">
    We've made some changes to align with the current state of COVID and CDC
    guidelines. All metrics that we've previously tracked will continue to be
    available.{' '}
    <ExternalLink
      href="https://mailchi.mp/actnowcoalition/site-updates"
      id="banner-learn-more-link"
      onClick={trackClick}
    >
      Learn more
    </ExternalLink>
  </CondensedBanner>
);

// Different spacing needs between homepage and location page banners:

export const Can82BannerHomepage: React.FC = () => (
  <CondensedBannerWrapperHomepage>
    <Can82Banner />
  </CondensedBannerWrapperHomepage>
);

export const Can82BannerLocationPage: React.FC = () => (
  <CondensedBannerWrapperLocationPage>
    <Can82Banner />
  </CondensedBannerWrapperLocationPage>
);
