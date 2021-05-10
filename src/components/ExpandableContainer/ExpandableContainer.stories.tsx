import React from 'react';
import ExpandableContainer from './ExpandableContainer';
import { ExpandableSection } from 'components/ExpandableContainer';
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

  return (
    <ExpandableContainer section={ExpandableSection.VULNERABILITIES}>
      <VulnerabilitiesBlock scores={ccviScores} region={region} />
    </ExpandableContainer>
  );
};
