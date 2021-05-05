import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Title } from './VaccinationProgressBarBlock.style';
import { Projection } from 'common/models/Projection';

export interface ProgressBarProps {
  locationName: string;
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
}

const VaccinationProgressBarBlock: React.FC<{
  locationName: string;
  projection: Projection;
}> = ({ locationName, projection }) => {
  const percentInitiated = projection.vaccinationsInfo?.ratioInitiated;
  const percentCompleted = projection.vaccinationsInfo?.ratioVaccinated;

  if (!percentInitiated || !percentCompleted) {
    return null;
  }

  return (
    <>
      <Title>Vaccination Progress</Title>
      <ProgressBar
        vaccinationsInitiated={percentInitiated}
        vaccinationsCompleted={percentCompleted}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBarBlock;
