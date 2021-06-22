import React from 'react';
import VaccinationsTable from './VaccinationsTable';
import { MapView } from 'screens/HomePage/HomePage';

export default {
  title: 'Shared Components/Vaccinations Table',
  component: VaccinationsTable,
};

export const Counties = () => {
  return <VaccinationsTable mapView={MapView.COUNTIES} />;
};

export const States = () => {
  return <VaccinationsTable mapView={MapView.STATES} />;
};
