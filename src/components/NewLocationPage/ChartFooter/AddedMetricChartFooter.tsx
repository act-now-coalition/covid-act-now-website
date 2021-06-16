import React from 'react';
import {
  Row,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
  Wrapper,
} from './ChartFooter.style';
import {
  DialogMain,
  MetricInfoDialogInner,
  MetricModalContent,
  getExploreMetricModalContent,
} from 'components/Dialogs';
import { getAllSeriesForMetric } from 'components/Explore/utils';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { Region } from 'common/regions';
import type { MetricValues, Projections } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { EventCategory } from 'components/Analytics';
import { ExploreMetric } from 'components/Explore';
import { getAddedMetricStatusText } from './utils';
import Legend from 'components/Explore/Legend';

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

const AddedMetricChartFooter: React.FC<{
  metric: ExploreMetric;
  projections: Projections;
  region: Region;
  stats: MetricValues;
  formattedValue: string;
}> = ({ metric, region, stats, formattedValue, projections }) => {
  const modalContent = getExploreMetricModalContent(region, metric);

  const shareButtonProps = {
    chartIdentifier: metric,
    region,
    stats,
    showEmbedButton: false,
  };

  const statusText = getAddedMetricStatusText(metric, formattedValue, region);

  const [isOpen, openDialog, closeDialog] = useDialog(
    false,
    EventCategory.METRICS,
    `Footer modal: ${modalContent.metricName}`,
  );

  const dialogProps = {
    open: isOpen,
    closeDialog,
    openDialog,
    modalContent,
    modalHeader: modalContent.metricName,
  };

  const series = getAllSeriesForMetric(metric, projections.primary);

  return (
    <Wrapper>
      <DesktopOnly>
        <Legend seriesList={series} />
        <Row>
          <FooterText>
            {statusText}
            {'   '}
            <MetricModal {...dialogProps} />
          </FooterText>
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <Legend seriesList={series} />
        <FooterText>{statusText}</FooterText>
        <Row>
          <MetricModal {...dialogProps} />
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </MobileOnly>
    </Wrapper>
  );
};

export default AddedMetricChartFooter;
