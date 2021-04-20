import React from 'react';
import VaccinationsProgressBar from './VaccinationsProgressBar';

export default {
  title: 'Location page redesign/Vaccinations progress bar',
  component: VaccinationsProgressBar,
};

export const Example = () => {
  const vaccinationsInitiated = 0.2836805522539912;
  const vaccinationsCompleted = 0.4083357896972175;

  const locationName = 'New York';

  return (
    <VaccinationsProgressBar
      vaccinationsInitiated={vaccinationsInitiated}
      vaccinationsCompleted={vaccinationsCompleted}
      locationName={locationName}
    />
  );
};
