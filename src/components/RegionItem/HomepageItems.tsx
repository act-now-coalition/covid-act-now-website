import React from 'react';
import RegionItem from './RegionItem';
// import RegionItemSkeleton from './RegionItemSkeleton';
import regions from 'common/regions';
import { RegionItemsWrapper } from 'screens/HomePage/New/NewHomepage.style';

const HomepageItems: React.FC = () => {
  const stateRegion = regions.findByFipsCodeStrict('09');
  const countyRegion = regions.findByFipsCodeStrict('09001');

  return (
    <RegionItemsWrapper>
      <RegionItem region={countyRegion} />
      <RegionItem region={stateRegion} />
    </RegionItemsWrapper>
  );
};

export default HomepageItems;
