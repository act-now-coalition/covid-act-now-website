import React from 'react';
import {
  ColorBlock,
  ThermometerContainer,
  Label,
} from './CommunityLevelThermometer.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

const levels = [Level.LOW, Level.MEDIUM, Level.HIGH];

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
      <strong>{label}</strong> level
    </Label>
  );
};

const CommunityLevelThermometer: React.FC = () => {
  return (
    <ThermometerContainer>
      <ThermometerLabel label="Low" />
      {items.map((item: ThermometerItem) => {
        return <ColorBlock color={item.color} key={item.label} />;
      })}
      <ThermometerLabel label="High" />
    </ThermometerContainer>
  );
};

export default CommunityLevelThermometer;
