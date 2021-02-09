import { Markdown } from '../utils';
import toolTipContent from './info-tooltips.json';
import { Metric } from 'common/metric';
import { assert } from 'common/utils';

export interface InfoTooltip {
  title: string;
  id: string;
  body: Markdown;
  cta: Markdown;
}

function findContentById(id: string): InfoTooltip {
  const tooltipContent = toolTipContent.tooltip.find(
    (item: InfoTooltip) => item.id === id,
  );
  assert(
    tooltipContent,
    `Tooltip content unexpectedly not found for id: ${id}`,
  );
  return tooltipContent;
}

export const locationPageHeaderTooltipContent: InfoTooltip = findContentById(
  'location-page-header',
);

type MetricToTooltipContent = {
  [key in Metric]: InfoTooltip;
};

export const metricToTooltipContentMap: MetricToTooltipContent = {
  [Metric.CASE_DENSITY]: findContentById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: findContentById('infection-rate'),
  [Metric.POSITIVE_TESTS]: findContentById('positive-test-rate'),
  [Metric.VACCINATIONS]: findContentById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: findContentById('icu-capacity-used'),
};
