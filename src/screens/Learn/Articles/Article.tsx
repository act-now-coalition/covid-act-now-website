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
import SmallShareButtons from 'components/SmallShareButtons';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

const Article = () => {
  let { articleId } = useParams<{ articleId: string }>();
  const metatagDate = formatMetatagDate();
  const articleContent = articlesById[articleId];
  const { header, body, date, summary } = articleContent;

  const trackShareFacebook = () =>
    trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'facebook');

  const trackShareTwitter = () =>
    trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'twitter');

  const trackCopyLink = () => {
    trackEvent(
      EventCategory.ARTICLES,
      EventAction.COPY_LINK,
      'recommendations',
    );
  };

  const shareButtonProps = {
    shareUrl: `https://covidactnow.org/deep-dives/${articleId}`,
    shareQuote: 'stand-in-copy', // TODO (Chelsi): input copy
    onCopyLink: trackCopyLink,
    onShareOnFacebook: trackShareFacebook,
    onShareOnTwitter: trackShareTwitter,
  };

  if (!articleContent) {
    return null;
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={`/deep-dives/${articleId}`}
        pageTitle={`${header}`}
        pageDescription={`${metatagDate} ${summary}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/deep-dives', label: 'Deep dives' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <SmallSubtext source={`Published ${date}`} />
        <SmallShareButtons {...shareButtonProps} />
        <MarkdownContent source={body} />
        <SmallShareButtons {...shareButtonProps} />
      </PageContent>
    </Fragment>
  );
};

export default Article;
