import React from 'react';
import VulnerabilitiesBlock from './VulnerabilitiesBlock';
import { useCcviForFips } from 'common/hooks';
import regions from 'common/regions/region_db';

export default {
  title: 'Shared Components/Vulnerabilities/VulnerabilitiesBlock',
  component: VulnerabilitiesBlock,
};

export const VeryHigh = () => {
  const region = regions.findByFipsCodeStrict('12');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};

export const High = () => {
  const region = regions.findByFipsCodeStrict('17');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};

export const Medium = () => {
  const region = regions.findByFipsCodeStrict('10005');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};

export const Low = () => {
  const region = regions.findByFipsCodeStrict('10003');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};

export const VeryLow = () => {
  const region = regions.findByFipsCodeStrict('33');
  const scores = useCcviForFips(region.fipsCode);

  return <VulnerabilitiesBlock scores={scores} region={region} />;
};
