import React from 'react';
import MobileThermometer from './MobileThermometer';
import { Level } from 'common/level';

export default {
  title: 'Location Page/Mobile thermometer',
  component: MobileThermometer,
};

export const Low = () => {
  return <MobileThermometer currentLevel={Level.LOW} locationName="New York" />;
};

export const Medium = () => {
  return (
    <MobileThermometer currentLevel={Level.MEDIUM} locationName="New York" />
  );
};

export const SuperCritical = () => {
  return (
    <MobileThermometer
      currentLevel={Level.SUPER_CRITICAL}
      locationName="New York"
    />
  );
};

export const Unknown = () => {
  return (
    <MobileThermometer currentLevel={Level.UNKNOWN} locationName="New York" />
  );
};
