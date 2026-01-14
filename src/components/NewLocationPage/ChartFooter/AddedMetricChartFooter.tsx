/**
 * Chart footer for newly added chart metrics (deaths, hospitalizations, ICU hospitalizations)
 * TODO (chelsi) - implement a better naming convention for the files/components/utils that currently use 'Added'
 */

import React from 'react';
import {
  Row,
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
import { Region } from 'common/regions';
import type { Projections } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { EventCategory } from 'components/Analytics';
import { ExploreMetric } from 'components/Explore';
import { getAddedMetricStatusText, DialogProps } from './utils';
import Legend from 'components/Explore/Legend';

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
  formattedValue: string;
}> = ({ metric, region, projections, formattedValue }) => {
  const modalContent = getExploreMetricModalContent(region, metric);

  const statusText = getAddedMetricStatusText(
    metric,
    formattedValue,
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
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <Legend seriesList={series} />
        <FooterText>{statusText}</FooterText>
        <Row>
          <MetricModal {...dialogProps} />
        </Row>
      </MobileOnly>
    </Wrapper>
  );
};

export default AddedMetricChartFooter;
