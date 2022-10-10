import React from 'react';
import { CountyMap } from 'components/NewLocationPage/CountyMap';
import regions from 'common/regions';

export default {
  title: 'Location Page/County Map',
  component: CountyMap,
};

export const NewYork = () => {
  const state = regions.findByFipsCodeStrict('36');
  return <CountyMap region={state} />;
};

export const BostonMetro = () => {
  const metroArea = regions.findByFipsCodeStrict('14460');
  return <CountyMap region={metroArea} />;
};

export const FairFieldCounty = () => {
  const county = regions.findByFipsCodeStrict('09001');
  return <CountyMap region={county} />;
};
