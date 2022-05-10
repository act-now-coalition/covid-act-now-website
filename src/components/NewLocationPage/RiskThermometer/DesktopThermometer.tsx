import React from 'react';
import { Level } from 'common/level';
import { DesktopThermometer as Thermometer } from './RiskThermometer.style';

const DesktopThermometer: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const levelUnknown = currentLevel === Level.UNKNOWN;
  const imageDescription = `Thermometer image showing the colors corresponding to the COVID community risk levels`;

  return (
    <Thermometer
      $levelUnknown={levelUnknown}
      role="img"
      aria-label={imageDescription}
    />
  );
};

export default DesktopThermometer;
