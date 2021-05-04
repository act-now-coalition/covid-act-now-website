import React from 'react';
import VulnerabilityNote from './VulnerabilityNote';

export default {
  title: 'Location page redesign/Notes Block',
  component: VulnerabilityNote,
};

export const VulnerabilityExample = () => {
  return <VulnerabilityNote ccviScore={0.9} locationName="test" />;
};
