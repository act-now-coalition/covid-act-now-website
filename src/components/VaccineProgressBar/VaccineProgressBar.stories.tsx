import React from 'react';
import { VaccineProgressBar } from './VaccineProgressBar';

export default {
  title: 'Components/VaccineProgressBar',
  component: VaccineProgressBar,
};

export const Example = () => {
  return (
    <VaccineProgressBar
      locationName="Idaho"
      vaccinationsInitiated={0.45}
      vaccinationsCompleted={0.35}
    />
  );
};

// TODO(michael): Remove this once we migrate everything to the new version.
export const OldVersion = () => {
  return (
    <VaccineProgressBar
      oldVersion
      locationName="Idaho"
      vaccinationsInitiated={0.45}
      vaccinationsCompleted={0.35}
    />
  );
};
