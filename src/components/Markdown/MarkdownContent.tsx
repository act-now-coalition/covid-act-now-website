import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import MarkdownLink from './MarkdownLink';

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
  return <ReactMarkdown renderers={customRenderers} {...props} />;
};

export default MarkdownContent;
