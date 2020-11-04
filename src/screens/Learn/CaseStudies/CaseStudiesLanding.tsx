import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent, Heading1, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { caseStudiesContent } from 'cms-content/learn';
import CaseStudyCard from './CaseStudyCard';
import { BreadcrumbsContainer } from '../Learn.style';
import { CardsContainer } from './CaseStudy.style';
import LearnPageContainer from '../LearnPageContainer';

const { header, intro, categories } = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  return (
    <LearnPageContainer>
      <AppMetaTags
        canonicalUrl="/case-studies"
        pageTitle=""
        pageDescription={`${date}`}
      />
      <BreadcrumbsContainer>
        <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
      </BreadcrumbsContainer>
      <Heading1>{header}</Heading1>
      <MarkdownContent source={intro} />
      {categories.map(category => {
        const caseStudies = category.caseStudies || [];
        return (
          <Fragment key={category.categoryId}>
            <Heading2 id={category.categoryId}>{category.header}</Heading2>
            <CardsContainer>
              {caseStudies.map(caseStudy => (
                <Grid container item xs={12} sm={6} key={caseStudy.caseStudyId}>
                  <CaseStudyCard
                    key={caseStudy.caseStudyId}
                    cardContent={caseStudy}
                    url={url}
                  />
                </Grid>
              ))}
            </CardsContainer>
          </Fragment>
        );
      })}
    </LearnPageContainer>
  );
};
export default Landing;
