import React from 'react';
import {
  CondensedBanner,
  CondensedBannerWrapperHomepage,
  CondensedBannerWrapperLocationPage,
} from './Banner.style';

//TODO(8.2) - update with correct learn more URL

const Can82Banner: React.FC = () => (
  <CondensedBanner role="banner">
    We've made some changes to better align with the CDC.{' '}
    <a href="/" target="_blank" rel="noopener noreferrer">
      Learn more
    </a>
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
