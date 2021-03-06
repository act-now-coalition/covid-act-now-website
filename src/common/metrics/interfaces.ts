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

  /**
   * A string ID used to reference the metric, e.g. from
   * cms-content/region-overrides/region-overrides.json
   * For convention, I suggest using the full path to the metric in the API
   * (e.g. metrics.testPositivityRatio)
   */
  metricId: string;
  metricName: string;
  extendedMetricName: string;
  metricNameForCompare: string;

  renderThermometer: () => React.ReactElement;

  renderInfoTooltip: () => React.ReactElement;
}
