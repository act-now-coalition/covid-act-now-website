import React, { Fragment } from 'react';
import { ButtonContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { Anchor } from 'components/TableOfContents';
import SectionButton, { ButtonTheme } from './SectionButton';
import { formatMetatagDate } from 'common/utils';
import {
  LandingSection,
  landingPageContent,
  learnPages,
} from 'cms-content/learn';

const Landing: React.FC = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = landingPageContent;

  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
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
    </Fragment>
  );
};

export default Landing;
