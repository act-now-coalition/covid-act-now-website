import React from 'react';
import ModelChart from '../components/Charts/ModelChart';
import * as dataNv from './data-nv';
import * as dataMd from './data-md';

const lastUpdated = new Date('2020-04-22');

export default {
  title: 'ModelChart',
  component: ModelChart,
};

export const Nevada = () => (
  <ModelChart
    projections={dataNv.projections}
    stateId={dataNv.stateId}
    lastUpdatedDate={lastUpdated}
  />
);

export const Maryland = () => (
  <ModelChart
    projections={dataMd.projections}
    stateId={dataMd.stateId}
    lastUpdatedDate={lastUpdated}
  />
);
