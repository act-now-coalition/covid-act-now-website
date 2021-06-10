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
  CommitmentBody,
  CommitmentIcon,
  CommitmentItem,
  HashWrapper,
  PartnersSectionWrapper,
  PartnersContainer,
  LogoWrapper,
  SectionContent,
} from './About.style';
import aboutContent, {
  CommitmentsContent,
  LogoItem,
  PartnersContent,
} from 'cms-content/about';
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
        to: '/about#mission',
        label: aboutContent.missionHeader,
      },
      {
        to: '/about#impact',
        label: aboutContent.impactHeader,
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
        to: '/about#future-projects',
        label: aboutContent.futureProjectsHeader,
      },
      {
        to: '/about#contact-us',
        label: aboutContent.contactUsHeader,
      },
    ],
  },
];

// TODO(Chelsi): put these ids into the CMS
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
          <ButtonContainer>
            <Button to="/about#team" cta="Meet our team" />
            <Button to="/about#contact-us" cta="Contact us" />
          </ButtonContainer>
        </HashWrapper>
        <HashWrapper id="mission">
          <AboutHeading2>{aboutContent.missionHeader}</AboutHeading2>
          <SectionContent>
            <MarkdownContent source={aboutContent.missionContent} />
            {aboutContent.commitmentsContent.map(
              (commitment: CommitmentsContent, idx: number) => {
                return (
                  <CommitmentItem key={`commitment-section-${idx}`}>
                    <CommitmentIcon
                      src={commitment.icon}
                      alt={commitment.altText}
                    />
                    <CommitmentBody>
                      <MarkdownContent source={commitment.copy} />
                    </CommitmentBody>
                  </CommitmentItem>
                );
              },
            )}
            <ButtonContainer>
              <Button to="/data-api#faq" cta="See our data sources" />
              <Button
                href="https://apidocs.covidactnow.org/#register"
                cta="Download our data"
              />
            </ButtonContainer>
          </SectionContent>
        </HashWrapper>
        <HashWrapper id="impact">
          <AboutHeading2>{aboutContent.impactHeader}</AboutHeading2>
          <SectionContent>
            <MarkdownContent source={aboutContent.impactContent} />
          </SectionContent>
          <ButtonContainer>
            <Button to="/case-studies" cta="View case studies" />
          </ButtonContainer>
        </HashWrapper>
        <HashWrapper id="partners">
          <AboutHeading2>{aboutContent.partnersHeader}</AboutHeading2>
          <SectionContent>
            <ExpandableContainer
              collapsedHeightMobile={400}
              collapsedHeightDesktop={565}
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
        </HashWrapper>
        <HashWrapper id="team">
          <AboutHeading2>{aboutContent.teamHeader}</AboutHeading2>
          <SectionContent>
            <MarkdownContent source={aboutContent.teamIntro} />
            <TeamSection />
          </SectionContent>
        </HashWrapper>
        <HashWrapper id="future-projects">
          <AboutHeading2>{aboutContent.futureProjectsHeader}</AboutHeading2>
          <SectionContent>
            <MarkdownContent source={aboutContent.futureProjectsContent} />
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
