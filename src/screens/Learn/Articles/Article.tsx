import React, { Fragment } from 'react';
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
import { Article } from 'cms-content/articles/utils';
import Footer from 'screens/Learn/Footer/Footer';
import { getCovidExplainedFooter } from 'screens/Learn/Explained';
import LearnDisclaimer from 'components/LearnDisclaimer/LearnDisclaimer';

const ArticlePage: React.FC<{
  article: Article;
  canonicalUrl: string;
  parentItem: { to: string; label: string };
}> = ({ article, canonicalUrl, parentItem }) => {
  const metatagDate = formatMetatagDate();
  const { header, body, date, summary } = article;

  const smallSubtextCopy = article.author
    ? `${article.author} Updated ${date}`
    : `Updated ${date}`;

  const isCeArticle = article.author?.includes('COVID Explained');
  const footerProps = isCeArticle && {
    pageSpecificCopy: getCovidExplainedFooter(),
  };

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={`${header}`}
        pageDescription={`${metatagDate} ${summary}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={parentItem} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <LearnDisclaimer />
        <SmallSubtext source={smallSubtextCopy} />
        <MarkdownContent source={body} />
        <Footer {...footerProps} />
      </PageContent>
    </Fragment>
  );
};

export default ArticlePage;
