import React from 'react';
import MetricChartFooter from './MetricChartFooter';
import regions from 'common/regions';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';
import { useSummaries } from 'common/location_summaries';
import { Metric } from 'common/metricEnum';

export default {
  title: 'Location page redesign/Chart Footer',
};

const footerText = (
  <>
    Over the last week, Texas has averaged 3,173 new confirmed cases per day
    (10.9 for every 100,000 residents).
  </>
);
const header = 'This is the modal header.';
const body = 'This is the modal body.';
const links = [{ cta: 'Learn more', url: '/' }];
const region = regions.findByFipsCodeStrict('48');

export const MetricChartFooterWithDisclaimer = () => {
  const locationSummary = useSummaries()?.[48];
  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);
  const overrideDisclaimer =
    'Note that our daily new cases per 100k metric is different than the "adjusted case rate" metric used by Texas for determining reopening tier assignments. Their adjusted case rate is adjusted to account for testing levels.';
  return (
    <div>hello</div>
    // <MetricChartFooter
    //   footerText={footerText}
    //   overrideDisclaimer={overrideDisclaimer}
    //   shareButtonProps={{
    //     region: region,
    //     stats: stats,
    //     chartIdentifier: Metric.CASE_DENSITY,
    //     showEmbedButton: false,
    //   }}
    // />
  );
};

export const MetricChartFooterNoDisclaimer = () => {
  const locationSummary = useSummaries()?.[48];
  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);
  return (
    <div>hello</div>
    // <MetricChartFooter
    //   footerText={footerText}
    //   shareButtonProps={{
    //     region: region,
    //     stats: stats,
    //     chartIdentifier: Metric.CASE_DENSITY,
    //     showEmbedButton: false,
    //   }}
    // />
  );
};
