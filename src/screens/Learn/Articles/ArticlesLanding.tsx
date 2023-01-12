import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import {
  BreadcrumbsContainer,
  LearnHeading1,
  ArticlesLandingIntro,
} from '../Learn.style';
import { CardsContainer } from '../Learn.style';
import LandingPageCard from '../SharedComponents/LandingPageCard';
import { Article } from 'cms-content/articles';
import LearnDisclaimer from 'components/LearnDisclaimer/LearnDisclaimer';

const ArticlesLanding: React.FC<{
  title: string;
  canonicalUrl: string;
  pageTitle: string;
  pageDescription: string;
  articles: Article[];
  sectionIntro?: string;
}> = ({
  title,
  canonicalUrl,
  pageTitle,
  pageDescription,
  articles,
  sectionIntro,
}) => {
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
        <LearnDisclaimer />
        {sectionIntro && (
          <ArticlesLandingIntro>{sectionIntro}</ArticlesLandingIntro>
        )}
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
