import React from 'react';
import VaccinationBlock from './VaccinationBlock';
import StateVaccinationBlock from './StateVaccinationBlock';
import { Region, County, State, MetroArea } from 'common/regions';

const RegionVaccinationBox: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof County || region instanceof MetroArea) {
    return <VaccinationBlock region={region} />;
  } else if (region instanceof State) {
    return <StateVaccinationBlock region={region} />;
  } else {
    return null;
  }
};

export default RegionVaccinationBox;
