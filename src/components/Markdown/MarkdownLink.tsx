import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';

function isValidURL(href: string): boolean {
  let isValid = false;
  try {
    new URL(href);
    isValid = true;
  } catch {
    isValid = false;
  }
  return isValid;
}

/**
 * If the href parameter doesn't have a hostname, then the href parameter
 * corresponds to an internal URL such as `/faq` or `/glossary#superspreader`
 */
function isInternalLink(href: string) {
  const url = new URL(href);
  return url.hostname.length === 0;
}

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
  if (!isValidURL(href)) {
    return <Fragment>{children}</Fragment>;
  }

  return isInternalLink(href) ? (
    <HashLink to={href}>{children}</HashLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default MarkdownLink;
