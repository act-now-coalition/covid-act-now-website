import React from 'react';
import ModelChart from '../components/Charts/ModelChart';
import * as data from './data';
import stateDataWrapper from './stateDataWrapper';

const lastUpdated = new Date('2020-04-22');

export default {
  title: 'ModelChart',
  component: ModelChart,
};

export const Nevada = stateDataWrapper(
  ({ data }) => (
    <ModelChart
      projections={data}
      stateId={data.NV.stateId}
      lastUpdatedDate={lastUpdated}
    />
  ),
  data.NV,
);

export const Maryland = stateDataWrapper(
  ({ data }) => (
    <ModelChart
      projections={data}
      stateId={data.MD.stateId}
      lastUpdatedDate={lastUpdated}
    />
  ),
  data.MD,
);
