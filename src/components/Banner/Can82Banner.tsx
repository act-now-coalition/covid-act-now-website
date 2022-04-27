import React from 'react';
import {
  CondensedBanner,
  CondensedBannerWrapperHomepage,
  CondensedBannerWrapperLocationPage,
} from './Banner.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Link } from 'react-router-dom';

const trackClick = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.CLICK_LINK,
    'Learn Community Levels',
  );
};

const Can82Banner: React.FC = () => (
  <CondensedBanner role="banner">
    We've made some changes to align with the current state of COVID and CDC
    guidelines. All metrics that we've previously tracked will continue to be
    available.{' '}
    <Link
      to="/covid-risk-levels-metrics"
      id="banner-learn-more-link"
      onClick={trackClick}
    >
      Learn more
    </Link>
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
