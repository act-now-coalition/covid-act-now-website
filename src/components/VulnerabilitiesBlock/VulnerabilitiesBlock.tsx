import React from 'react';
import { Region } from 'common/regions';
import ExpandableContainer from 'components/ExpandableContainer';
import VulnerabilitiesBlockInner from './VulnerabilitiesBlockInner';
import { RegionCcviItem, getVulnPopulationPercentForFips } from 'common/data';
import { EventCategory } from 'components/Analytics';
import PageSectionFooter from 'components/SharedComponents/PageSectionFooter';
import { DialogMain } from 'components/Dialogs';
import { vulnerabilitiesModal } from 'cms-content/modals';
import { SectionHeader } from 'components/SharedComponents';
import { MarkdownBody } from 'components/Markdown';
import { useDialog } from 'common/hooks';
import {
  ModalButton,
  AboutText,
} from 'components/NewLocationPage/ChartFooter/ChartFooter.style';

const VulnerabilitiesBlock: React.FC<{
  scores: RegionCcviItem | null;
  region: Region;
}> = ({ scores, region }) => {
  const [isOpen, openDialog, closeDialog] = useDialog(
    false,
    EventCategory.VULNERABILITIES,
    'About this data modal',
  );

  const { header, body, links } = vulnerabilitiesModal;

  if (!scores) {
    return null;
  }

  const containerProps = {
    collapsedHeightMobile: '315px',
    collapsedHeightDesktop: '215px',
    tabTextCollapsed: <>More</>,
    tabTextExpanded: <>Less</>,
    trackingLabel: 'Vulnerabilities module',
    trackingCategory: EventCategory.VULNERABILITIES,
  };

  const percentPopulationVulnerable = getVulnPopulationPercentForFips(
    region.fipsCode,
  );

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
      <PageSectionFooter>
        <ModalButton onClick={openDialog}>
          <AboutText>About this data</AboutText>
        </ModalButton>
        <DialogMain
          open={isOpen}
          closeDialog={closeDialog}
          header={header}
          links={links}
        >
          <MarkdownBody source={body} />
        </DialogMain>
      </PageSectionFooter>
    </>
  );
};

export default VulnerabilitiesBlock;
