import React from 'react';
import { footerContent } from 'cms-content/footer';
import FeaturedSection from './FeaturedSection';
import SocialButtonsBlock from './SocialButtonsBlock';
import Logo from 'assets/images/footerlogoDarkWithURL';
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
} from './Menu.style';

const MenuContent: React.FC = () => {
  const { learnLinks, aboutUs, featuredSections } = footerContent;

  return (
    <ContentWrapper>
      <Section>
        <SectionHeader>Learn</SectionHeader>
        <Column>
          {learnLinks.map((link: any) => (
            <LearnLink to={link.url} endIcon={<ArrowIcon />}>
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
        {featuredSections.map((section: any) => {
          return (
            <FeaturedSection
              url={section.url}
              cta={section.cta}
              description={section.description}
            />
          );
        })}
      </Section>

      <Section>
        <Logo />
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
