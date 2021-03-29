import React from 'react';
import RegionItem from './RegionItem';
import regions from 'common/regions/region_db';

export default {
  title: 'Shared Components/HomepageRegionItem',
  component: RegionItem,
};

export const State = () => {
  const stateRegion = regions.findByFipsCodeStrict('08');
  return <RegionItem region={stateRegion} />;
};

export const County = () => {
  const countyRegion = regions.findByFipsCodeStrict('09001');
  return <RegionItem region={countyRegion} />;
};

export const Metro = () => {
  const metroRegion = regions.findByFipsCodeStrict('35620');
  return <RegionItem region={metroRegion} />;
};
