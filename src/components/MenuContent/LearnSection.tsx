import React from 'react';
import {
  Section,
  SectionHeader,
  OutlinedButton,
  ParagraphCopy,
  RowWithSpacing,
} from './Menu.style';

const LearnSection: React.FC<{
  learnCopy: string;
  onClick: (label: string) => void;
}> = ({ learnCopy, onClick }) => {
  return (
    <Section>
      <SectionHeader>Educational Resources</SectionHeader>
      <ParagraphCopy>{learnCopy}</ParagraphCopy>
      <RowWithSpacing>
        <OutlinedButton to="/" onClick={() => onClick('Learn')}>
          Learn more
        </OutlinedButton>
      </RowWithSpacing>
    </Section>
  );
};

export default LearnSection;
