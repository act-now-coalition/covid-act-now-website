import React from 'react';
import OverallRiskBlock from './OverallRiskBlock';
import { Level } from 'common/level';

export default {
  title: 'Location page redesign/Overall risk block',
  component: OverallRiskBlock,
};

export const Low = () => {
  return <OverallRiskBlock currentLevel={Level.LOW} locationName="New York" />;
};

export const Medium = () => {
  return (
    <OverallRiskBlock currentLevel={Level.MEDIUM} locationName="New York" />
  );
};

export const SuperCritical = () => {
  return (
    <OverallRiskBlock
      currentLevel={Level.SUPER_CRITICAL}
      locationName="New York"
    />
  );
};
