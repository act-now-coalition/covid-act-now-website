import React from 'react';
import {
  Row,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
  Wrapper,
  OverrideDisclaimer,
} from './ChartFooter.style';
import {
  DialogMain,
  MetricInfoDialogInner,
  MetricModalContent,
  getMetricModalContent,
} from 'components/Dialogs';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { getOverrideDisclaimer } from './utils';
import { Region } from 'common/regions';
import type { MetricValues, Projections } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { Metric } from 'common/metricEnum';
import { getSourcesForMetric } from 'common/utils/provenance';
import { getMetricName, getMetricStatusText } from 'common/metric';

export interface ShareButtonProps {
  region: Region;
  stats: MetricValues;
  chartIdentifier: number;
  showEmbedButton?: boolean;
}

interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  modalContent: MetricModalContent;
  modalHeader: string;
}

const ShareButtonBlock: React.FC<ShareButtonProps> = shareButtonProps => {
  return (
    <ButtonContainer>
      <ShareButtons {...shareButtonProps} />
    </ButtonContainer>
  );
};

const MetricModal: React.FC<DialogProps> = ({
  open,
  closeDialog,
  openDialog,
  modalContent,
  modalHeader,
}) => {
  const dialogProps = {
    open,
    closeDialog,
    header: modalHeader,
    links: [
      {
        cta: 'Learn more',
        url: modalContent.learnLink,
        ariaLabel: `Learn more about ${modalHeader}`,
      },
    ],
  };

  return (
    <>
      <ModalButton onClick={openDialog}>
        <AboutText>About this data</AboutText>
      </ModalButton>
      <DialogMain {...dialogProps}>
        <MetricInfoDialogInner modalContent={modalContent} />
      </DialogMain>
    </>
  );
};

const MetricChartFooter: React.FC<{
  metric: Metric;
  projections: Projections;
  region: Region;
  stats: any;
}> = ({ metric, projections, region, stats }) => {
  const provenance = getSourcesForMetric(
    projections.primary.annotations,
    metric,
  );
  const overrideDisclaimer = getOverrideDisclaimer(region, metric, provenance);
  const modalContent = getMetricModalContent(region, metric, provenance);
  const modalHeader = getMetricName(metric);

  const shareButtonProps = {
    chartIdentifier: metric,
    region,
    stats,
    showEmbedButton: false,
  };

  const footerText = getMetricStatusText(metric, projections);

  const [isOpen, openDialog, closeDialog] = useDialog(false);

  const dialogProps = {
    open: isOpen,
    closeDialog,
    openDialog,
    modalContent,
    modalHeader,
  };

  return (
    <Wrapper>
      <DesktopOnly>
        <Row>
          <FooterText>
            {footerText}
            {'   '}
            <MetricModal {...dialogProps} />
            {overrideDisclaimer && (
              <OverrideDisclaimer>{overrideDisclaimer}</OverrideDisclaimer>
            )}
          </FooterText>
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <FooterText>
          {footerText}
          {overrideDisclaimer && (
            <OverrideDisclaimer>{overrideDisclaimer}</OverrideDisclaimer>
          )}
        </FooterText>
        <Row>
          <MetricModal {...dialogProps} />
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </MobileOnly>
    </Wrapper>
  );
};

export default MetricChartFooter;
