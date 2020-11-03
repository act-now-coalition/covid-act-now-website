import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ReactMarkdown from 'react-markdown';
import theme from 'assets/theme';

export const StylesBlockElement = css`
  margin-bottom: ${theme.spacing(2)}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StylesBody = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.6;
  font-size: 16px;
`;

export const StylesH2 = css`
  margin-top: ${theme.spacing(1)}px;
  margin-bottom: ${theme.spacing(3)}px;
  font-size: 18px;
  font-weight: 900;
  line-height: 29px;
`;

export const StylesBlockQuoteHighlight = css`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  padding: ${theme.spacing(2)}px;
  display: inline-block;
  margin: 0.5rem 0;
  width: 100%;
  p {
    color: ${COLOR_MAP.GREEN.BASE};
    font-size: 1.125rem;
    font-weight: 900;
    line-height: 1.6;
    margin: 0;
  }
`;

export const StylesUl = css`
  ${StylesBody};
  ${StylesBlockElement};

  li {
    ${StylesBlockElement};
    margin-top: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(1)}px;
  }
`;

export const MarkdownBody = styled(ReactMarkdown)`
  ${StylesBody};

  /* Inline  */
  a {
    color: ${COLOR_MAP.BLUE};
  }

  /* Block elements */
  p,
  ul {
    ${StylesBody}
    ${StylesBlockElement}
  }

  li {
    ${StylesBlockElement}
    margin-top: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(1)}px;
  }

  h2 {
    ${StylesH2}
    color: #000;
  }

  img {
    max-width: 100%;
  }
`;

export const MarkdownLink = styled.a.attrs(props => ({
  rel: 'noopener noreferrer',
  target: '_blank',
}))``;
