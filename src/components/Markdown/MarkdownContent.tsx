import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import MarkdownLink from './MarkdownLink';
import ErrorBoundary from 'components/ErrorBoundary';

/**
 * Custom renderers for each Markdown node type. Useful to override the
 * attributes or styling of the rendered element.
 *
 * https://github.com/remarkjs/react-markdown#node-types
 */
const customRenderers = {
  link: MarkdownLink,
};

const MarkdownContent: React.FC<ReactMarkdownProps> = props => {
  return (
    <ErrorBoundary>
      <ReactMarkdown renderers={customRenderers} {...props} />
    </ErrorBoundary>
  );
};

export default MarkdownContent;
