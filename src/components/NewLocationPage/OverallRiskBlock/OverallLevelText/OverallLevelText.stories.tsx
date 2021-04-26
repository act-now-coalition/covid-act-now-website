import React from 'react';
import OverallLevelText from './OverallLevelText';
import { Level } from 'common/level';

export default {
  title: 'Location page redesign/Overall risk block/Level label',
  component: OverallLevelText,
};

export const Low = () => {
  return <OverallLevelText currentLevel={Level.LOW} />;
};

export const Medium = () => {
  return <OverallLevelText currentLevel={Level.MEDIUM} />;
};

export const SuperCritical = () => {
  return <OverallLevelText currentLevel={Level.SUPER_CRITICAL} />;
};
