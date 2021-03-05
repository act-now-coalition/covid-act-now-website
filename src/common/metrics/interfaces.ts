import React from 'react';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { Projections } from 'common/models/Projections';
import { Region } from 'common/regions';

export interface MetricDefinition {
  renderStatus: (projections: Projections) => React.ReactElement;
  renderDisclaimer: (
    region: Region,
    provenance?: Sources,
  ) => React.ReactElement;
  metricName: string;
  extendedMetricName: string;
  metricNameForCompare: string;

  renderThermometer: () => React.ReactElement;

  renderInfoTooltip: () => React.ReactElement;
}
