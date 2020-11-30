import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent, { MobileOnly } from 'components/PageContent';
import { MarkdownContent, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import {
  caseStudiesContent,
  learnPages,
  CaseStudyCategory,
} from 'cms-content/learn';
import CaseStudyCard from './CaseStudyCard';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import { CardsContainer } from './CaseStudy.style';
import TableOfContents, { Item } from 'components/TableOfContents';

const {
  header,
  intro,
  categories,
  metadataTitle,
  metadataDescription,
} = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const cardGridSpacing = isMobile ? 2 : 3;

  function getSectionItems(categories: CaseStudyCategory[]): Item[] {
    return categories.map(category => ({
      id: category.categoryId,
      title: category.header,
    }));
  }

  // Filters out case studies that aren't in shippable shape but are already in the CMS
  const idsToFilterOut = ['michael-piccioli', 'arielle-tango'];

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
          <TableOfContents items={getSectionItems(categories)} />
        </MobileOnly>
        {categories.map((category: CaseStudyCategory) => {
          const caseStudies = category.caseStudies || [];
          return (
            <Fragment key={category.categoryId}>
              <Heading2 id={category.categoryId}>{category.header}</Heading2>
              <CardsContainer spacing={cardGridSpacing}>
                {caseStudies.map(
                  caseStudy =>
                    !idsToFilterOut.includes(caseStudy.caseStudyId) && (
                      <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        key={caseStudy.caseStudyId}
                      >
                        <CaseStudyCard
                          key={caseStudy.caseStudyId}
                          cardContent={caseStudy}
                          url={url}
                        />
                      </Grid>
                    ),
                )}
              </CardsContainer>
            </Fragment>
          );
        })}
      </PageContent>
    </Fragment>
  );
};
export default Landing;
