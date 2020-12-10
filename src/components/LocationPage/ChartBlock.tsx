import React, { Fragment } from 'react';
import {
  ChartHeader,
  ChartDescription,
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
import { Subtitle1 } from 'components/Typography';
import { County } from 'common/locations';

//TODO (chelsi): Use Projections.hasMetric() helper to get rid of the check for props.data

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: Boolean;
  county: County | undefined;
  stats: any;
  metric: Metric;
  projections: Projections;
  stateId: string;
  countyId: string | undefined;
}) {
  const {
    projections,
    metric,
    isMobile,
    county,
    stats,
    stateId,
    countyId,
  } = props;
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
          <ShareButtons
            chartIdentifier={metric}
            stats={stats}
            isMobile={isMobile}
            stateId={stateId}
            county={county}
            countyId={countyId}
          />
        )}
      </ChartHeaderWrapper>
      <Subtitle1>{projection.locationName}</Subtitle1>
      <ChartDescription>
        {getMetricStatusText(metric, projections)}
      </ChartDescription>
      {hasMetric && isMobile && (
        <ShareButtons
          chartIdentifier={metric}
          stats={stats}
          isMobile={isMobile}
          stateId={stateId}
          county={county}
          countyId={countyId}
        />
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
