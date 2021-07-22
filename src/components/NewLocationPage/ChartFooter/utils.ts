import { Metric } from 'common/metricEnum';
import { Region } from 'common/regions';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { ExploreMetric } from 'components/Explore';
import {
  exploreMetricToFooterContentMap,
  MetricModalContent,
} from 'components/Dialogs';

export function getOverrideDisclaimer(
  region: Region,
  metric: Metric,
  provenance: Sources | undefined,
): string | undefined {
  return getRegionMetricOverride(region, metric)?.disclaimer;
}

export function getAddedMetricStatusText(
  metric: ExploreMetric,
  value: string,
  region: Region,
) {
  return `Over the last week, ${region.shortName} has averaged ${value} ${exploreMetricToFooterContentMap[metric].statusTextMeasure}.`;
}

export interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  modalContent: MetricModalContent;
  modalHeader: string;
}
