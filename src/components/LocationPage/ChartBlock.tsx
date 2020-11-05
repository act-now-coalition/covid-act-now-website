import React, { Fragment } from 'react';
import {
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  Metric,
  getMetricNameExtended,
  getMetricStatusText,
} from 'common/metric';
import MetricChart from 'components/Charts/MetricChart';

//TODO (chelsi): Use Projections.hasMetric() helper to get rid of the check for props.data

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: Boolean;
  shareButtonProps: { [key: string]: any };
  metric: Metric;
  projections: Projections;
  stateId: string;
}) {
  const { projections, metric, isMobile } = props;
  const projection: Projection = projections.primary;

  const showBetaTag =
    metric === Metric.HOSPITAL_USAGE || metric === Metric.CONTACT_TRACING;

  const hasMetric = projections.hasMetric(metric);

  return (
    <Fragment>
      <ChartHeaderWrapper>
        <ChartHeader ref={props.chartRef}>
          {getMetricNameExtended(metric)}
          {showBetaTag && <BetaTag>Beta</BetaTag>}
        </ChartHeader>
        {hasMetric && !isMobile && (
          <ShareButtons chartIdentifier={metric} {...props.shareButtonProps} />
        )}
      </ChartHeaderWrapper>
      <ChartLocationName>{projection.locationName}</ChartLocationName>
      <ChartDescription>
        {getMetricStatusText(metric, projections)}
      </ChartDescription>
      {hasMetric && isMobile && (
        <ShareButtons chartIdentifier={metric} {...props.shareButtonProps} />
      )}
      {hasMetric && (
        <>
          <MetricChart metric={metric} projections={projections} />
          <Disclaimer metricName={metric} projections={projections} />
        </>
      )}
    </Fragment>
  );
}

export default ChartBlock;
