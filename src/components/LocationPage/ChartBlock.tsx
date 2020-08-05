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
import Outcomes from 'components/Outcomes/Outcomes';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  Metric,
  getMetricNameExtended,
  getMetricStatusText,
} from 'common/metric';
import { formatUtcDate } from 'common/utils';
import { metricFutureProjection } from 'common/metrics/future_projection';
import MetricChart from 'components/Charts/MetricChart';
import { COLORS } from 'common';

//TODO (chelsi): further unify mapped charts with future projections chart
//TODO (chelsi): clean out Outcomes component and only pass in what is still used
//TODO (chelsi): Use Projections.hasMetric() helper to get rid of the check for props.data

// Occasionally we need to disable projections for states due to temporary bugs.
const FUTURE_PROJECTIONS_DISABLED_STATES: string[] = ['HI'];

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

  let outcomesProjections = [
    props.projections.baseline,
    props.projections.projected,
  ];

  let outcomesColors = [COLORS.LIMITED_ACTION, COLORS.PROJECTED];

  const futureProjectionsDisabled =
    FUTURE_PROJECTIONS_DISABLED_STATES.includes(props.stateId) &&
    !props.countyId;
  const haveFutureProjections =
    !futureProjectionsDisabled &&
    props.projections.hasMetric(Metric.FUTURE_PROJECTIONS);

  return (
    <Fragment>
      {props.metric !== Metric.FUTURE_PROJECTIONS && (
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
              <MetricChart
                metric={props.metric}
                projections={props.projections}
              />
              <Disclaimer metricName={props.metric} />
            </>
          )}
        </Fragment>
      )}
      {props.metric === Metric.FUTURE_PROJECTIONS && (
        <Fragment>
          <ChartHeaderWrapper>
            <ChartHeader ref={props.chartRef}>
              Future Hospitalization (both ICU and non-ICU) Projections
            </ChartHeader>
            {!props.isMobile && haveFutureProjections && (
              <ShareButtons
                chartIdentifier={props.metric}
                {...props.shareButtonProps}
              />
            )}
          </ChartHeaderWrapper>
          <ChartLocationName>{projection.locationName}</ChartLocationName>
          {!haveFutureProjections ? (
            'Future hospitalization projections are not available.'
          ) : (
            <Fragment>
              <ChartDescription>
                {metricFutureProjection.renderStatus(props.projections)}
              </ChartDescription>
              {props.isMobile && (
                <ShareButtons
                  chartIdentifier={props.metric}
                  {...props.shareButtonProps}
                />
              )}
              <MetricChart
                metric={props.metric}
                projections={props.projections}
              />
              <Outcomes
                title={`Predicted outcomes by ${formatUtcDate(
                  props.projections.projected.finalDate,
                )} (30 days from now)`}
                projections={outcomesProjections}
                colors={outcomesColors}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ChartBlock;
