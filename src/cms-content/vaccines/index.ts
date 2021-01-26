import { useState, useEffect } from 'react';
import { getStateCode, Region } from 'common/regions';

export interface StateVaccineData {
  state: string;
  generalInformationUrl: string;
  howToGetVaccinatedUrl: string;
}

const fetchVaccineData = (region: Region) => {
  const stateCode = getStateCode(region);
  // State code required
  if (!stateCode) {
    return;
  }
  return fetch(`/cms-content/vaccines/${stateCode.toLowerCase()}.json`).then(
    res => res.json() as Promise<StateVaccineData>,
  );
};

export const useStateVaccineData = (region: Region) => {
  const [stateData, setStateData] = useState<StateVaccineData>();
  useEffect(() => {
    fetchVaccineData(region)?.then((value: StateVaccineData) => {
      setStateData(value);
    });
  }, [region]);
  return stateData;
};
