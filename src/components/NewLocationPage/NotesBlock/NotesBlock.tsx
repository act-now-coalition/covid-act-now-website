import React from 'react';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import { isHighVulnerability } from './utils';
import vulnerabilityIcon from 'assets/images/VulnerabilityIcon.svg';
import { IconWrapper, TextContainer, TextComponent } from './NotesBlock.style';

const NotesBlock: React.FC<{ score: number }> = ({ score }) => {
  const highVulnerability = isHighVulnerability(score);
  if (highVulnerability) {
    return (
      <SectionContainer>
        <IconWrapper>
          <img
            src={vulnerabilityIcon}
            width="32"
            height="32"
            alt="Vulnerability Icon"
          />
        </IconWrapper>
        <TextContainer>
          <LabelWithChevron text="Vulnerability is very high" />
          <TextComponent>
            New York City metro is more likely to experience severe physical and
            economic suffering from COVID, and to face harder, longer recovery.
          </TextComponent>
        </TextContainer>
      </SectionContainer>
    );
  }
  return null;
};

export default NotesBlock;
