import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { MarkdownContent } from 'components/Markdown';
import theme from 'assets/theme';
import { materialSMBreakpoint } from 'assets/theme/sizes';

/*
  Styles that are shared between Learn pages:
*/

export const BodyCopyStyles = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.4;
  letter-spacing: 1;
`;

export const PageContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto 3.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 3.5rem auto;
  }
`;

export const PageContent = styled.main`
  flex: 1 1 0;
  padding: 1rem;
`;

export const PageHeader = styled.h1`
  margin-bottom: 1.75rem;
`;

export const PageIntro = styled.p`
  ${BodyCopyStyles};
  margin-bottom: 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 3rem;
  }
`;

export const SectionHeader = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: 1.25rem 0;
`;

export const MarkdownBodyCopy = styled(MarkdownContent)`
  p {
    ${BodyCopyStyles}
  }
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(4)}px;
`;
