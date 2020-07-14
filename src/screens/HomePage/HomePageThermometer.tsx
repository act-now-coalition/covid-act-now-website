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
      <RowColor levelColor={props.levelColor} rowLevel={props.rowLevel} />
      <RowCopy>{props.text}</RowCopy>
    </RowContainer>
  );
};

const HomePageThermometer = () => {
  const thermometerContent = [
    {
      level: Level.CRITICAL,
      text: 'Active outbreak or major gaps',
      levelColor: `${LEVEL_COLOR[Level.CRITICAL]}`,
    },
    {
      level: Level.HIGH,
      text: 'Risk of second spike',
      levelColor: `${LEVEL_COLOR[Level.HIGH]}`,
    },
    {
      level: Level.MEDIUM,
      text: 'On track for herd immunity',
      levelColor: `${LEVEL_COLOR[Level.MEDIUM]}`,
    },
    {
      level: Level.LOW,
      text: 'On track for containment',
      levelColor: `${LEVEL_COLOR[Level.LOW]}`,
    },
  ];

  return (
    <Content>
      <Title>Risk levels</Title>
      {thermometerContent.map((row, i) => (
        <ThermometerRow
          text={row.text}
          levelColor={row.levelColor}
          rowLevel={row.level}
        />
      ))}
    </Content>
  );
};

export default HomePageThermometer;
