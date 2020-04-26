import React from 'react';
import LocationPageHeader from '../components/LocationPageHeader/LocationPageHeader';
import * as dataNv from './data-nv';
import * as dataMd from './data-md';
import stateDataWrapper from './stateDataWrapper';

export default {
  title: 'LocationPageHeader',
  component: LocationPageHeader,
};

export const Nevada = stateDataWrapper(
  ({ data }) => <LocationPageHeader projections={data} />,
  dataNv,
);

export const Maryland = stateDataWrapper(
  ({ data }) => <LocationPageHeader projections={data} />,
  dataMd,
);
