import React from 'react';
import { Title } from './VaccinationProgressBarBlock.style';
import { Projection } from 'common/models/Projection';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';

const VaccinationProgressBarBlock: React.FC<{
  locationName: string;
  projection: Projection;
}> = ({ locationName, projection }) => {
  const percentInitiated = projection.vaccinationsInfo?.ratioVaccinated;
  const percentCompleted = projection.vaccinationsInfo?.ratioAdditionalDose;

  if (!percentInitiated || !percentCompleted) {
    return null;
  }

  return (
    <>
      <Title>Vaccination Progress</Title>
      <VaccineProgressBar
        oldVersion
        vaccinationsInitiated={percentInitiated}
        vaccinationsCompleted={percentCompleted}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBarBlock;
