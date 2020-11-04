import React, { Fragment } from 'react';
import { ButtonContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import SectionButton, { ButtonTheme } from './SectionButton';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import { LandingSection, landingPageContent } from 'cms-content/learn';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import LearnPageContainer from '../LearnPageContainer';

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
    <LearnPageContainer>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
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
    </LearnPageContainer>
  );
};

export default Landing;
