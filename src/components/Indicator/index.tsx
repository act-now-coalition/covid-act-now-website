import React, { FunctionComponent } from 'react';
import { Projection } from 'common/models/Projection';
import { Metric } from 'common/metric';

import caseIncidence from './case_incidence';

export const IndicatorStatus: FunctionComponent<{
  metric: Metric;
  projection: Projection;
}> = ({ metric, projection }) => {
  switch (metric) {
    case Metric.CASE_DENSITY:
      return caseIncidence.renderStatus(projection);
    default:
      return <span>Error</span>;
  }
};
