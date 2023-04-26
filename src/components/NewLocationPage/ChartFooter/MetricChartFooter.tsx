import React from 'react';
import urlJoin from 'url-join';
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
  getMetricModalContent,
} from 'components/Dialogs';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { DialogProps } from './utils';
import { Region } from 'common/regions';
import type { MetricValues, Projections } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { Metric } from 'common/metricEnum';
import { getSourcesForMetric } from 'common/utils/provenance';
import { getMetricNameExtended, getMetricStatusText } from 'common/metric';
import { EventCategory } from 'components/Analytics';
import { makeChartShareQuote } from 'common/utils/makeChartShareQuote';
import * as urls from 'common/urls';
import { MarkdownContent } from 'components/Markdown';
import {
  getRegionMetricDisclaimer,
  getRegionMetricOverride,
} from 'cms-content/region-overrides';
import { getDataset, isEmpty } from 'common/models/ProjectionsPair';

const ShareButtonBlock: React.FC<{
  region: Region;
  stats: MetricValues;
  chartIdentifier: number;
}> = ({ region, chartIdentifier, stats }) => {
  const shareBaseURL = region.canonicalUrl;
  const shareUrl = urls.addSharingId(
    urlJoin(shareBaseURL, `chart/${chartIdentifier}`),
  );
  const shareQuote = makeChartShareQuote(
    region.fullName,
    stats,
    chartIdentifier,
  );

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
    links: [
      {
        cta: 'Learn more',
        url: modalContent.learnLink || '/covid-community-level-metrics',
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
  stats: MetricValues;
}> = ({ metric, projections, region, stats }) => {
  const provenance = getSourcesForMetric(
    projections.primary.annotations,
    metric,
  );
  const overrideDisclaimer = getRegionMetricDisclaimer(region, metric);
  const modalContent = getMetricModalContent(region, metric, provenance);
  const metricName = getMetricNameExtended(metric);
  const isBlocked = getRegionMetricOverride(region, metric)?.blocked;
  const timeseries = getDataset(projections.primary, metric);
  const timeseriesEmpty = isEmpty(timeseries);

  const shareButtonProps = {
    chartIdentifier: metric,
    region,
    stats,
  };

  const footerText = getMetricStatusText(metric, projections);

  const [isOpen, openDialog, closeDialog] = useDialog(
    false,
    EventCategory.METRICS,
    `Footer modal: ${metricName}`,
  );

  const dialogProps = {
    open: isOpen,
    closeDialog,
    openDialog,
    modalContent,
    modalHeader: metricName,
  };

  // If the metric is blocked or the timeseries is empty, don't render the footer
  // because the chart will be blocked, and the disclaimer/footer will be displayed on the chart.
  return isBlocked || timeseriesEmpty ? (
    <></>
  ) : (
    <Wrapper>
      <DesktopOnly>
        <Row>
          <FooterText>
            {footerText}
            {'   '}
            <MetricModal {...dialogProps} />
            {overrideDisclaimer && (
              <OverrideDisclaimer>
                <MarkdownContent>{overrideDisclaimer}</MarkdownContent>
              </OverrideDisclaimer>
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
