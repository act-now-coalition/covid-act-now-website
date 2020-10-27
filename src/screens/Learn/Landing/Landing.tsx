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
// import TableOfContents, { Item } from 'components/TableOfContents';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import { LandingSection, landingPageContent } from 'cms-content/learn';

/*
  Commenting out all things related to the table of contents, since we only have 2 items as of now.
*/

const Landing = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = landingPageContent;

  // function getSectionItems(sections: LandingSection[]): Item[] {
  //   return sections.map(section => ({
  //     id: section.sectionId,
  //     title: section.sectionTitle,
  //   }));
  // }

  const date = formatMetatagDate();

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent>
        <PageHeader>{header}</PageHeader>
        <PageIntro source={intro} />
        {/* <TableOfContents items={getSectionItems(sections)} /> */}
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
