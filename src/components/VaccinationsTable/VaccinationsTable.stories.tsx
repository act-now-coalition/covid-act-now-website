import React from 'react';
import { MapView } from 'screens/HomePage/HomePage';
import VaccinationsTable from './VaccinationsTable';

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
