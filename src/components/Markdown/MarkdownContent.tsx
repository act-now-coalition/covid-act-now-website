import React from 'react';
import { ReactMarkdownProps } from 'react-markdown';
import ErrorBoundary from 'components/ErrorBoundary';
import MarkdownLink from './MarkdownLink';
import { MarkdownBody } from './Markdown.style';

/**
 * Custom renderers for each Markdown node type. Useful to override the
 * attributes or styling of the rendered element.
 *
 * https://github.com/remarkjs/react-markdown#appendix-b-node-types
 */
const customRenderers = {
  link: MarkdownLink,
};

const MarkdownContent: React.FC<ReactMarkdownProps> = props => {
  return (
    <ErrorBoundary>
      <MarkdownBody renderers={customRenderers} {...props} />
    </ErrorBoundary>
  );
};

export default MarkdownContent;
