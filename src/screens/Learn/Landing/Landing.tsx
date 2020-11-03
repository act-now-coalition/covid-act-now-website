import React, { Fragment } from 'react';
import { PageContainer, PageContent, ButtonContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import SectionButton, { ButtonTheme } from './SectionButton';
// import TableOfContents, { Item } from 'components/TableOfContents';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import { LandingSection, landingPageContent } from 'cms-content/learn';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';

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
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {/* <TableOfContents items={getSectionItems(sections)} /> */}
        {sections.map((section: LandingSection) => (
          <Fragment key={section.sectionId}>
            <Heading2>
              <Anchor id={section.sectionId} />
              {section.sectionTitle}
            </Heading2>
            <MarkdownContent source={section.description} />
            <ButtonContainer>
              <SectionButton
                cta={section.buttonCta}
                redirect={section.buttonRedirect}
                theme={ButtonTheme.WHITE}
              />
            </ButtonContainer>
          </Fragment>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Landing;
