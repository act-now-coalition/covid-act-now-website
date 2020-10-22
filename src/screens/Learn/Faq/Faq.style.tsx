import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const PageContainer = styled.div`
  display: flex;
  max-width: ${mobileBreakpoint};
  margin: 4rem auto;
`;

export const PageContent = styled.main`
  flex: 1 1 0;
  padding: 1rem;
`;

export const Sidebar = styled.div`
  flex: 0 0 auto;
`;

export const PageHeader = styled.h1`
  margin-bottom: 1.75rem;
`;

export const SectionHeader = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: 1.25rem 0;
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
