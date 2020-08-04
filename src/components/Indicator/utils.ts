import React from 'react';
import { Projection } from 'common/models/Projection';

export interface Indicator {
  renderStatus: (projection: Projection) => React.ReactElement;
}
