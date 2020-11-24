import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import {
  LearnHeading1,
  BreadcrumbsContainer,
  SmallSubtext,
} from '../Learn.style';
import { articlesById } from 'cms-content/articles';

const Article = () => {
  let { articleId } = useParams<{ articleId: string }>();
  const metatagDate = formatMetatagDate();
  const articleContent = articlesById[articleId];
  const { header, body, date, summary } = articleContent;

  if (!articleContent) {
    return null;
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={`/articles/${articleId}`}
        pageTitle={`${header}`}
        pageDescription={`${metatagDate} ${summary}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/articles', label: 'Articles' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <SmallSubtext source={`Published ${date}`} />
        <MarkdownContent source={body} />
      </PageContent>
    </Fragment>
  );
};

export default Article;
