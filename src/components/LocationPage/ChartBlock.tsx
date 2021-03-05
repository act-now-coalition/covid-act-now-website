import React, { Fragment } from 'react';
import {
  LocationPageSectionHeader,
  ChartDescription,
  BetaTag,
  HeaderWrapper,
} from './ChartsHolder.style';
import { Projections } from 'common/models/Projections';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import ShareButtons from 'components/LocationPage/ShareButtons';
import {
  getMetricNameExtended,
  getMetricStatusText,
  getMetricDefinition,
} from 'common/metric';
import { Metric } from 'common/metricEnum';
import MetricChart from 'components/Charts/MetricChart';
import { Subtitle1 } from 'components/Typography';
import { Region } from 'common/regions';
import { getSourcesForMetric } from 'components/Disclaimer/utils';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { MarkdownContent } from 'components/Markdown';

function ChartBlock(props: {
  chartRef: React.RefObject<HTMLDivElement>;
  isMobile: Boolean;
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

  return (
    <Fragment>
      <HeaderWrapper>
        <LocationPageSectionHeader ref={props.chartRef}>
          {getMetricNameExtended(metric)}
          <>{chartHeaderTooltip}</>
          {showBetaTag && <BetaTag>New</BetaTag>}
        </LocationPageSectionHeader>
        {hasMetric && !isMobile && (
          <ShareButtons
            chartIdentifier={metric}
            region={region}
            stats={stats}
            isMobile={isMobile}
          />
        )}
      </HeaderWrapper>
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
          <Disclaimer disclaimerContent={disclaimerContent} />
        </>
      )}
    </Fragment>
  );
}

function renderDisclaimer(
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
  const overrideDisclaimer = getRegionMetricOverride(region, metric)
    ?.disclaimer;
  return (
    <>
      {overrideDisclaimer && <MarkdownContent source={overrideDisclaimer} />}
      {standardDisclaimer}
    </>
  );
}

export default ChartBlock;
