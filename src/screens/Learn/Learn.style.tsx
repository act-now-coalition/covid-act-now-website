import styled from 'styled-components';
import theme from 'assets/theme';
import { mobileBreakpoint } from 'assets/theme/sizes';

/*
  Styles that are shared between Learn pages:
*/

export const PageContainer = styled.div`
  max-width: ${mobileBreakpoint};
  width: 100%;
  margin: 2rem auto;
  min-height: 65vh;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem auto;
  }

  display: flex;
`;

export const PageContent = styled.main`
  flex: 1 1 auto;
  padding: 0 1.25rem;
`;

export const PageSidebar = styled.div`
  flex: 1 1 auto;
  min-width: 240px;
  margin-left: ${theme.spacing(4)}px;
  margin-right: ${theme.spacing(1)}px;
`;

export const Sticky = styled.div`
  position: sticky;
  top: calc(64px + 2rem); // top bar height + page margin
  @media (min-width: ${mobileBreakpoint}) {
    top: calc(64px + 3.5rem);
  }
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(3)}px;
`;

export const MobileOnly = styled.div`
  display: initial;
  @media (min-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  @media (min-width: ${mobileBreakpoint}) {
    display: flex;
    min-width: fit-content;
  }
`;
