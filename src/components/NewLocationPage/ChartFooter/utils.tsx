import { Metric } from 'common/metricEnum';
import { Region } from 'common/regions';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { ExploreMetric } from 'components/Explore';
import {
  exploreMetricToFooterContentMap,
  MetricModalContent,
} from 'components/Dialogs';
import React from 'react';

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
  if (metric === ExploreMetric.DEATHS) {
    return (
      <>
        Over the last week, {region.shortName} has avoided{' '}
        <strong>
          {value} {exploreMetricToFooterContentMap[metric].statusTextMeasure}
        </strong>
        .
      </>
    );
  }
  return `Over the last week, ${region.shortName} retired ${value} natural gas customers.`;
}

export interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  modalContent: MetricModalContent;
  modalHeader: string;
}
