import React from 'react';
import LocationPageHeader from '../components/LocationPageHeader/LocationPageHeader';
import * as dataNv from './data-nv';
import * as dataMd from './data-md';

export default {
  title: 'LocationPageHeader',
  component: LocationPageHeader,
};

export const Nevada = () => (
  <LocationPageHeader projections={dataNv.projections} />
);

export const Maryland = () => (
  <LocationPageHeader projections={dataMd.projections} />
);
