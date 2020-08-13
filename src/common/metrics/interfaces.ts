import React from 'react';
import { Projections } from 'common/models/Projections';

export interface MetricDefinition {
  renderStatus: (projections: Projections) => React.ReactElement;
  renderDisclaimer: () => React.ReactElement;
  metricName: string;
  extendedMetricName: string;
  metricNameForCompare: string;
}
