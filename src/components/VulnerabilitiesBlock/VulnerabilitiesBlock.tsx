import React, { useState } from 'react';
import { Region } from 'common/regions';
import ExpandableContainer from 'components/ExpandableContainer';
import VulnerabilitiesBlockInner from './VulnerabilitiesBlockInner';
import { getShareQuote } from 'common/ccvi/getShareQuote';
import { RegionCcviItem, getVulnPopulationPercentForFips } from 'common/data';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ShareButtons from '../SharedComponents/ShareButtons';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import { DialogMain } from 'components/Dialogs';
import { vulnerabilitiesModal } from 'cms-content/modals';
import { ModalOpenButton } from './VulnerabilitiesBlock.style';
import { SectionHeader } from 'components/SharedComponents';
import { MarkdownBody } from 'components/Markdown';

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
    collapsedHeightMobile: 315,
    collapsedHeightDesktop: 215,
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities module',
    trackingCategory: EventCategory.VULNERABILITIES,
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

  const modalOpenOnClick = () => {
    setDialogOpen(true);
    trackEvent(
      EventCategory.VULNERABILITIES,
      EventAction.OPEN_MODAL,
      'About this data modal',
    );
  };

  return (
    <>
      <SectionHeader>Vulnerabilities</SectionHeader>
      <ExpandableContainer {...containerProps}>
        <VulnerabilitiesBlockInner
          scores={scores}
          region={region}
          percentPopulationVulnerable={percentPopulationVulnerable}
        />
      </ExpandableContainer>
      <LocationPageSectionFooter>
        <ModalOpenButton onClick={modalOpenOnClick}>
          About this data
        </ModalOpenButton>
        <DialogMain
          open={dialogOpen}
          closeDialog={closeDialog}
          header={header}
          links={links}
        >
          <MarkdownBody source={body} />
        </DialogMain>
        <ShareButtons
          eventCategory={EventCategory.VULNERABILITIES}
          shareUrl={shareUrl}
          shareQuote={shareQuote}
          region={region}
        />
      </LocationPageSectionFooter>
    </>
  );
};

export default VulnerabilitiesBlock;
