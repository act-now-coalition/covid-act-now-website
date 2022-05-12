import React from 'react';
import DesktopThermometer from './DesktopThermometer';
import { Level } from 'common/level';

export default {
  title: 'Location Page/Desktop thermometer',
  component: DesktopThermometer,
};

export const LevelKnown = () => {
  return <DesktopThermometer currentLevel={Level.LOW} />;
};

export const LevelUnknown = () => {
  return <DesktopThermometer currentLevel={Level.UNKNOWN} />;
};
