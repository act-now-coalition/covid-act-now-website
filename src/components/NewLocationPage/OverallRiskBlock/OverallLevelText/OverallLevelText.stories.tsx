import React from 'react';
import OverallLevelText from './OverallLevelText';
import { Level } from 'common/level';

export default {
  title: 'Location Page/Overall risk block/Level label',
  component: OverallLevelText,
};

export const LowLabel = () => {
  return <OverallLevelText currentLevel={Level.LOW} />;
};

export const MediumLabel = () => {
  return <OverallLevelText currentLevel={Level.MEDIUM} />;
};

export const SuperCriticalLabel = () => {
  return <OverallLevelText currentLevel={Level.SUPER_CRITICAL} />;
};
