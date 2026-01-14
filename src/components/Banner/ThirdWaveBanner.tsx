import React from 'react';
import Banner from './Banner';

export const BANNER_COPY =
  'The U.S. is in a third COVID wave. Exercise extra caution in order to reduce your risk of infection, to avoid infecting others, and to avoid overwhelming our healthcare system.';

export const ThirdWaveBanner: React.FC = () => <Banner message={BANNER_COPY} />;

export default ThirdWaveBanner;
