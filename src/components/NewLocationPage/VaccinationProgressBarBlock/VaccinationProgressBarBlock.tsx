import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Title } from './VaccinationProgressBarBlock.style';

export interface ProgressBarProps {
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  locationName: string;
}

const VaccinationProgressBarBlock: React.FC<ProgressBarProps> = ({
  vaccinationsInitiated,
  vaccinationsCompleted,
  locationName,
}) => {
  return (
    <>
      <Title>Vaccination Progress</Title>
      <ProgressBar
        vaccinationsInitiated={vaccinationsInitiated}
        vaccinationsCompleted={vaccinationsCompleted}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBarBlock;
