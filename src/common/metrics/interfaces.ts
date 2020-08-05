import React from 'react';
import { Projection } from 'common/models/Projection';

export interface MetricDefinition {
  renderStatus: (projection: Projection) => React.ReactElement;
}
