import { Markdown } from '../utils';
import infoToolTipContent from './info-tooltips.json';
import metricCaculationTooltipContent from './metric-calculation-tooltips.json';
import { Metric } from 'common/metricEnum';
import { assert } from 'common/utils';

export interface Tooltip {
  title: string;
  id: string;
  body: Markdown;
  cta: Markdown;
}

function getTooltipContentById(id: string, tooltipSet: Tooltip[]): Tooltip {
  const content = tooltipSet.find((item: Tooltip) => item.id === id);
  assert(content, `Info tooltip content unexpectedly not found for id: ${id}`);
  return content;
}

interface MetricTooltipObj {
  metricDefinition: Tooltip;
  metricCalculation: Tooltip;
}

type MetricToTooltipContentMap = {
  [key in Metric]: MetricTooltipObj;
};

function getMetricMapById(id: string): MetricTooltipObj {
  return {
    metricDefinition: getTooltipContentById(id, infoToolTipContent.tooltip),
    metricCalculation: getTooltipContentById(
      id,
      metricCaculationTooltipContent.tooltip,
    ),
  };
}

export const metricToTooltipMap: MetricToTooltipContentMap = {
  [Metric.CASE_DENSITY]: getMetricMapById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: getMetricMapById('infection-rate'),
  [Metric.POSITIVE_TESTS]: getMetricMapById('positive-test-rate'),
  [Metric.VACCINATIONS]: getMetricMapById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: getMetricMapById('icu-capacity-used'),
};

export const locationPageHeaderTooltipContent: Tooltip = getTooltipContentById(
  'location-page-header',
  infoToolTipContent.tooltip,
);
