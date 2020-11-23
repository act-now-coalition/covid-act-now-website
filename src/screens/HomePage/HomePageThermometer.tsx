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
      level: Level.CRITICAL,
      text: `25 +`,
      levelColor: `${LEVEL_COLOR[Level.CRITICAL]}`,
    },
    {
      level: Level.HIGH,
      text: `10 - 25`,
      levelColor: `${LEVEL_COLOR[Level.HIGH]}`,
    },
    {
      level: Level.MEDIUM,
      text: `1 - 10`,
      levelColor: `${LEVEL_COLOR[Level.MEDIUM]}`,
    },
    {
      level: Level.LOW,
      text: `0 - 1`,
      levelColor: `${LEVEL_COLOR[Level.LOW]}`,
    },
  ];

  return (
    <Content>
      <Title>Daily New Cases Per 100k</Title>
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
