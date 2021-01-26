import React from 'react';
import { StateVaccineData } from 'cms-content/vaccines';
import VaccineDetails from './index';
import regions from 'common/regions';
import { VaccineDetailsContent } from './VaccineDetails';

export default {
  title: 'Vaccine Components/Vaccine Details',
  component: VaccineDetails,
};

const MA_DATA: StateVaccineData = {
  state: 'MA',
  generalInformationUrl:
    'https://www.mass.gov/info-details/covid-19-vaccination-program',
  howToGetVaccinatedUrl:
    'https://www.mass.gov/info-details/covid-19-vaccine-locations-for-individuals-currently-eligible-to-be-vaccinated',
};

export const StateVaccineDetails = () => (
  <VaccineDetailsContent data={MA_DATA} locationName="Massachussetts" />
);
