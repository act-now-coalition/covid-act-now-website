import React from 'react';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { ThermometerContainer, ThermometerRow } from './ThermometerImage.style';

const thermometerContent = [
  {
    level: Level.SUPER_CRITICAL,
    color: `${LEVEL_COLOR[Level.SUPER_CRITICAL]}`,
  },
  {
    level: Level.CRITICAL,
    color: `${LEVEL_COLOR[Level.CRITICAL]}`,
  },
  {
    level: Level.HIGH,
    color: `${LEVEL_COLOR[Level.HIGH]}`,
  },
  {
    level: Level.MEDIUM,
    color: `${LEVEL_COLOR[Level.MEDIUM]}`,
  },
  {
    level: Level.LOW,
    color: `${LEVEL_COLOR[Level.LOW]}`,
  },
];

const ThermometerImage: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const thresholdUnknown = currentLevel === Level.UNKNOWN;
  return (
    <ThermometerContainer>
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
