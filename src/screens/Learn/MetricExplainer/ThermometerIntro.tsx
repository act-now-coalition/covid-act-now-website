import React from 'react';
import Thermometer, { ThermometerBox } from 'components/Thermometer';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';

const levels = [
  Level.SUPER_CRITICAL,
  Level.CRITICAL,
  Level.HIGH,
  Level.MEDIUM,
  Level.LOW,
];

const levelToDescription = {
  [Level.SUPER_CRITICAL]: 'Severe outbreak',
  [Level.CRITICAL]: 'Active outbreak',
  [Level.HIGH]: 'At risk of outbreak',
  [Level.MEDIUM]: 'Slow disease growth',
  [Level.LOW]: 'On track for containment',
  [Level.UNKNOWN]: '',
};

const items = levels.map(level => {
  const summaryLevel = LOCATION_SUMMARY_LEVELS[level];
  return {
    title: summaryLevel.name,
    description: levelToDescription[level] || '',
    color: summaryLevel.color,
    roundTop: level === Level.SUPER_CRITICAL,
    roundBottom: level === Level.LOW,
  };
});

const ThermometerIntro: React.FC = () => (
  <ThermometerBox>
    <Thermometer items={items} />
  </ThermometerBox>
);

export default ThermometerIntro;
