import React from 'react';
import VulnerabilitiesBlock from './VulnerabilitiesBlock';
import { useCcviForFips } from 'common/hooks';
import regions from 'common/regions';

export default {
  title: 'Shared Components/Vulnerabilities/VulnerabilitiesBlock',
  component: VulnerabilitiesBlock,
};

export const Block = () => {
  const region = regions.findByFipsCodeStrict('39045');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};
