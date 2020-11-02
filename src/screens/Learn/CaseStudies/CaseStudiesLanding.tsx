import React from 'react';
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
import { CardsWrapper } from './CaseStudy.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import Grid from '@material-ui/core/Grid';
import { CaseStudy } from 'cms-content/learn';

const { header, intro, categories } = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/learn/case-studies"
        pageTitle=""
        pageDescription={`${date}`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs
            item={{ to: '/learn/case-studies', label: 'Case Studies' }}
          />
        </BreadcrumbsContainer>
        <PageHeader>{header}</PageHeader>
        <PageIntroMarkdown source={intro} />
        <CardsWrapper container spacing={1}>
          {categories.map(category => (
            <Grid item md={6} xs={12}>
              {category?.caseStudies &&
                category.caseStudies.length &&
                category.caseStudies.map((caseStudy: CaseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.caseStudyId}
                    cardContent={caseStudy}
                    url={url}
                  />
                ))}
            </Grid>
          ))}
        </CardsWrapper>
      </PageContent>
    </PageContainer>
  );
};
export default Landing;
