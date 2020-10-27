import React, { Fragment } from 'react';
import {
  PageContainer,
  PageContent,
  PageHeader,
  SectionHeader,
  MarkdownBodyCopy,
  PageIntro,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import SectionButton, { ButtonTheme } from './SectionButton';
import TableOfContents, { Item } from 'components/TableOfContents';
import { Anchor } from 'components/TableOfContents';
import { LandingSection, landingPageContent } from 'cms-content/learn';

const header = landingPageContent.header;
const intro = landingPageContent.intro;
const sections = landingPageContent.sections;

const Landing = () => {
  function getSectionItems(sections: LandingSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle="COVID-19 Educational content - America's COVID warning system - Covid Act Now" //edit these
        pageDescription="Find trusted information about Coronavirus (2019-nCoV). Make informed decisions to stop the disease for you and your community."
      />
      <PageContent>
        <PageHeader>{header}</PageHeader>
        <PageIntro source={intro} />
        <TableOfContents items={getSectionItems(sections)} />
        {sections.map((section: LandingSection) => (
          <Fragment key={section.sectionId}>
            <SectionHeader>
              <Anchor id={section.sectionId} />
              {section.sectionTitle}
            </SectionHeader>
            <MarkdownBodyCopy source={section.description} />
            <SectionButton
              cta={section.buttonCta}
              redirect={section.buttonRedirect}
              theme={ButtonTheme.WHITE}
            />
          </Fragment>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Landing;
