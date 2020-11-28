import React from 'react';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { ThermometerContainer, ThermometerRow } from './ThermometerImage.style';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

const thermometerLevels = [
  Level.SUPER_CRITICAL,
  Level.CRITICAL,
  Level.HIGH,
  Level.MEDIUM,
  Level.LOW,
];

const thermometerContent = thermometerLevels.map(level => ({
  level,
  color: LEVEL_COLOR[level],
  name: LOCATION_SUMMARY_LEVELS[level].name,
}));

function getLevelName(level: Level) {
  if (level === Level.UNKNOWN) {
    return 'Unknown';
  }
  const currentLevel = thermometerContent.find(item => item.level === level);
  return currentLevel?.name;
}

const ThermometerImage: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const thresholdUnknown = currentLevel === Level.UNKNOWN;
  const levelName = getLevelName(currentLevel);
  const imageDescription = `Thermometer image showing that the current alert level is ${levelName}.`;
  return (
    <ThermometerContainer role="img" aria-label={imageDescription}>
      {thermometerContent.map((row, i) => (
        <ThermometerRow
          key={row.level}
          color={row.color}
          $thresholdUnknown={thresholdUnknown}
          $isCurrentLevel={row.level === currentLevel}
        />
      ))}
    </ThermometerContainer>
  );
};

export default ThermometerImage;
