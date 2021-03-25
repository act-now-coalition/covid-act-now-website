import React from 'react';
import { LinkItem } from 'cms-content/footer';
import TextAndIconWithSpecialWrapping from './TextAndIconWithSpecialWrapping';
import {
  Section,
  Column,
  SectionHeader,
  ArrowIcon,
  OutlinedButton,
  LearnLink,
} from './Menu.style';

const LearnSection: React.FC<{
  learnLinks: LinkItem[];
  onClick: (label: string) => void;
}> = ({ learnLinks, onClick }) => {
  return (
    <Section>
      <SectionHeader>FAQ</SectionHeader>
      <Column>
        {learnLinks.map((link: LinkItem) => {
          const { url, cta } = link;
          return (
            <LearnLink
              key={cta}
              to={url}
              onClick={() => onClick(`Learn: ${cta}`)}
            >
              <TextAndIconWithSpecialWrapping
                text={link.cta}
                icon={<ArrowIcon />}
              />
            </LearnLink>
          );
        })}
      </Column>
      <OutlinedButton
        to="/learn"
        desktopOnly
        onClick={() => onClick('Learn: View all topics')}
      >
        View all topics
      </OutlinedButton>
    </Section>
  );
};

export default LearnSection;
