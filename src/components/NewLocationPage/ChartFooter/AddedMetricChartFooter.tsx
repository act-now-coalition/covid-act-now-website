/**
 * Chart footer for newly added chart metrics (deaths, hospitalizations, ICU hospitalizations)
 * TODO (chelsi) - implement a better naming convention for the files/components/utils that currently use 'Added'
 */

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
  getExploreMetricModalContent,
} from 'components/Dialogs';
import { getAllSeriesForMetric } from 'components/Explore/utils';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { Region } from 'common/regions';
import type { Projections } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { EventCategory } from 'components/Analytics';
import { ExploreMetric } from 'components/Explore';
import { getAddedMetricStatusText, DialogProps } from './utils';
import Legend from 'components/Explore/Legend';
import { ValueInfo } from 'components/Charts/Groupings';

const ShareButtonBlock: React.FC<{ region: Region; metric: ExploreMetric }> = ({
  region,
  metric,
}) => {
  const metricToShareQuoteName: { [key: number]: string } = {
    [ExploreMetric.DEATHS]: 'Daily COVID deaths',
    [ExploreMetric.ICU_HOSPITALIZATIONS]: 'Current COVID ICU hospitalizations',
    [ExploreMetric.HOSPITALIZATIONS]: 'Current COVID hospitalizations',
  };

  const shareUrl = region.canonicalUrl;
  const shareQuote = `${metricToShareQuoteName[metric]}, vaccination progress, and other key metrics for ${region.fullName} at @CovidActNow: `;

  const props = {
    shareUrl,
    shareQuote,
    region,
  };

  return (
    <ButtonContainer>
      <ShareButtons {...props} />
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
  valueInfo: ValueInfo;
}> = ({ metric, region, projections, valueInfo }) => {
  const modalContent = getExploreMetricModalContent(region, metric);

  const statusText = getAddedMetricStatusText(
    metric,
    valueInfo,
    region,
    projections,
  );

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

  const shareProps = { region, metric };
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
          <ShareButtonBlock {...shareProps} />
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <Legend seriesList={series} />
        <FooterText>{statusText}</FooterText>
        <Row>
          <MetricModal {...dialogProps} />
          <ShareButtonBlock {...shareProps} />
        </Row>
      </MobileOnly>
    </Wrapper>
  );
};

export default AddedMetricChartFooter;
