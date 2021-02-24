import React from 'react';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { scaleLinear } from '@vx/scale';

const orderedLevels = [
  Level.SUPER_CRITICAL,
  Level.CRITICAL,
  Level.HIGH,
  Level.MEDIUM,
  Level.LOW,
];

const NewThermometer: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const thresholdUnknown = currentLevel === Level.UNKNOWN;
  const imageDescription = `Thermometer image showing that the current alert level is ${LOCATION_SUMMARY_LEVELS[currentLevel].name}.`;

  const thermometerHeight = 130;
  const thermometerWidth = 22;
  const outlinedIndicatorWidth = 4;

  const scaleHeight = scaleLinear({
    domain: [0, 5], // 5 levels
    range: [0, thermometerHeight],
  });

  const levelIndex = orderedLevels.indexOf(currentLevel);

  return (
    <svg
      width={28}
      height={thermometerHeight}
      role="img"
      aria-label={imageDescription}
    >
      <defs>
        <linearGradient id="riskThermometer" x2="0%" y2="100%">
          <stop offset="20%" stop-color={LEVEL_COLOR[Level.SUPER_CRITICAL]} />
          <stop offset="20%" stop-color={LEVEL_COLOR[Level.CRITICAL]} />
          <stop offset="40%" stop-color={LEVEL_COLOR[Level.CRITICAL]} />
          <stop offset="40%" stop-color={LEVEL_COLOR[Level.HIGH]} />
          <stop offset="60%" stop-color={LEVEL_COLOR[Level.HIGH]} />
          <stop offset="60%" stop-color={LEVEL_COLOR[Level.MEDIUM]} />
          <stop offset="80%" stop-color={LEVEL_COLOR[Level.MEDIUM]} />
          <stop offset="80%" stop-color={LEVEL_COLOR[Level.LOW]} />
        </linearGradient>
      </defs>
      <rect
        fill={
          thresholdUnknown
            ? LEVEL_COLOR[Level.UNKNOWN]
            : 'url(#riskThermometer)'
        }
        width={thermometerWidth}
        height={thermometerHeight}
        x={outlinedIndicatorWidth}
        rx={10}
        ry={10}
      />
      <rect
        stroke="black"
        strokeWidth={outlinedIndicatorWidth}
        fill="none"
        width={thermometerWidth}
        height={thresholdUnknown ? '0' : '20%'}
        x={outlinedIndicatorWidth}
        y={scaleHeight(levelIndex)}
      />
    </svg>
  );
};

export default NewThermometer;
