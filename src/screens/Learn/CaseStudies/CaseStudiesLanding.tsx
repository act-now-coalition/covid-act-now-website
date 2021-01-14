import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent, { MobileOnly } from 'components/PageContent';
import { MarkdownContent, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import {
  caseStudiesContent,
  learnPages,
  CaseStudyCategory,
  categoriesWithStudies,
} from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import { CardsContainer } from './CaseStudy.style';
import TableOfContents, { Item } from 'components/TableOfContents';
import LandingPageCard from '../SharedComponents/LandingPageCard';

const {
  header,
  intro,
  metadataTitle,
  metadataDescription,
} = caseStudiesContent;

const Landing: React.FC = () => {
  const date = formatMetatagDate();

  function getSectionItems(): Item[] {
    return categoriesWithStudies.map(category => ({
      id: category.categoryId,
      title: category.header,
    }));
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/case-studies"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <MarkdownContent source={intro} />
        <MobileOnly>
          <TableOfContents items={getSectionItems()} />
        </MobileOnly>
        {categoriesWithStudies.map((category: CaseStudyCategory) => {
          const caseStudies = category.caseStudies || [];
          return (
            <Fragment key={category.categoryId}>
              <Heading2 id={category.categoryId}>{category.header}</Heading2>
              <CardsContainer spacing={2}>
                {caseStudies.map(caseStudy => {
                  const cardProps = {
                    id: caseStudy.caseStudyId,
                    title: caseStudy.shortTitle,
                    summary: caseStudy.summary,
                    logoUrl: caseStudy.logoUrl,
                    logoAltText: caseStudy.logoAltText,
                  };
                  return (
                    caseStudy.showCaseStudy && (
                      <LandingPageCard {...cardProps} />
                    )
                  );
                })}
              </CardsContainer>
            </Fragment>
          );
        })}
      </PageContent>
    </Fragment>
  );
};
export default Landing;
