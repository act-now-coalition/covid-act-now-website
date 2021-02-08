import React from 'react';
import InfoPopup, { ArrowVariation } from './InfoPopup';

export default {
  title: 'Shared Components/InfoPopup',
  component: InfoPopup,
};

const dummyText =
  'Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.';

export const PointUpward = () => {
  return <InfoPopup variation={ArrowVariation.DOWN} content={dummyText} />;
};

export const PointDownward = () => {
  return <InfoPopup variation={ArrowVariation.UP} content={dummyText} />;
};
