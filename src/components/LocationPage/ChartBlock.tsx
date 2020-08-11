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
  data?: any;
  stateId: string;
  countyId?: string;
}) {
  const projection: Projection = props.projections.primary;

  const showBetaTag =
    props.metric === Metric.HOSPITAL_USAGE ||
    props.metric === Metric.CONTACT_TRACING;

  return (
    <Fragment>
      <ChartHeaderWrapper>
        <ChartHeader ref={props.chartRef}>
          {getMetricNameExtended(props.metric)}
          {showBetaTag && <BetaTag>Beta</BetaTag>}
        </ChartHeader>
        {!props.isMobile && props.data && (
          <ShareButtons
            chartIdentifier={props.metric}
            {...props.shareButtonProps}
          />
        )}
      </ChartHeaderWrapper>
      <ChartLocationName>{projection.locationName}</ChartLocationName>
      <ChartDescription>
        {getMetricStatusText(props.metric, props.projections)}
      </ChartDescription>
      {props.isMobile && props.data && (
        <ShareButtons
          chartIdentifier={props.metric}
          {...props.shareButtonProps}
        />
      )}
      {props.data && (
        <>
          <MetricChart metric={props.metric} projections={props.projections} />
          <Disclaimer metricName={props.metric} />
        </>
      )}
    </Fragment>
  );
}

export default ChartBlock;
