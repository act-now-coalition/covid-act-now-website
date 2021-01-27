import React from 'react';
import VaccinationBlock from './VaccinationBlock';
import StateVaccinationBlock from './StateVaccinationBlock';
import { fail } from 'common/utils';
import { Region, County, State, MetroArea } from 'common/regions';

const RegionVaccinationBox: React.FC<{ region: Region }> = ({ region }) => {
  if (region instanceof County || region instanceof MetroArea) {
    return <VaccinationBlock region={region} />;
  } else if (region instanceof State) {
    return <StateVaccinationBlock region={region} />;
  } else {
    fail(
      `RegionVaccinationBox: missing implementation for region with fips ${region.fipsCode}`,
    );
    return null;
  }
};

export default RegionVaccinationBox;
