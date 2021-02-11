import { Markdown } from '../utils';
import infoToolTipContent from './info-tooltips.json';
import metricCaculationTooltipContent from '../metric-calculation-tooltips.json';
import { Metric } from 'common/metricEnum';
import { assert } from 'common/utils';

export interface Tooltip {
  title: string;
  id: string;
  body: Markdown;
  cta: Markdown;
}

function findContentById(id: string): Tooltip {
  const tooltipContent = infoToolTipContent.tooltip.find(
    (item: Tooltip) => item.id === id,
  );
  assert(
    tooltipContent,
    `Tooltip content unexpectedly not found for id: ${id}`,
  );
  return tooltipContent;
}

function findCalculationContentById(id: string): Tooltip {
  const tooltipContent = metricCaculationTooltipContent.tooltip.find(
    (item: Tooltip) => item.id === id,
  );
  assert(
    tooltipContent,
    `Tooltip content unexpectedly not found for id: ${id}`,
  );
  return tooltipContent;
}

export const locationPageHeaderTooltipContent: Tooltip = findContentById(
  'location-page-header',
);

type MetricToTooltipContent = {
  [key in Metric]: Tooltip;
};

export const metricToTooltipContentMap: MetricToTooltipContent = {
  [Metric.CASE_DENSITY]: findContentById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: findContentById('infection-rate'),
  [Metric.POSITIVE_TESTS]: findContentById('positive-test-rate'),
  [Metric.VACCINATIONS]: findContentById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: findContentById('icu-capacity-used'),
};

export const metricToCalculationTooltipContentMap: MetricToTooltipContent = {
  [Metric.CASE_DENSITY]: findCalculationContentById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: findCalculationContentById('infection-rate'),
  [Metric.POSITIVE_TESTS]: findCalculationContentById('positive-test-rate'),
  [Metric.VACCINATIONS]: findCalculationContentById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: findCalculationContentById('icu-capacity-used'),
};
