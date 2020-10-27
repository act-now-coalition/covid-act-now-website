import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';
import { isValidURL, isInternalLink } from './utils';

/**
 * Custom hyperlink for Markdown content. If the link is external, open it on
 * a new tab. If the link is internal, use the HashLink component to render
 * it in the current page. If the link is invalid, we just render the text of
 * the link.
 */
const MarkdownLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  // If the href parameter is not a valid URL, renders the body as regular text
  if (!isValidURL(href)) {
    return <Fragment>{children}</Fragment>;
  }

  return isInternalLink(href) ? (
    <HashLink to={href} scroll={element => scrollWithOffset(element, -80)}>
      {children}
    </HashLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default MarkdownLink;
