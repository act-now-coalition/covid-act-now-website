import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { Metric } from 'common/metricEnum';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region } from 'common/regions';
import { getDataSourceTooltipContent } from 'common/utils/provenance';

export interface MetricModalContent {
  howItsCalculated: string;
  dataSource?: any;
  metricDefinition: string;
}

export function getMetricModalContent(
  region: Region,
  metric: Metric, // plug into metric
  provenance?: Sources,
): MetricModalContent {
  const howItsCalculated =
    metricToTooltipMap[Metric.CASE_DENSITY].metricCalculation.body;

  const dataSource = getDataSourceTooltipContent(
    Metric.CASE_DENSITY,
    region,
    provenance,
  );

  const metricDefinition =
    metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition.body;

  const modalContent = {
    howItsCalculated,
    dataSource,
    metricDefinition,
  };

  return modalContent;
}
