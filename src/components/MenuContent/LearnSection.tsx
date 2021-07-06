import React from 'react';
import {
  Section,
  SectionHeader,
  OutlinedButton,
  ParagraphCopy,
} from './Menu.style';

const LearnSection: React.FC<{
  learnCopy: string;
  onClick: (label: string) => void;
}> = ({ learnCopy, onClick }) => {
  return (
    <Section>
      <SectionHeader>Learn</SectionHeader>
      <ParagraphCopy>{learnCopy}</ParagraphCopy>
      <OutlinedButton to="/learn" onClick={() => onClick('Learn')}>
        Learn more
      </OutlinedButton>
    </Section>
  );
};

export default LearnSection;
