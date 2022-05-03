import React from 'react';
import { Title } from './VaccinationProgressBarBlock.style';
import { Projection } from 'common/models/Projection';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';

const VaccinationProgressBarBlock: React.FC<{
  locationName: string;
  projection: Projection;
}> = ({ locationName, projection }) => {
  const percentCompleted = projection.vaccinationsInfo?.ratioVaccinated;
  const percentAdditionalDose =
    projection.vaccinationsInfo?.ratioAdditionalDose;

  if (!percentAdditionalDose || !percentCompleted) {
    return null;
  }

  return (
    <>
      <Title>Vaccination Progress</Title>
      <VaccineProgressBar
        oldVersion
        vaccinationsAdditionalDose={percentAdditionalDose}
        vaccinationsCompleted={percentCompleted}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBarBlock;
