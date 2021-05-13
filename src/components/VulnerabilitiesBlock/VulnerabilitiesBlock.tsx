import React, { useState } from 'react';
import { Region } from 'common/regions';
import ExpandableContainer from 'components/ExpandableContainer';
import VulnerabilitiesBlockInner from './VulnerabilitiesBlockInner';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import { Header } from 'components/Compare/Compare.style';
import { getShareQuote } from 'common/ccvi/getShareQuote';
import { RegionCcviItem, getVulnPopulationPercentForFips } from 'common/data';
import { EventCategory } from 'components/Analytics';
import ShareButtons from '../SharedComponents/ShareButtons';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import NewDialog from 'components/NewDialog/NewDialog';
import { vulnerabilitiesModal } from 'cms-content/modals';
import { TextButton } from 'components/ButtonSystem';

const VulnerabilitiesBlock: React.FC<{
  scores: RegionCcviItem | null;
  region: Region;
}> = ({ scores, region }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);
  const { header, body, links } = vulnerabilitiesModal;

  if (!scores) {
    return null;
  }

  const containerProps = {
    collapsedHeightMobile: 350,
    collapsedHeightDesktop: 250,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities',
  };

  const percentPopulationVulnerable = getVulnPopulationPercentForFips(
    region.fipsCode,
  );
  const shareUrl = `${region.canonicalUrl}#vulnerabilities`;
  const shareQuote = getShareQuote(
    scores.overall,
    region,
    percentPopulationVulnerable,
  );

  return (
    <>
      <Header>
        <LocationPageSectionHeader>Vulnerabilities</LocationPageSectionHeader>
      </Header>
      <ExpandableContainer {...containerProps}>
        <VulnerabilitiesBlockInner
          scores={scores}
          region={region}
          percentPopulationVulnerable={percentPopulationVulnerable}
        />
      </ExpandableContainer>
      <LocationPageSectionFooter>
        <TextButton
          onClick={() => setDialogOpen(true)}
          trackingCategory={EventCategory.VULNERABILITIES}
          trackingLabel="Vulnerabilities modal"
        >
          About this data
        </TextButton>
        <NewDialog
          open={dialogOpen}
          closeDialog={closeDialog}
          header={header}
          body={body}
          links={links}
        />
        <ShareButtons
          eventCategory={EventCategory.VULNERABILITIES}
          shareUrl={shareUrl}
          shareQuote={shareQuote}
        />
      </LocationPageSectionFooter>
    </>
  );
};

export default VulnerabilitiesBlock;
