import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { MarkdownContent } from 'components/Markdown';
import theme from 'assets/theme';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

/*
  Styles that are shared between Learn pages:
*/

export const BodyCopyStyles = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.4;
  letter-spacing: 1;
`;

export const PageContainer = styled.div`
  max-width: ${mobileBreakpoint};
  width: 100%;
  margin: 2rem auto;
  min-height: 65vh;
  display: flex;
  flex-direction: row;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem auto;
  }
`;

export const PageContent = styled.main`
  flex: 1 1 auto;
  padding: 0 1.25rem;
`;

export const PageSidebar = styled.div`
  flex: 1 0 auto;
  min-width: 240px;
  margin-left: ${theme.spacing(4)}px;
`;

export const Sticky = styled.div`
  position: sticky;
  top: calc(64px + 2rem); // top bar height + page margin

  @media (min-width: ${mobileBreakpoint}) {
    top: calc(64px + 3.5rem);
  }
`;

export const PageHeader = styled.h1`
  margin: 1rem 0;
  line-height: 1;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 0 0 2rem;
  }
`;

export const PageIntro = styled(MarkdownContent)`
  p,
  ul,
  li {
    ${BodyCopyStyles}
  }
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
  p,
  ul,
  li {
    ${BodyCopyStyles}
  }
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(4)}px;
`;
