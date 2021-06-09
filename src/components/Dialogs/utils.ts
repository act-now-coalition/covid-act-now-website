import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { Metric } from 'common/metricEnum';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region } from 'common/regions';
import { getDataSourceTooltipContent } from 'common/utils/provenance';

export interface MetricModalContent {
  howItsCalculated: string;
  dataSource?: React.ReactElement;
  metricDefinition: string;
  learnLink: string;
}

const metricToLearnLink: { [key in Metric]: string } = {
  [Metric.CASE_DENSITY]: '/covid-risk-levels-metrics#daily-new-cases',
  [Metric.CASE_GROWTH_RATE]: '/covid-risk-levels-metrics#infection-rate',
  [Metric.HOSPITAL_USAGE]: '/covid-risk-levels-metrics#icu-capacity-used',
  [Metric.POSITIVE_TESTS]: '/covid-risk-levels-metrics#positive-test-rate',
  [Metric.VACCINATIONS]: '/covid-risk-levels-metrics#percent-vaccinated',
};

export function getMetricModalContent(
  region: Region,
  metric: Metric,
  provenance?: Sources,
): MetricModalContent {
  const howItsCalculated = metricToTooltipMap[metric].metricCalculation.body;

  const dataSource = getDataSourceTooltipContent(metric, region, provenance);

  const metricDefinition = metricToTooltipMap[metric].metricDefinition.body;

  const learnLink = metricToLearnLink[metric];

  const modalContent = {
    howItsCalculated,
    dataSource,
    metricDefinition,
    learnLink,
  };

  return modalContent;
}
