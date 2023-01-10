import React from 'react';
import { VaccineProgressBar } from './VaccineProgressBar';

export default {
  title: 'Components/VaccineProgressBar',
  component: VaccineProgressBar,
};

export const Example = () => {
  return <VaccineProgressBar locationName="Idaho" vaccinationsRatio={0.45} />;
};

// TODO(michael): Remove this once we migrate everything to the new version.
export const OldVersion = () => {
  return (
    <VaccineProgressBar
      oldVersion
      locationName="Idaho"
      vaccinationsRatio={0.45}
    />
  );
};
