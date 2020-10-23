import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';
import theme from 'assets/theme';

export const PageContent = styled.main`
  flex: 1 1 0;
  padding: 1rem;
`;

export const Sidebar = styled.div`
  flex: 0 0 auto;
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
  }
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(4)}px;
`;
