import React from 'react';
import { BetaTag } from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import { getMetricNameExtended } from 'common/metric';
import { Metric } from 'common/metricEnum';
import MetricChart from 'components/Charts/MetricChart';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';
import MetricChartFooter from 'components/NewLocationPage/ChartFooter/MetricChartFooter';

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  region: Region;
  stats: any;
  metric: Metric;
  projections: Projections;
}) {
  const { projections, metric, isMobile, region, stats } = props;

  const showBetaTag = metric === Metric.VACCINATIONS;

  const hasMetric = projections.hasMetric(metric);

  const chartHeight = isMobile ? 280 : 400;

  return (
    <>
      <SectionHeader ref={props.chartRef}>
        {getMetricNameExtended(metric)}
        {showBetaTag && <BetaTag>New</BetaTag>}
      </SectionHeader>
      {hasMetric && (
        <>
          <MetricChart
            metric={metric}
            projections={projections}
            height={chartHeight}
          />
          <MetricChartFooter
            metric={metric}
            projections={projections}
            region={region}
            stats={stats}
          />
        </>
      )}
    </>
  );
}

export default ChartBlock;
