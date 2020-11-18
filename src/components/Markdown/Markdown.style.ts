import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ReactMarkdown from 'react-markdown';
import theme from 'assets/theme';

const baseCss = css`
  font-family: ${theme.typography.fontFamily};
`;

const paragraphCss = css`
  ${baseCss}
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-top: ${theme.spacing(2)}px;
  font-size: 16px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const heading1Css = css`
  ${baseCss}
  line-height: 1.25;
  margin-bottom: ${1.5 * theme.spacing(1)}px;
`;

const heading2Css = css`
  ${baseCss}
  font-weight: ${theme.typography.fontWeightBold};
  margin-top: ${theme.spacing(4)}px;
  margin-bottom: ${theme.spacing(1)}px;
  font-size: 1.5rem;
`;

const heading3Css = css`
  ${baseCss}
  color: #000;
  font-size: 1.125rem;
  font-weight: ${theme.typography.fontWeightBold};
`;

const blockquoteCss = css`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  padding: ${theme.spacing(2)}px;
  display: inline-block;
  margin: ${theme.spacing(1)}px 0;
  width: 100%;
  p {
    color: ${COLOR_MAP.GREEN.BASE};
    font-size: 18px;
    font-weight: 900;
    line-height: 1.6;
    margin: 0;
  }
`;

/**
 * These components should be used to ensure that the styles applied to markdown
 * blocks is also applied to elements outside markdown blocks.
 */

export const Paragraph = styled.p`
  ${paragraphCss}
`;

export const Heading1 = styled.h1`
  ${heading1Css}
`;

export const Heading2 = styled.h2`
  ${heading2Css}
`;

export const Heading3 = styled.h3`
  ${heading3Css}
`;

export const Blockquote = styled.blockquote`
  ${blockquoteCss}
`;

export const StylesMarkdown = css`
  h1 {
    ${heading1Css};
  }

  h2 {
    ${heading2Css};
  }

  h3 {
    ${heading3Css};
  }

  p {
    ${paragraphCss};
  }

  li,
  ol {
    ${paragraphCss};
    margin-top: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(1)}px;
    a {
      color: ${COLOR_MAP.BLUE};
    }
  }

  img {
    max-width: 100%;
  }

  blockquote {
    ${blockquoteCss};
  }
`;

/**
 * Sometimes, we need to apply markdown styles to a non-markdown component. In
 * this case, we need to wrap the content with `MarkdownStyleContainer`, which
 * includes the styles that we need.
 */
export const MarkdownStyleContainer = styled.div`
  ${StylesMarkdown};
`;

export const MarkdownBody = styled(ReactMarkdown)`
  ${StylesMarkdown}
`;

export const MarkdownLink = styled.a.attrs(props => ({
  rel: 'noopener noreferrer',
  target: '_blank',
}))``;
