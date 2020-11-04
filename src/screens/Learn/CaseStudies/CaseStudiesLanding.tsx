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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LearnPageContainer from '../LearnPageContainer';

const { header, intro, categories } = caseStudiesContent;

const Landing: React.FC = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const cardGridSpacing = isMobile ? 2 : 3;

  return (
    <LearnPageContainer>
      <AppMetaTags
        canonicalUrl="/case-studies"
        pageTitle="Case Studies from Covid Act Now's Partners"
        pageDescription={`${date} Learn how different people are using Covid Act Now's data to make decisions for themselves, their organizations, and their communities during COVID`}
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
            <CardsContainer spacing={cardGridSpacing}>
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
