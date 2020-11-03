import styled from 'styled-components';
import {
  MarkdownContent,
  StylesH2,
  StylesBlockQuoteHighlight,
} from 'components/Markdown';
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
  ${StylesH2}
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(3)}px;
`;
/*
  Markdown styles used throughout Learn
*/

export const PageIntroMarkdown = styled(MarkdownContent)`
  p::last-child {
    margin-bottom: ${theme.spacing(4)}px;
  }
`;

export const BodyCopyMarkdown = styled(MarkdownContent)`
  blockquote {
    ${StylesBlockQuoteHighlight}
  }
`;
