import React from 'react';
import InfoTooltip, { ArrowVariation } from './InfoTooltip';

export default {
  title: 'Shared Components/InfoTooltip',
  component: InfoTooltip,
};

const dummyText =
  'Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.';

export const PointUpward = () => {
  return <InfoTooltip variation={ArrowVariation.DOWN} content={dummyText} />;
};

export const PointDownward = () => {
  return <InfoTooltip variation={ArrowVariation.UP} content={dummyText} />;
};
