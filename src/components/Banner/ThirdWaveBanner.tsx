import React from 'react';
import Banner from './Banner';
// import { ContainedButton } from './Banner.style';
// import { Link } from 'react-router-dom';
// import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

export const BANNER_COPY =
  'The U.S. is in a third COVID wave. Exercise extra caution in order to reduce your risk of infection, to avoid infecting others, and to prevent an overwhelming of our healthcare systems.';

// const trackClick = () => {
//   trackEvent(EventCategory.ARTICLES, EventAction.CLICK, 'Banner: Third wave');
// };

// TODO: Update with the URL to the article
// const articleURL = '/';

// const renderButton = () => (
//   <Link to={articleURL} id="3rd-wave-banner" onClick={trackClick}>
//     <ContainedButton color="primary">Learn more</ContainedButton>
//   </Link>
// );

export const ThirdWaveBanner: React.FC = () => <Banner message={BANNER_COPY} />;

export default ThirdWaveBanner;
