import React, { ComponentType } from 'react';
import isUndefined from 'lodash/isUndefined';
import SocialButtonsBlock from './SocialButtonsBlock';
import {
  Section,
  SectionHeader,
  ParagraphCopy,
  LogoWrapper,
} from './Menu.style';
import { MarkdownContent } from 'components/Markdown';

const AboutUsSection: React.FC<{
  aboutUsCopy: string;
  onClick: (label: string) => void;
  Logo?: ComponentType;
}> = ({ aboutUsCopy, onClick, Logo }) => {
  const isFooter = !isUndefined(Logo);

  return (
    <Section>
      {Logo ? (
        <LogoWrapper
          to="/"
          aria-label="Covid Act Now"
          onClick={() => onClick('Logo')}
        >
          <Logo />
        </LogoWrapper>
      ) : (
        <SectionHeader>About Us</SectionHeader>
      )}
      <ParagraphCopy>
        <MarkdownContent>{aboutUsCopy}</MarkdownContent>
      </ParagraphCopy>
      <SocialButtonsBlock showTerms={isFooter} />
    </Section>
  );
};

export default AboutUsSection;
