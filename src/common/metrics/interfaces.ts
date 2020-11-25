import React from 'react';
import { Projections } from 'common/models/Projections';

export interface MetricDefinition {
  renderStatus: (projections: Projections) => React.ReactElement;
  renderDisclaimer: (projections: Projections) => React.ReactElement;
  metricName: string;
  extendedMetricName: string;
  metricNameForCompare: string;

  // TODO(michael): This seems to be unused. We should probably remove it!
  renderThermometer: () => React.ReactElement;
}
