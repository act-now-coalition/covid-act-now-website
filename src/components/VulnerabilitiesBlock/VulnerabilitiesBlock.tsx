import React from 'react';
import { Region } from 'common/regions';
import { RegionCcviItem } from 'common/data';
import ExpandableContainer from 'components/ExpandableContainer';
import VulnerabilitiesBlockInner from './VulnerabilitiesBlockInner';

const VulnerabilitiesBlock: React.FC<{
  scores: RegionCcviItem | null;
  region: Region;
}> = ({ scores, region }) => {
  if (!scores) {
    return null;
  }

  const containerProps = {
    collapsedHeight: 240,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities',
  };

  return (
    <>
      <ExpandableContainer {...containerProps}>
        <VulnerabilitiesBlockInner scores={scores} region={region} />
      </ExpandableContainer>
      <div style={{ marginBottom: '4.25rem' }}>Footer content</div>
    </>
  );
};

export default VulnerabilitiesBlock;
