import React from 'react';
import {
  ChartDescription,
  BetaTag,
  DisclaimerWrapper,
} from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  getMetricNameExtended,
  getMetricStatusText,
  getMetricDefinition,
} from 'common/metric';
import { Metric } from 'common/metricEnum';
import MetricChart from 'components/Charts/MetricChart';
import { County, Region } from 'common/regions';
import { getSourcesForMetric } from 'common/utils/provenance';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { MarkdownContent } from 'components/Markdown';
import LocationPageSectionFooter from 'components/LocationPageSectionFooter/LocationPageSectionFooter';
import { SectionHeader } from 'components/SharedComponents';

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

  const metricDefinition = getMetricDefinition(metric);
  const chartHeaderTooltip = metricDefinition.renderInfoTooltip();
  const disclaimerContent = renderDisclaimer(region, metric, provenance);

  const chartHeight = isMobile ? 280 : 400;

  return (
    <>
      <SectionHeader ref={props.chartRef}>
        {getMetricNameExtended(metric)}
        <>{chartHeaderTooltip}</>
        {showBetaTag && <BetaTag>New</BetaTag>}
      </SectionHeader>
      <ChartDescription>
        {getMetricStatusText(metric, projections)}
      </ChartDescription>
      {hasMetric && (
        <>
          <MetricChart
            metric={metric}
            projections={projections}
            height={chartHeight}
          />
          <LocationPageSectionFooter>
            <DisclaimerWrapper>{disclaimerContent}</DisclaimerWrapper>
            <ShareButtons
              chartIdentifier={metric}
              region={region}
              stats={stats}
              showEmbedButton={false}
            />
          </LocationPageSectionFooter>
        </>
      )}
    </>
  );
}

export function renderDisclaimer(
  region: Region,
  metric: Metric,
  provenance: Sources | undefined,
) {
  const metricDefinition = getMetricDefinition(metric);
  const standardDisclaimer = metricDefinition.renderDisclaimer(
    region,
    provenance,
  );

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

  return (
    <>
      {overrideDisclaimer && <MarkdownContent source={overrideDisclaimer} />}
      {standardDisclaimer}
    </>
  );
}

export default ChartBlock;
