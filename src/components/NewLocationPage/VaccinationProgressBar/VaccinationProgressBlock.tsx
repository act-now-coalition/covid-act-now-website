import React from 'react';
import VaccinationProgressBarAutosize from './VaccinationProgressBar';
import { Title } from './VaccinationProgressBar.style';

export interface ProgressBarProps {
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  locationName: string;
}

const VaccinationProgressBlock: React.FC<ProgressBarProps> = ({
  vaccinationsInitiated,
  vaccinationsCompleted,
  locationName,
}) => {
  return (
    <>
      <Title>Vaccination Progress</Title>
      <VaccinationProgressBarAutosize
        vaccinationsInitiated={vaccinationsInitiated}
        vaccinationsCompleted={vaccinationsCompleted}
        locationName={locationName}
      />
    </>
  );
};

export default VaccinationProgressBlock;
