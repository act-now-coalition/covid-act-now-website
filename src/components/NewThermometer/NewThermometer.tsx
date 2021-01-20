import React from 'react';
import {
  Wrapper,
  ColorBlock,
  ThermometerContainer,
  Label,
  InfoIcon,
  InfoLink,
} from './NewThermometer.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

const levels = [
  Level.LOW,
  Level.MEDIUM,
  Level.HIGH,
  Level.CRITICAL,
  Level.SUPER_CRITICAL,
];

const items = levels.map(level => {
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

const AboutLink: React.FC = () => {
  return (
    <InfoLink to="learn">
      <span>
        <InfoIcon />
        About risk levels
      </span>
    </InfoLink>
  );
};

const NewThermometer: React.FC = () => {
  return (
    <Wrapper>
      <ThermometerContainer>
        <ThermometerLabel label="Low" />
        {items.map((item: any) => {
          return <ColorBlock color={item.color} />;
        })}
        <ThermometerLabel label="Severe" />
      </ThermometerContainer>
      <AboutLink />
    </Wrapper>
  );
};

export default NewThermometer;
