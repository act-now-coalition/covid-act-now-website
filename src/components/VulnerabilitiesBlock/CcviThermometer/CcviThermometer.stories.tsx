import React from 'react';
import CcviThermometer from './CcviThermometer';

export default {
  title: 'Shared Components/CcviThermometer',
  component: CcviThermometer,
};

export const Example = () => {
  return <CcviThermometer overallScore={0.9} />;
};
