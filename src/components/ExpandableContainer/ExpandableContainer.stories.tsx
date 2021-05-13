import React from 'react';
import ExpandableContainer from './ExpandableContainer';
import VulnerabilitiesBlock from 'components/VulnerabilitiesBlock';
import regions from 'common/regions';
import { useCcviForFips } from 'common/hooks';
export default {
  title: 'Below the fold/Expandable container',
  component: ExpandableContainer,
};

export const Example = () => {
  const region = regions.findByFipsCodeStrict('06');
  const ccviScores = useCcviForFips(region.fipsCode);

  const props = {
    collapsedHeightMobile: 300,
    collapsedHeightDesktop: 200,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities',
  };

  return (
    <ExpandableContainer {...props}>
      <VulnerabilitiesBlock scores={ccviScores} region={region} />
    </ExpandableContainer>
  );
};
