import React from 'react';
import VulnerabilityNote from './VulnerabilityNote';
import regions from 'common/regions';

export default {
  title: 'Location Page/Notes Block',
  component: VulnerabilityNote,
};

export const VulnerabilityExample = () => {
  const region = regions.findByFipsCodeStrict('36');
  return <VulnerabilityNote ccviScore={0.9} region={region} />;
};
