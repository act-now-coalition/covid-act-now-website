import React from 'react';
import RegionMap from './RegionMap';
import regions, { MetroArea } from 'common/regions';

export default {
  title: 'Shared Components/Region Map',
  component: RegionMap,
};

export const NYMetroArea = () => {
  const metroArea = regions.findByFipsCode('35620') as MetroArea;
  const countyFipsList = metroArea.counties.map(county => county.fipsCode);
  return <RegionMap countyFipsList={countyFipsList} />;
};
