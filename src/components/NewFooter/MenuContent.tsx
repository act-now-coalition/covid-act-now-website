import React, { ComponentType } from 'react';
import { isUndefined } from 'lodash';
import { footerContent } from 'cms-content/footer';
import FeaturedSection from './FeaturedSection';
import SocialButtonsBlock from './SocialButtonsBlock';
import { FeaturedItem, LinkItem } from 'cms-content/footer';
import TextAndIconWithSpecialWrapping from './TextAndIconWithSpecialWrapping';
import {
  ContentWrapper,
  Section,
  Column,
  SectionHeader,
  ArrowIcon,
  OutlinedButton,
  LearnLink,
  AboutCopy,
  LogoWrapper,
  RowWithSpacing,
} from './Menu.style';

const MenuContent: React.FC<{
  onClick: (label: string) => void;
  Logo?: ComponentType;
}> = ({ onClick, Logo }) => {
  const { learnLinks, aboutUs, featuredSections } = footerContent;

  const showTerms = !isUndefined(Logo);

  return (
    <ContentWrapper>
      <Section>
        <SectionHeader>Learn</SectionHeader>
        <Column>
          {learnLinks.map((link: LinkItem) => (
            <LearnLink
              key={link.cta}
              to={link.url}
              onClick={() => onClick(`Learn: ${link.cta}`)}
            >
              <TextAndIconWithSpecialWrapping
                text={link.cta}
                icon={<ArrowIcon />}
              />
            </LearnLink>
          ))}
        </Column>
        <OutlinedButton
          to="/learn"
          desktopOnly
          onClick={() => onClick('Learn: View all topics')}
        >
          View all topics
        </OutlinedButton>
      </Section>
      <Section>
        <SectionHeader>Featured</SectionHeader>
        {featuredSections.map((section: FeaturedItem) => (
          <FeaturedSection
            key={section.cta}
            section={section}
            trackMenuEvent={() => onClick(`Learn: ${section.cta}`)}
          />
        ))}
      </Section>
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
        <AboutCopy>{aboutUs}</AboutCopy>
        <RowWithSpacing>
          <OutlinedButton to="/about" onClick={() => onClick('About us')}>
            Learn more about us
          </OutlinedButton>
          <OutlinedButton
            to="/about#contact-us"
            onClick={() => onClick('Contact us')}
          >
            Contact us
          </OutlinedButton>
        </RowWithSpacing>
        <SocialButtonsBlock showTerms={showTerms} />
      </Section>
    </ContentWrapper>
  );
};

export default MenuContent;
