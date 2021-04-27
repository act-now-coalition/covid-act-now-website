import React from 'react';
import VaccinationProgressBlock from './VaccinationProgressBarBlock';

export default {
  title: 'Location page redesign/Vaccinations progress bar block',
  component: VaccinationProgressBlock,
};

export const Example = () => {
  const vaccinationsInitiated = 0.4036805522539912;
  const vaccinationsCompleted = 0.2408335789697175;

  const locationName = 'New York';

  return (
    <VaccinationProgressBlock
      vaccinationsInitiated={vaccinationsInitiated}
      vaccinationsCompleted={vaccinationsCompleted}
      locationName={locationName}
    />
  );
};
