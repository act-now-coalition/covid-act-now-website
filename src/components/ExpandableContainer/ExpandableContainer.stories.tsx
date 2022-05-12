import React from 'react';
import ExpandableContainer from './ExpandableContainer';
import VulnerabilitiesBlock from 'components/VulnerabilitiesBlock';
import regions from 'common/regions';
import { useCcviForFips } from 'common/hooks';
import { EventCategory } from 'components/Analytics';

export default {
  title: 'Location Page/Expandable container',
  component: ExpandableContainer,
};

export const Example = () => {
  const region = regions.findByFipsCodeStrict('06');
  const ccviScores = useCcviForFips(region.fipsCode);

  const props = {
    collapsedHeightMobile: '300px',
    collapsedHeightDesktop: '200px',
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Test',
    trackingCategory: EventCategory.NONE,
  };

  return (
    <ExpandableContainer {...props}>
      <VulnerabilitiesBlock scores={ccviScores} region={region} />
    </ExpandableContainer>
  );
};
