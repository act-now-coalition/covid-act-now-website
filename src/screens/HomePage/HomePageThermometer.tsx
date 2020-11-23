import React from 'react';
import {
  Title,
  RowContainer,
  RowColor,
  RowCopy,
  Content,
} from 'screens/HomePage/HomePageThermometer.style';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';

const ThermometerRow = (props: {
  text: string;
  levelColor: string;
  rowLevel: Level;
}) => {
  return (
    <RowContainer>
      <RowColor $levelColor={props.levelColor} $rowLevel={props.rowLevel} />
      <RowCopy>{props.text}</RowCopy>
    </RowContainer>
  );
};

const HomePageThermometer = () => {
  const thermometerContent = [
    {
      level: Level.SUPER_CRITICAL,
      text: `${LOCATION_SUMMARY_LEVELS[Level.SUPER_CRITICAL].summary}`,
      levelColor: `${LEVEL_COLOR[Level.SUPER_CRITICAL]}`,
    },
    {
      level: Level.CRITICAL,
      text: `${LOCATION_SUMMARY_LEVELS[Level.CRITICAL].summary}`,
      levelColor: `${LEVEL_COLOR[Level.CRITICAL]}`,
    },
    {
      level: Level.HIGH,
      text: `${LOCATION_SUMMARY_LEVELS[Level.HIGH].summary}`,
      levelColor: `${LEVEL_COLOR[Level.HIGH]}`,
    },
    {
      level: Level.MEDIUM,
      text: `${LOCATION_SUMMARY_LEVELS[Level.MEDIUM].summary}`,
      levelColor: `${LEVEL_COLOR[Level.MEDIUM]}`,
    },
    {
      level: Level.LOW,
      text: `${LOCATION_SUMMARY_LEVELS[Level.LOW].summary}`,
      levelColor: `${LEVEL_COLOR[Level.LOW]}`,
    },
  ];

  return (
    <Content>
      <Title>Risk levels</Title>
      {thermometerContent.map((row, i) => (
        <ThermometerRow
          key={`level-${i}`}
          text={row.text}
          levelColor={row.levelColor}
          rowLevel={row.level}
        />
      ))}
    </Content>
  );
};

export default HomePageThermometer;
