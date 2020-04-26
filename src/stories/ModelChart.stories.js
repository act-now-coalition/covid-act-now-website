import React, { useState, useEffect } from 'react';
import ModelChart from '../components/Charts/ModelChart';
import * as dataNv from './data-nv';
import * as dataMd from './data-md';
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
      stateId={dataNv.stateId}
      lastUpdatedDate={lastUpdated}
    />
  ),
  dataNv,
);

export const Maryland = stateDataWrapper(
  ({ data }) => (
    <ModelChart
      projections={data}
      stateId={dataMd.stateId}
      lastUpdatedDate={lastUpdated}
    />
  ),
  dataMd,
);
