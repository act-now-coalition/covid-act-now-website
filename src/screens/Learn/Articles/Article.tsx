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
import SmallShareButtons from 'components/SmallShareButtons';
import Footer from 'screens/Learn/Footer/Footer';

const ArticlePage: React.FC<{
  article: Article;
  onCopyLink: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  shareQuote: string;
  canonicalUrl: string;
  parentItem: { to: string; label: string };
}> = ({
  article,
  canonicalUrl,
  onCopyLink,
  onShareOnFacebook,
  onShareOnTwitter,
  shareQuote,
  parentItem,
}) => {
  const metatagDate = formatMetatagDate();
  const { header, body, date, summary } = article;

  const shareButtonProps = {
    shareUrl: canonicalUrl,
    shareQuote,
    onCopyLink,
    onShareOnFacebook,
    onShareOnTwitter,
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
        <SmallSubtext source={`Published ${date}`} />
        <SmallShareButtons {...shareButtonProps} />
        <MarkdownContent source={body} />
        <Footer />
        <SmallShareButtons {...shareButtonProps} />
      </PageContent>
    </Fragment>
  );
};

export default ArticlePage;
