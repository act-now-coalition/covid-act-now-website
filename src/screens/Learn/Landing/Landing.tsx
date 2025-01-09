import React, { Fragment } from 'react';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { LandingSection, landingPageContent } from 'cms-content/learn/landing';
import { learnPages } from 'cms-content/learn';
import { ButtonContainer } from '../Learn.style';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { EventCategory } from 'components/Analytics';
import LearnDisclaimer from 'components/LearnDisclaimer/LearnDisclaimer';

const Landing: React.FC = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
    editorsNote,
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
        <LearnDisclaimer />
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {sections.map((section: LandingSection) => (
          <Fragment key={section.sectionId}>
            <Heading2 id={section.sectionId}>{section.sectionTitle}</Heading2>
            <MarkdownContent source={section.description} />
            <ButtonContainer>
              <LargeOutlinedButton
                to={section.buttonRedirect}
                endIcon={<ArrowForwardIcon />}
                trackingCategory={EventCategory.LEARN}
                trackingLabel={`Learn landing: ${section.buttonCta}`}
              >
                {section.buttonCta}
              </LargeOutlinedButton>
            </ButtonContainer>
          </Fragment>
        ))}
        <MarkdownContent source={editorsNote} />
      </PageContent>
    </Fragment>
  );
};

export default Landing;
