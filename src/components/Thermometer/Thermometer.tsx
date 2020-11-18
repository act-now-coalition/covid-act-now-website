import React from 'react';
import {
  LevelContainer,
  LevelColor,
  LevelCopy,
  LevelTitle,
  LevelDescription,
} from './Thermometer.style';

interface ThermometerLevelInfo {
  title: string;
  description: string;
  color: string;
  roundTop: boolean;
  roundBottom: boolean;
}

const Thermometer: React.FC<{ items: ThermometerLevelInfo[] }> = ({
  items,
}) => (
  <div>
    {items.map(item => (
      <LevelContainer key={item.color}>
        <LevelColor
          $color={item.color}
          $roundTop={item.roundTop}
          $roundBottom={item.roundBottom}
        />
        <LevelCopy>
          <LevelTitle>{item.title}</LevelTitle>
          <LevelDescription>{item.description}</LevelDescription>
        </LevelCopy>
      </LevelContainer>
    ))}
  </div>
);

export default Thermometer;
