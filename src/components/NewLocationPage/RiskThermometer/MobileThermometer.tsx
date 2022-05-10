import React from 'react';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import {
  ColorBlock,
  MobileThermometerContainer,
} from './RiskThermometer.style';

const orderedLevels: Level[] = [Level.LOW, Level.MEDIUM, Level.HIGH];

const MobileThermometer: React.FC<{
  currentLevel: Level;
  locationName: string;
}> = ({ currentLevel, locationName }) => {
  const levelUnknown = currentLevel === Level.UNKNOWN;
  const levelName = LOCATION_SUMMARY_LEVELS[currentLevel].name;
  const imageDescription = `Thermometer image showing that ${locationName} community risk level is ${levelName}.`;

  return (
    <MobileThermometerContainer role="img" aria-label={imageDescription}>
      {orderedLevels.map((level: Level) => (
        <ColorBlock
          key={level}
          color={LEVEL_COLOR[level]}
          $levelUnknown={levelUnknown}
          $isCurrentLevel={level === currentLevel}
        />
      ))}
    </MobileThermometerContainer>
  );
};

export default MobileThermometer;
