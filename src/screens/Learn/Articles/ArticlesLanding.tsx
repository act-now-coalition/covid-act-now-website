import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import { CardsContainer } from '../Learn.style';
import LandingPageCard from '../SharedComponents/LandingPageCard';
import { Article } from 'cms-content/articles';

const ArticlesLanding: React.FC<{
  title: string;
  canonicalUrl: string;
  pageTitle: string;
  pageDescription: string;
  articles: Article[];
}> = ({ title, canonicalUrl, pageTitle, pageDescription, articles }) => {
  let { url } = useRouteMatch();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{title}</LearnHeading1>
        <CardsContainer spacing={2}>
          {articles.map((article: Article) => {
            const cardProps = {
              id: article.articleID,
              title: article.header,
              summary: article.summary,
              borderTop: true,
              url,
            };
            return <LandingPageCard key={article.articleID} {...cardProps} />;
          })}
        </CardsContainer>
      </PageContent>
    </Fragment>
  );
};

export default ArticlesLanding;
