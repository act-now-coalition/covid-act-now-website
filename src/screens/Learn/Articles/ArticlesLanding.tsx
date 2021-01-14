import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { formatMetatagDate } from 'common/utils';
import { learnPages } from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import articles, { Article } from 'cms-content/articles';
import { CardsContainer } from '../Learn.style';
import LandingPageCard from '../SharedComponents/LandingPageCard';

const ArticlesLanding = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/covid-explained"
        pageTitle="COVID-19 Explained"
        pageDescription={`${date} Explore deeper analysis about how, why, and where COVID is spreading.`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>COVID explained</LearnHeading1>
        <CardsContainer spacing={2}>
          {articles.map((article: Article) => {
            const cardProps = {
              id: article.articleID,
              title: article.header,
              summary: article.summary,
              borderTop: true,
            };
            return <LandingPageCard key={article.articleID} {...cardProps} />;
          })}
        </CardsContainer>
      </PageContent>
    </Fragment>
  );
};

export default ArticlesLanding;
