import React from 'react';
import { Projections } from 'common/models/Projections';

export interface MetricDefinition {
  renderStatus: (projections: Projections) => React.ReactElement;

  metricName: string;
  extendedMetricName: string;
  metricNameForCompare: string;
  metricNameForSummaryStat: string;

  renderThermometer: () => React.ReactElement;

  renderInfoTooltip: () => React.ReactElement;
}
