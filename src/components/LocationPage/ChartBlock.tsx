import React from 'react';
import { BetaTag } from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import { getMetricNameExtended, getMetricStatusText } from 'common/metric';
import { Metric } from 'common/metricEnum';
import MetricChart from 'components/Charts/MetricChart';
import { County, Region } from 'common/regions';
import { getSourcesForMetric } from 'common/utils/provenance';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { SectionHeader } from 'components/SharedComponents';
import MetricChartFooter from 'components/NewLocationPage/ChartFooter/MetricChartFooter';
import { getMetricModalContent } from 'components/Dialogs/utils';

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  region: Region;
  stats: any;
  metric: Metric;
  projections: Projections;
}) {
  const { projections, metric, isMobile, region, stats } = props;

  const provenance = getSourcesForMetric(
    projections.primary.annotations,
    metric,
  );

  const showBetaTag = metric === Metric.VACCINATIONS;

  const hasMetric = projections.hasMetric(metric);

  const overrideDisclaimer = getOverrideDisclaimer(region, metric, provenance);

  const chartHeight = isMobile ? 280 : 400;

  const shareButtonProps = {
    chartIdentifier: metric,
    region,
    stats,
    showEmbedButton: false,
  };

  const modalContent = getMetricModalContent(region, metric, provenance);

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
            footerText={getMetricStatusText(metric, projections)}
            overrideDisclaimer={overrideDisclaimer}
            shareButtonProps={shareButtonProps}
            modalContent={modalContent}
            modalHeader={getMetricNameExtended(metric)}
            modalLinks={[]}
          />
        </>
      )}
    </>
  );
}

export function getOverrideDisclaimer(
  region: Region,
  metric: Metric,
  provenance: Sources | undefined,
): string | undefined {
  // Preface with any region override disclaimer text.
  let overrideDisclaimer = getRegionMetricOverride(region, metric)?.disclaimer;

  if (
    !overrideDisclaimer &&
    region instanceof County &&
    metric === Metric.VACCINATIONS &&
    provenance?.[0]?.url?.includes('cdc.gov')
  ) {
    // CDC doesn't have first dose data so we must be estimating it.
    overrideDisclaimer = `Note that data for ${region.name} is sourced from the CDC
    which only provides data on fully-vaccinated people and therefore the "1+
    dose" data above is approximated using the fully-vaccinated data and a
    state-wide average ratio.`;
  }

  return overrideDisclaimer;
}

export default ChartBlock;
