import React from 'react';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import { isHighVulnerability } from './utils';
import VulnerabilityIcon from 'assets/images/VulnerabilityIcon';
import {
  SectionContentContainer,
  IconWrapper,
  TextContainer,
  TextComponent,
} from './NotesBlock.style';

const NotesBlock: React.FC<{ score: number }> = ({ score }) => {
  const highVulnerability = isHighVulnerability(score);
  if (highVulnerability) {
    return (
      <SectionContainer>
        <SectionContentContainer>
          <IconWrapper>
            <VulnerabilityIcon />
          </IconWrapper>
          <TextContainer>
            <LabelWithChevron text="Vulnerability is very high" />
            <TextComponent>
              New York City metro is more likely to experience severe physical
              and economic suffering from COVID, and to face harder, longer
              recovery.
            </TextComponent>
          </TextContainer>
        </SectionContentContainer>
      </SectionContainer>
    );
  }
  return null;
};

export default NotesBlock;
