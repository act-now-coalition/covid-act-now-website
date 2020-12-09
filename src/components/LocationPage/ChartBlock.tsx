import React, { Fragment } from 'react';
import {
  ChartHeader,
  ChartDescription,
  BetaTag,
  ChartHeaderWrapper,
} from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  Metric,
  getMetricNameExtended,
  getMetricStatusText,
} from 'common/metric';
import MetricChart from 'components/Charts/MetricChart';
import { Subtitle1 } from 'components/Typography';
import { Region } from 'common/regions';

//TODO (chelsi): Use Projections.hasMetric() helper to get rid of the check for props.data

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: Boolean;
  region: Region;
  stats: any;
  metric: Metric;
  projections: Projections;
}) {
  const { projections, metric, isMobile, region, stats } = props;

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
            region={region}
            stats={stats}
            isMobile={isMobile}
          />
        )}
      </ChartHeaderWrapper>
      <Subtitle1>{region.fullName}</Subtitle1>
      <ChartDescription>
        {getMetricStatusText(metric, projections)}
      </ChartDescription>
      {hasMetric && isMobile && (
        <ShareButtons
          chartIdentifier={metric}
          region={region}
          stats={stats}
          isMobile={isMobile}
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
