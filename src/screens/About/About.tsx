import React, { Fragment } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { EventCategory } from 'components/Analytics';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import ExpandableContainer from 'components/ExpandableContainer';
import { LogoElement } from 'components/LogoGrid/LogoGrid';
import {
  AboutHeading1,
  AboutHeading2,
  AboutHeading3,
  ButtonContainer,
  HashWrapper,
  PartnersSectionWrapper,
  PartnersContainer,
  LogoWrapper,
  SectionContent,
} from './About.style';
import aboutContent, { LogoItem, PartnersContent } from 'cms-content/about';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { TocItem } from 'cms-content/utils';
import TeamSection from './Team/TeamSection';

export const sidebarItems: TocItem[] = [
  {
    label: 'About',
    to: '/about',
    items: [
      {
        to: '/about#about',
        label: aboutContent.aboutHeader,
      },
      {
        to: '/about#partners',
        label: aboutContent.partnersHeader,
      },
      {
        to: '/about#team',
        label: aboutContent.teamHeader,
      },
      {
        to: '/about#contact-us',
        label: aboutContent.contactUsHeader,
      },
    ],
  },
];

// TODO(Chelsi): put these ids into the CMS
/**
 * Wrapper for a button.
 * Pass to (for internal links) or `href` (for external links) but not both.
 */
const Button: React.FC<{ to?: string; href?: string; cta: string }> = ({
  to,
  href,
  cta,
}) => {
  return (
    <LargeOutlinedButton
      to={to}
      href={href}
      endIcon={<ArrowForwardIcon />}
      trackingLabel={cta}
      trackingCategory={EventCategory.ABOUT}
    >
      {cta}
    </LargeOutlinedButton>
  );
};

const About = () => {
  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/about"
        pageTitle="About Covid Act Now"
        pageDescription="Covid Act Now is a multidisciplinary team of technologists, epidemiologists, and health experts working to help Americans understand  COVID risk in their own community."
      />
      <PageContent sidebarItems={sidebarItems}>
        <HashWrapper id="about">
          <AboutHeading1>{aboutContent.aboutHeader}</AboutHeading1>
          <MarkdownContent source={aboutContent.aboutContent} />
        </HashWrapper>
        <HashWrapper id="partners">
          <AboutHeading2>{aboutContent.partnersHeader}</AboutHeading2>
          <SectionContent>
            <ExpandableContainer
              collapsedHeightMobile={'400px'}
              collapsedHeightDesktop={'565px'}
              tabTextCollapsed={<>More</>}
              tabTextExpanded={<>Less</>}
              trackingLabel="Partners logos"
              trackingCategory={EventCategory.ABOUT}
            >
              <PartnersSectionWrapper>
                {aboutContent.partnersContent.map(
                  (section: PartnersContent, idx: number) => {
                    return (
                      <Fragment key={`Partner-section-${idx}`}>
                        <AboutHeading3>{section.header}</AboutHeading3>
                        <PartnersContainer>
                          {section.logos.map((logo: LogoItem) => (
                            <LogoWrapper key={logo.altText}>
                              <LogoElement
                                image={logo.image}
                                url={logo.url}
                                altText={logo.altText}
                              />
                            </LogoWrapper>
                          ))}
                        </PartnersContainer>
                      </Fragment>
                    );
                  },
                )}
              </PartnersSectionWrapper>
            </ExpandableContainer>
          </SectionContent>
          <ButtonContainer>
            <Button to="/case-studies" cta="See case studies" />
          </ButtonContainer>
        </HashWrapper>
        <HashWrapper id="team">
          <AboutHeading2>{aboutContent.teamHeader}</AboutHeading2>
          <SectionContent>
            <MarkdownContent source={aboutContent.teamIntro} />
            <TeamSection />
          </SectionContent>
        </HashWrapper>
        <AboutHeading2 id="contact-us">
          {aboutContent.contactUsHeader}
        </AboutHeading2>
        <SectionContent>
          <MarkdownContent source={aboutContent.contactUsContent} />
        </SectionContent>
      </PageContent>
    </Fragment>
  );
};

export default About;
