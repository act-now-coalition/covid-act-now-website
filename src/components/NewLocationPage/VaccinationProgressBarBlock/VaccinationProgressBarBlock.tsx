import React from 'react';
import { Projection } from 'common/models/Projection';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';

const VaccinationProgressBarBlock: React.FC<{
  locationName: string;
  projection: Projection;
}> = ({ locationName, projection }) => {
  const vaccinated = projection.vaccinationsInfo?.ratioBivalentBoostedFall2022;

  if (!vaccinated) {
    return null;
  }

  return (
    <>
      <VaccineProgressBar
        oldVersion
        vaccinationsRatio={vaccinated}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBarBlock;
