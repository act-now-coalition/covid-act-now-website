import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import urlJoin from 'url-join';
import { useRouter } from 'next/router';

import Article from 'screens/Learn/Articles/Article';
import PageWrapper from 'screens/utils/PageWrapper';

import articles, { articlesById } from 'cms-content/explained';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { ArticleJSON } from 'cms-content/articles';

const getStaticPaths: GetStaticPaths = async () => {
  const pathParams = articles.map(article => {
    return {
      params: {
        articleId: article.articleID,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

interface ArticleProps {
  article: ArticleJSON;
}

const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = (params?.articleId ?? '') as string;
  const article = articleId ? articlesById[articleId] : null;

  if (!article) {
    return {
      notFound: true,
    };
  }

  const props: ArticleProps = {
    article,
  };

  return {
    props,
  };
};

// TODO: Create a new category
const trackShareFacebook = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'facebook');

const trackShareTwitter = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'twitter');

const trackCopyLink = () => {
  trackEvent(EventCategory.ARTICLES, EventAction.COPY_LINK, 'COVID explained');
};

function ExplainedArticle({ article }: ArticleProps) {
  const router = useRouter();
  const relativeUrl = router.asPath;
  const shareQuote = `See '${article.header}', part of @CovidActNow's educational series for the everyday person, written by health advisors, guest writers, and the COVID Explained team.`;
  return (
    <PageWrapper>
      <Article
        article={article}
        onShareOnFacebook={trackShareFacebook}
        onShareOnTwitter={trackShareTwitter}
        onCopyLink={trackCopyLink}
        shareQuote={shareQuote}
        canonicalUrl={urlJoin('https://covidactnow.org/', relativeUrl)}
        parentItem={{ to: '/covid-explained', label: 'COVID explained' }}
      />
    </PageWrapper>
  );
}

export { getStaticPaths, getStaticProps };
export default ExplainedArticle;
