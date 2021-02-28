import React from 'react';
import Banner from './Banner';
import { ContainedButton } from './Banner.style';
import { Link } from 'common/utils/router';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

export const BANNER_COPY =
  'The U.S. is in a third COVID wave. Exercise extra caution in order to reduce your risk of infection, to avoid infecting others, and to avoid overwhelming our healthcare system.';

const trackClick = () => {
  trackEvent(EventCategory.ARTICLES, EventAction.CLICK, 'Banner: Third wave');
};

const articleURL = '/covid-explained/us-third-wave';

const renderButton = () => (
  <Link to={articleURL} id="3rd-wave-banner" onClick={trackClick}>
    <ContainedButton color="primary">Learn more</ContainedButton>
  </Link>
);

export const ThirdWaveBanner: React.FC = () => (
  <Banner message={BANNER_COPY} renderButton={renderButton} />
);

export default ThirdWaveBanner;
