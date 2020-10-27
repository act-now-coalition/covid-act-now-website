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
import { formatNumericalDate } from 'common/utils';
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

  const date = formatNumericalDate(new Date());

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle="COVID-19 Essential Information & Resources - Covid Act Now"
        pageDescription={`${date} Find recent and trusted information & resources about the novel Coronavirus (2019-nCoV). Learn about Symptoms, Tests, Risks, and more. Backed by medical experts. Make informed decisions to stop the disease for you and your community.`}
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
