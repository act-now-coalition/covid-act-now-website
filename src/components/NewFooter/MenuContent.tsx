import React from 'react';
import { footerContent } from 'cms-content/footer';
import FeaturedSection from './FeaturedSection';
import SocialButtonsBlock from './SocialButtonsBlock';
import LogoNonUrl from 'assets/images/LogoNonUrl';
import { FeaturedItem, LinkItem } from 'cms-content/footer';
import {
  ContentWrapper,
  Section,
  Column,
  SectionHeader,
  ArrowIcon,
  OutlinedButton,
  Row,
  LearnLink,
  AboutCopy,
  LogoWrapper,
} from './Menu.style';

const MenuContent: React.FC = () => {
  const { learnLinks, aboutUs, featuredSections } = footerContent;

  return (
    <ContentWrapper>
      <Section>
        <SectionHeader>Learn</SectionHeader>
        <Column>
          {learnLinks.map((link: LinkItem) => (
            <LearnLink key={link.cta} to={link.url} endIcon={<ArrowIcon />}>
              {link.cta}
            </LearnLink>
          ))}
        </Column>
        <OutlinedButton to="/learn" desktopOnly>
          View all topics
        </OutlinedButton>
      </Section>
      <Section>
        <SectionHeader>Featured</SectionHeader>
        {featuredSections.map((section: FeaturedItem) => (
          <FeaturedSection key={section.cta} section={section} />
        ))}
      </Section>
      <Section>
        <LogoWrapper to="/donate">
          <LogoNonUrl />
        </LogoWrapper>
        <AboutCopy>{aboutUs}</AboutCopy>
        <Row>
          <OutlinedButton to="/about">Learn more about us</OutlinedButton>
          <OutlinedButton to="/about#contact-us">Contact us</OutlinedButton>
        </Row>
        <SocialButtonsBlock />
      </Section>
    </ContentWrapper>
  );
};

export default MenuContent;
