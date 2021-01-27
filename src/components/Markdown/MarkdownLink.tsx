import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';
import {
  isValidURL,
  isInternalLink,
  isInternalEmbed,
  formatInternalLink,
} from './utils';
import TwitterEmbed, { isTwitterEmbed } from './TwitterEmbed';
import YouTubeEmbed, { isYouTubeEmbed } from './YoutubeEmbed';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { CenterEmbed } from './Markdown.style';
/**
 * Custom hyperlink for Markdown content. If the link is external, open it on
 * a new tab. If the link is internal, use the HashLink component to render
 * it in the current page. If the link is invalid, we just render the text of
 * the link.
 */

/* Implementing lazy loading requires a short timeout to make scrollWithOffset scroll the page to the correct location */
const scrollWithTimeout = (element: any, offset: number) => {
  return setTimeout(() => {
    scrollWithOffset(element, offset);
  }, 350);
};

const MarkdownLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  // If the href parameter is not a valid URL, renders the body as regular text
  if (!isValidURL(href)) {
    return <Fragment>{children}</Fragment>;
  }

  if (isTwitterEmbed(href)) {
    return <TwitterEmbed statusUrl={href} />;
  }

  if (isYouTubeEmbed(href)) {
    return <YouTubeEmbed embedUrl={href} />;
  }

  if (isInternalEmbed(href)) {
    return (
      <CenterEmbed>
        <iframe
          src={href}
          title="Covid Act Now"
          width="400"
          height="440"
          frameBorder="0"
          scrolling="no"
        />
      </CenterEmbed>
    );
  }

  if (href === 'https://g.co/ens') {
    // HACK to track clicks on the exposure notification recommendation
    return (
      <ExternalLink href={href} onClick={trackExposureClickRecommend}>
        {children}
      </ExternalLink>
    );
  }

  if (isInternalLink(href)) {
    const formattedUrl = formatInternalLink(href);
    return (
      <HashLink
        to={formattedUrl}
        scroll={element => scrollWithTimeout(element, -80)}
      >
        {children}
      </HashLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

function trackExposureClickRecommend() {
  trackEvent(
    EventCategory.EXPOSURE_NOTIFICATIONS,
    EventAction.CLICK_LINK,
    'Recommendation',
  );
}

export default MarkdownLink;
