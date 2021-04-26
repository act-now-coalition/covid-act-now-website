import React from 'react';
import { BlockWrapper as Wrapper, Section } from './OverallRiskBlock.style';
import RiskThermometer from '../RiskThermometer';
import OverallLevelText from './OverallLevelText/OverallLevelText';
import { Level } from 'common/level';

const OverallRiskBlock: React.FC<{
  currentLevel: Level;
  locationName: string;
}> = ({ currentLevel, locationName }) => {
  return (
    <Wrapper>
      <Section>
        <RiskThermometer
          currentLevel={currentLevel}
          locationName={locationName}
        />
      </Section>
      <Section>
        <OverallLevelText currentLevel={currentLevel} />
      </Section>
    </Wrapper>
  );
};

export default OverallRiskBlock;
