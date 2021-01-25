import React from 'react';
import { StateVaccineData } from 'cms-content/vaccines';
import VaccineDetails from './index';
import regions from 'common/regions';

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
  <VaccineDetails data={MA_DATA} region={regions.findByFipsCodeStrict('25')} />
);
