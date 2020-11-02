import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { caseStudiesContent } from 'cms-content/learn';
import CaseStudyCard from './CaseStudyCard';
import {
  PageContainer,
  PageHeader,
  PageContent,
  BreadcrumbsContainer,
  PageIntroMarkdown,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import Grid from '@material-ui/core/Grid';
import { CardsContainer, CategoryHeader } from './CaseStudy.style';

const { header, intro, categories } = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/case-studies"
        pageTitle=""
        pageDescription={`${date}`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/case-studies', label: 'Case Studies' }} />
        </BreadcrumbsContainer>
        <PageHeader>{header}</PageHeader>
        <PageIntroMarkdown source={intro} />
        {categories.map(category => {
          const caseStudies = category.caseStudies || [];
          return (
            <Fragment key={category.categoryId}>
              <CategoryHeader id={category.categoryId}>
                {category.header}
              </CategoryHeader>
              <CardsContainer>
                {caseStudies.map(caseStudy => (
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
                ))}
              </CardsContainer>
            </Fragment>
          );
        })}
      </PageContent>
    </PageContainer>
  );
};
export default Landing;
