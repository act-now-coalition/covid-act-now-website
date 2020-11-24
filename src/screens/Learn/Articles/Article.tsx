import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent, Heading3 } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import { LearnHeading1, BreadcrumbsContainer } from '../Learn.style';
import { articlesById } from 'cms-content/articles';

const Article = () => {
  let { articleId } = useParams<{ articleId: string }>();
  const metatagDate = formatMetatagDate();
  const articleContent = articlesById[articleId];
  const { header, body, date } = articleContent;

  if (!articleContent) {
    return null;
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={`/articles/${articleId}`}
        pageTitle={`Article: ${header}`}
        pageDescription={`${metatagDate}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/articles', label: 'Articles' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <Heading3>Published {date}</Heading3>
        <MarkdownContent source={body} />
      </PageContent>
    </Fragment>
  );
};

export default Article;
