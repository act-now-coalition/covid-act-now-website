import React from 'react';
import { Projection } from 'common/models/Projection';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';

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
