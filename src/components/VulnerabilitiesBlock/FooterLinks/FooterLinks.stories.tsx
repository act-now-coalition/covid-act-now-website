import React from 'react';
import FooterLinks from './FooterLinks';
import regions from 'common/regions/region_db';

export default {
  title: 'Shared Components/VulnerabilitiesFooterLinks',
  component: FooterLinks,
};

export const State = () => {
  const region = regions.findByFipsCodeStrict('01');
  return <FooterLinks region={region} />;
};

export const County = () => {
  const region = regions.findByFipsCodeStrict('06037');
  return <FooterLinks region={region} />;
};
