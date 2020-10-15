import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ReactMarkdown from 'react-markdown';

export const MarkdownBody = styled(ReactMarkdown)`
  a {
    color: ${COLOR_MAP.BLUE};
  }
`;

export const MarkdownLink = styled.a.attrs(props => ({
  rel: 'noopener noreferrer',
  target: '_blank',
}))``;
