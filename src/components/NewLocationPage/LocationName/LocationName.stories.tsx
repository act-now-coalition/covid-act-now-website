import React from 'react';
import LocationName from './LocationName';
import regions from 'common/regions';

export default {
  title: 'Location Page/Location Name',
  component: LocationName,
};

export const NewYork = () => {
  const state = regions.findByFipsCodeStrict('36');
  return <LocationName region={state} />;
};

export const DistrictOfColumbiaState = () => {
  const state = regions.findByFipsCodeStrict('11');
  return <LocationName region={state} />;
};

export const FairFieldCounty = () => {
  const county = regions.findByFipsCodeStrict('09001');
  return <LocationName region={county} />;
};

export const EastBatonRougeParish = () => {
  const county = regions.findByFipsCodeStrict('22033');
  return <LocationName region={county} />;
};

export const DistrictOfColumbia = () => {
  const county = regions.findByFipsCodeStrict('11001');
  return <LocationName region={county} />;
};

export const ValdezCordovaCensusArea = () => {
  const county = regions.findByFipsCodeStrict('02261');
  return <LocationName region={county} />;
};

export const YakutatCityAndBorough = () => {
  const county = regions.findByFipsCodeStrict('02282');
  return <LocationName region={county} />;
};

export const AbileneMetro = () => {
  const metroArea = regions.findByFipsCodeStrict('10180');
  return <LocationName region={metroArea} />;
};

export const BostonMetro = () => {
  const metroArea = regions.findByFipsCodeStrict('14460');
  return <LocationName region={metroArea} />;
};
