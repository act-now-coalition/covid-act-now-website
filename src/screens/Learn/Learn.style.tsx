import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { MarkdownContent } from 'components/Markdown';
import theme from 'assets/theme';
import { mobileBreakpoint } from 'assets/theme/sizes';

/*
  Styles that are shared between Learn pages:
*/

export const PageContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  min-height: 65vh;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem auto;
  }
`;

export const PageContent = styled.main`
  flex: 1 1 0;
  padding: 0 1.25rem;
`;

export const PageHeader = styled.h1`
  margin: ${theme.spacing(1)}px 0 ${theme.spacing(3)}px 0;
  line-height: 125%;
`;

export const SectionHeader = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: ${theme.spacing(1)}px 0 ${theme.spacing(3)}px 0;
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

/*
  Markdown styles used throughout Learn
*/

export const BodyCopyStyles = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.6;
  font-size: 16px;
  font-weight: 400;

  p {
    &:not(:last-child) {
      margin-bottom: ${theme.spacing(2)}px;
    }
  }
`;

const BlockquoteStyles = css`
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

export const PageIntroMarkdown = styled(MarkdownContent)`
  p,
  ul,
  li {
    ${BodyCopyStyles}
  }
  margin-bottom: ${theme.spacing(2)}px;
`;

export const BodyCopyMarkdown = styled(MarkdownContent)`
  p,
  ul,
  li {
    ${BodyCopyStyles}
  }

  blockquote {
    ${BlockquoteStyles}
  }

  h2 {
    margin-top: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(3)}px;
    font-size: 18px;
    font-weight: 900;
    line-height: 29px;
  }
`;
