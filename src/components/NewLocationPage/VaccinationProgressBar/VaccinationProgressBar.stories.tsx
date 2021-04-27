import React from 'react';
import { VaccinationProgressBar } from 'components/NewLocationPage/VaccinationProgressBar';
import VaccinationProgressBlock from './VaccinationProgressBlock';

export default {
  title: 'Location page redesign/Vaccinations progress bar',
  component: VaccinationProgressBar,
};

export const Example = () => {
  const vaccinationsInitiated = 0.2836805522539912;
  const vaccinationsCompleted = 0.4083357896972175;

  const locationName = 'New York';

  return (
    // <VaccinationProgressBar
    <VaccinationProgressBlock
      vaccinationsInitiated={vaccinationsInitiated}
      vaccinationsCompleted={vaccinationsCompleted}
      locationName={locationName}
    />
  );
};
