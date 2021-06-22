import React from 'react';
import {
  ColorBlock,
  ThermometerContainer,
  Label,
} from './RiskLevelThermometer.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

const levels = [
  Level.LOW,
  Level.MEDIUM,
  Level.HIGH,
  Level.CRITICAL,
  Level.SUPER_CRITICAL,
];

interface ThermometerItem {
  label: string;
  color: string;
}

const items: ThermometerItem[] = levels.map((level: Level) => {
  const summaryLevel = LOCATION_SUMMARY_LEVELS[level];
  return {
    label: summaryLevel.name, // for tooltip?
    color: summaryLevel.color,
  };
});

const ThermometerLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Label>
      <strong>{label}</strong> risk
    </Label>
  );
};

const RiskLevelThermometer: React.FC = () => {
  return (
    <ThermometerContainer>
      <ThermometerLabel label="Low" />
      {items.map((item: ThermometerItem) => {
        return <ColorBlock color={item.color} key={item.label} />;
      })}
      <ThermometerLabel label="Severe" />
    </ThermometerContainer>
  );
};

export default RiskLevelThermometer;
